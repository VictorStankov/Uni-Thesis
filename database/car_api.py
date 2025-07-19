from . import Car, CarColour, CarInterior
from application import frontend_url


class CarAPI:
    @staticmethod
    async def car_exists(car_id: int):
        return await Car.exists(id=car_id)

    @staticmethod
    async def car_configuration_exists(car_id: int, colour_id: int, interior_id: int):
        return await Car.exists(id=car_id, colour=colour_id, interior=interior_id)

    @staticmethod
    async def calculate_price(car_id: int, colour_id: int, interior_id: int):
        car_price = (await Car.get(id=car_id)).base_price
        colour_price = (await CarColour.get(id=colour_id)).price_increase
        interior_price = (await CarInterior.get(id=interior_id)).price_increase

        return car_price + colour_price + interior_price

    @staticmethod
    async def get_cars():
        return await Car.all()

    @staticmethod
    async def get_car_id_by_name(car_name: str):
        return (await Car.filter(name=car_name).first()).id

    @staticmethod
    async def get_car_by_id(car_id: int):
        return await Car.filter(id=car_id).first()

    @staticmethod
    async def get_car_colour(car_id: int):
        return await CarColour.filter(car_id=car_id).order_by("-is_base", "price_increase", "colour").all()

    @staticmethod
    async def get_car_interior(car_id: int):
        return await CarInterior.filter(car_id=car_id).order_by("-is_base", "price_increase", "interior_type").all()

    @staticmethod
    async def get_all_car_details():
        cars = await Car.all().values('tags')
        for i in range(len(cars)):
            cars[i]['tags']['endpoint'] = frontend_url + cars[i]['tags'].get('endpoint', '')
        return cars
