from tortoise.functions import Count

from . import Order, CarAPI, OrderStatus, Employee, EmployeePosition
from application.exceptions import NoEmployeesFoundOrderException


class OrderAPI:
    @staticmethod
    async def order_exists(order_id: int):
        return await Order.exists(id=order_id)

    @staticmethod
    async def get_order(order_id: int):
        return await Order.get(id=order_id)

    @staticmethod
    async def get_user_orders(user_id: int):
        return await Order.filter(order_placer=user_id).all()

    @staticmethod
    async def get_employee_orders(employee_id: int):
        return await Order.filter(employee_id=employee_id).all()

    @staticmethod
    async def get_order_statuses():
        return await OrderStatus.all().order_by('id')

    @staticmethod
    async def create_order(car_id: int, colour_id: int, interior_id: int, user_id: int):
        price = await CarAPI.calculate_price(car_id=car_id, colour_id=colour_id, interior_id=interior_id)

        ordered_status = await OrderStatus.get(name='Ordered')
        completed_status = await OrderStatus.get(name='Completed')
        sales_rep_position = await EmployeePosition.get(type='Sales Representative')

        # Get all sales representatives
        all_sales_reps = await Employee.filter(position=sales_rep_position).all()

        # Get sales representatives ordered by the count of unfinished orders
        sales_reps_ordered = await Employee.annotate(
            count=Count('orders')
        ).filter(position=sales_rep_position, orders__status_id__not=completed_status.id).group_by('id').order_by('count')

        # Needed for cases where a sales representative has only completed orders
        missing_employees = set(all_sales_reps) - set(sales_reps_ordered)

        if missing_employees:
            sales_reps_ordered.insert(0, missing_employees.pop())

        if len(sales_reps_ordered) == 0:
            raise NoEmployeesFoundOrderException()

        order = await Order.create(
            car_id=car_id,
            colour_id=colour_id,
            interior_id=interior_id,
            order_placer_id=user_id,
            price=price,
            status=ordered_status,
            employee=sales_reps_ordered[0],
        )

        return order.id
