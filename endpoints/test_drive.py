from marshmallow import ValidationError
from quart import Blueprint, request

from database import User, Employee
from database import TestDriveAPI, CarAPI, UserAPI
from .helpers import login_required, employee_login_required

from .models import TestDriveSchema
from application.exceptions import NoEmployeesFoundOrderException

test_drive_blueprint = Blueprint('test_drive', __name__)

@test_drive_blueprint.route('/employee/test_drives', methods=['GET'])
@employee_login_required
async def get_employee_test_drives(employee: Employee):
    test_drives = await TestDriveAPI.get_employee_test_drives(employee.id)
    return {
        'test_drives': [
            {
                'id': test_drive.id,
                'car': (await test_drive.car).to_dict(),
                'status': (await test_drive.status).to_dict(),
                'created_on': test_drive.created_at.strftime('%Y-%m-%d'),
                'user': (await UserAPI.get_user_info(await test_drive.requestor)).to_dict(),
            } for test_drive in test_drives
        ]
    }, 200

@test_drive_blueprint.route('/employee/test_drive/<test_drive_id>', methods=['GET'])
@employee_login_required
async def get_employee_test_drive(employee: Employee, test_drive_id: int):
    if not await TestDriveAPI.test_drive_exists(test_drive_id):
        return {'message': f'No test drive found for ID {test_drive_id}'}, 404

    test_drive = await TestDriveAPI.get_test_drive(test_drive_id)

    if await test_drive.employee != employee:
        return {'message': f'You are not authorized to view test drive {test_drive_id}'}, 403

    return {
        'id': test_drive.id,
        'car': (await test_drive.car).to_dict(),
        'status': (await test_drive.status).to_dict(),
        'created_on': test_drive.created_at.strftime('%Y-%m-%d'),
        'user': (await UserAPI.get_user_info(await test_drive.requestor)).to_dict(),
    }, 200

@test_drive_blueprint.route('/test_drives', methods=['POST'])
@login_required
async def create_test_drive(user: User):
    body = await request.json

    try:
        result = TestDriveSchema().load(body)
    except ValidationError as e:
        return e.messages, 400

    if not await CarAPI.car_exists(result['car_id']):
        return {'message': f'Car ID {result["car_id"]} does not exist!'}, 404

    try:
        id = await TestDriveAPI.create_test_drive(
            car_id=result['car_id'],
            user_id=user.id
        )
    except NoEmployeesFoundOrderException as e:
        return {'message': e.message}, 500

    return {'message': 'Test drive created successfully!', 'id': id}, 200
