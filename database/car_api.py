from database import Car, CarColour, CarInterior


class CarAPI:
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
        return await CarColour.filter(car_id=car_id).order_by("-is_base", "price_increase").all()

    @staticmethod
    async def get_car_interior(car_id: int):
        return await CarInterior.filter(car_id=car_id).order_by("-is_base", "price_increase").all()
