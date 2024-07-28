from quart import Blueprint, request
from database import CarAPI

car_blueprint = Blueprint('car', __name__)


@car_blueprint.route('/cars/list', methods=['GET'])
async def get_cars():
    cars = await CarAPI.get_cars()
    return {'cars': [car.to_dict() for car in cars]}


@car_blueprint.route('/cars/configs/<car_name>', methods=['GET'])
async def get_car_configs(car_name: str):
    car_id = await CarAPI.get_car_id_by_name(car_name)
    if car_id is None:
        return {'message': 'No car found with that name'}, 404

    response = {
        'car': (await CarAPI.get_car_by_id(car_id)).to_dict(),
        'colours': [colour.to_dict() for colour in await CarAPI.get_car_colour(car_id)],
        'interiors': [interior.to_dict() for interior in await CarAPI.get_car_interior(car_id)]
    }

    return response, 200


@car_blueprint.route('/cars/<car_id>/colours', methods=['GET'])
async def get_car_colours(car_id: int):
    colours = await CarAPI.get_car_colour(car_id)
    return {'car_colours': [car_colour.to_dict() for car_colour in colours]}


@car_blueprint.route('/cars/<car_id>/interiors', methods=['GET'])
async def get_car_interiors(car_id: int):
    interiors = await CarAPI.get_car_interior(car_id)
    return {'interiors': [interior.to_dict() for interior in interiors]}
