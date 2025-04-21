from quart import Blueprint

from database import Employee, OrderAPI, EmployeeAPI
from endpoints.helpers import manager_login_required
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

@statistics_blueprint.route('/employee_order_statistics', methods=['GET'])
@manager_login_required
async def get_employee_order_statistics(employee: Employee):
    employees = await EmployeeAPI.get_manager_employees(employee)
    employee_order_statuses = {}
    for employee in employees:
        employee_info = await EmployeeAPI.get_employee_info(employee)

        employee_orders = await OrderAPI.get_employee_orders(employee.id)
        employee_order_statuses[employee_info.email] = [(await order.status).name for order in employee_orders]

    results = []
    for email, statuses in employee_order_statuses.items():
        summary = {}
        for status in statuses:
            if status not in summary.keys():
                summary[status] = 1
            else:
                summary[status] += 1
        summary['email'] = email
        results.append(summary)

    order_statuses = await OrderAPI.get_order_statuses()

    response = {'data': results, 'order_statuses': [status.name for status in order_statuses]}

    return response
