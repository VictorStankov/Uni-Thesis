from quart import Blueprint

from database import User
from database import OrderAPI
from endpoints.helpers import login_required

order_blueprint = Blueprint('order', __name__)

@order_blueprint.route('/order/<order_id>', methods=['GET'])
@login_required
async def get_order_by_id(user: User, order_id: int):
    if not await OrderAPI.order_exists(order_id):
        return {'message': f'No order found for ID {order_id}'}, 404

    order = await OrderAPI.get_order(order_id)

    if await order.order_placer != user:
        return {'message': f'You are not authorized to order {order_id}'}, 403

    return await order.to_dict(), 200

@order_blueprint.route('/orders', methods=['GET'])
@login_required
async def get_user_orders(user: User):
    orders = await OrderAPI.get_user_orders(user.id)
    return {'orders': [{'id': order.id, 'car': (await order.car).to_dict()} for order in orders]}, 200
