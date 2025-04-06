from quart import Blueprint

from database import Employee, OrderAPI
from endpoints.helpers.authentication import employee_login_required

statistics_blueprint = Blueprint('statistics', __name__)

@statistics_blueprint.route('/me/order_statistics', methods=['GET'])
@employee_login_required
async def get_self_order_statistics(employee: Employee):
    orders = await OrderAPI.get_employee_orders(employee.id)

    results = {}

    for order in orders:
        status = await order.status
        if status.name not in results.keys():
            results[status.name] = 1
        else:
            results[status.name] += 1

    return [{'label': k, 'value': v} for k, v in results.items()]
