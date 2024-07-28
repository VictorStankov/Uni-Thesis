from quart import Blueprint, request
from database import CarAPI

car_blueprint = Blueprint('car', __name__)


@car_blueprint.route('/cars/list', methods=['GET'])
async def get_cars():
    cars = await CarAPI.get_cars()
    return {'cars': [car.to_dict() for car in cars]}


@car_blueprint.route('/cars/<car_id>/colours', methods=['GET'])
async def get_car_colours(car_id: int):
    colours = await CarAPI.get_car_colour(car_id)
    return {'car_colours': [car_colour.to_dict() for car_colour in colours]}


@car_blueprint.route('/cars/<car_id>/interiors', methods=['GET'])
async def get_car_interiors(car_id: int):
    interiors = await CarAPI.get_car_interior(car_id)
    return {'interiors': [interior.to_dict() for interior in interiors]}
