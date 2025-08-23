from tortoise.expressions import RawSQL, Q
from tortoise.functions import Count

from . import Employee, EmployeePosition, TestDrive, TestDriveStatus, EmployeeAPI
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
    async def get_test_drive_statuses():
        return await TestDriveStatus.all().order_by('id')

    @staticmethod
    async def get_monthly_test_drive_counts(manager_id):
        manager = await EmployeeAPI.get_employee_by_employee_id(manager_id)
        employees = await EmployeeAPI.get_manager_employees(manager)
        test_drive_statuses = await TestDriveAPI.get_test_drive_statuses()

        sums = {
            x.name: RawSQL(f'CAST(SUM(CASE WHEN status_id = {x.id} THEN 1 ELSE 0 END) AS UNSIGNED)')
            for x in test_drive_statuses
        }

        return await (
            TestDrive.filter(Q(employee_id__in=[x.id for x in employees]))
            .annotate(
                period=RawSQL("DATE_FORMAT(created_at, '%%Y-%%m')"),
                **sums
            )
            .group_by('period')
            .values('period', *sums.keys())
        )

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
