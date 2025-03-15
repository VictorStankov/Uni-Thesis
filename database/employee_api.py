from . import Employee, UserBasicInfo


class EmployeeAPI:
    @staticmethod
    async def employee_exists(employee_id: int):
        return await Employee.exists(id=employee_id)

    @staticmethod
    async def get_employee_by_employee_id(employee_id: int):
        return await Employee.get(id=employee_id)

    @staticmethod
    async def get_employee_by_user_id(user_id: int):
        return await Employee.get(user_id=user_id)

    @staticmethod
    async def get_employee_info(employee: Employee) -> UserBasicInfo:
        return await UserBasicInfo.filter(user=await employee.user).first()
