from tortoise.functions import Count

from . import Employee, EmployeePosition, TestDrive, TestDriveStatus
from application.exceptions import NoEmployeesFoundOrderException


class TestDriveAPI:
    @staticmethod
    async def test_drive_exists(test_drive_id: int):
        return await TestDrive.exists(id=test_drive_id)

    @staticmethod
    async def get_test_drive(test_drive_id: int):
        return await TestDrive.get(id=test_drive_id)

    @staticmethod
    async def get_user_test_drives(user_id: int):
        return await TestDrive.filter(requestor_id=user_id).all()

    @staticmethod
    async def get_employee_test_drives(employee_id: int):
        return await TestDrive.filter(employee_id=employee_id).all()

    @staticmethod
    async def create_test_drive(car_id: int, user_id: int):
        ordered_status = await TestDriveStatus.get(name='Requested')
        completed_status = await TestDriveStatus.get(name='Completed')
        sales_rep_position = await EmployeePosition.get(type='Sales Representative')

        # Get all sales representatives
        all_sales_reps = await Employee.filter(position=sales_rep_position).all()

        # Get sales representatives ordered by the count of unfinished test drives
        sales_reps_ordered = await Employee.annotate(
            count=Count('test_drives')
        ).filter(position=sales_rep_position, orders__status_id__not=completed_status.id).group_by('id').order_by('count')

        # Needed for cases where a sales representative has only completed test drives
        missing_employees = set(all_sales_reps) - set(sales_reps_ordered)

        if missing_employees:
            sales_reps_ordered.insert(0, missing_employees.pop())

        if len(sales_reps_ordered) == 0:
            raise NoEmployeesFoundOrderException()

        test_drive = await TestDrive.create(
            car_id=car_id,
            requestor_id=user_id,
            status=ordered_status,
            employee=sales_reps_ordered[0],
        )

        return test_drive.id
