from marshmallow import ValidationError
from quart import Blueprint, request

from database import User, Employee, EmployeeAPI
from database import OrderAPI, CarAPI, UserAPI
from .helpers import login_required, employee_login_required

from .models import OrderSchema
from application.exceptions import NoEmployeesFoundOrderException

order_blueprint = Blueprint('order', __name__)

@order_blueprint.route('/orders', methods=['GET'])
@login_required
async def get_user_orders(user: User):
    orders = await OrderAPI.get_user_orders(user.id)
    return {
        'orders': [
            {
                'id': order.id,
                'car': (await order.car).to_dict(),
                'status': (await order.status).to_dict()
            } for order in orders
        ]
    }, 200  # FIXME

@order_blueprint.route('/order/<order_id>', methods=['GET'])
@login_required
async def get_user_order(user: User, order_id: int):
    if not await OrderAPI.order_exists(order_id):
        return {'message': f'No order found for ID {order_id}'}, 404

    order = await OrderAPI.get_order(order_id)

    if await order.order_placer != user:
        return {'message': f'You are not authorized to view order {order_id}'}, 403

    return {
        'id': order.id,
        'car': (await order.car).to_dict(),
        'interior': (await order.interior).to_dict(),
        'colour': (await order.colour).to_dict(),
        'status': (await order.status).to_dict(),
        'created_on': order.created_at.strftime('%Y-%m-%d'),
        'sales_rep': (await EmployeeAPI.get_employee_info(await order.employee)).to_dict(),
        'price': order.price,
    }, 200


@order_blueprint.route('/employee/orders', methods=['GET'])
@employee_login_required
async def get_employee_orders(employee: Employee):
    orders = await OrderAPI.get_employee_orders(employee.id)
    return {
        'orders': [
            {
                'id': order.id,
                'car': (await order.car).to_dict(),
                'status': (await order.status).to_dict(),
                'created_on': order.created_at.strftime('%Y-%m-%d'),
                'user': (await UserAPI.get_user_info(await order.order_placer)).to_dict(),
            } for order in orders
        ]
    }, 200

@order_blueprint.route('/employee/order/<order_id>', methods=['GET'])
@employee_login_required
async def get_employee_order(employee: Employee, order_id: int):
    if not await OrderAPI.order_exists(order_id):
        return {'message': f'No order found for ID {order_id}'}, 404

    order = await OrderAPI.get_order(order_id)

    if await order.employee != employee:
        return {'message': f'You are not authorized to view order {order_id}'}, 403

    return {
        'id': order.id,
        'car': (await order.car).to_dict(),
        'interior': (await order.interior).to_dict(),
        'colour': (await order.colour).to_dict(),
        'status': (await order.status).to_dict(),
        'created_on': order.created_at.strftime('%Y-%m-%d'),
        'user': (await UserAPI.get_user_info(await order.order_placer)).to_dict(),
        'price': order.price,
    }, 200

@order_blueprint.route('/orders', methods=['POST'])
@login_required
async def create_order(user: User):
    body = await request.json

    try:
        result = OrderSchema().load(body)
    except ValidationError as e:
        return e.messages, 400

    if not await CarAPI.car_exists(result['car_id']):
        return {'message': f'Car ID {result["car_id"]} does not exist!'}, 404

    if not await CarAPI.car_configuration_exists(result['car_id'], result['colour_id'], result['interior_id']):
        return {'message': f'Car configuration does not exist!'}, 404

    try:
        id = await OrderAPI.create_order(
            car_id=result['car_id'],
            colour_id=result['colour_id'],
            interior_id=result['interior_id'],
            user_id=user.id
        )
    except NoEmployeesFoundOrderException as e:
        return {'message': e.message}, 500

    return {'message': 'Order created successfully!', 'id': id}, 200
