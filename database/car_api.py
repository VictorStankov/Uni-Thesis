from database import Car, CarColour


class CarAPI:
    @staticmethod
    async def get_cars():
        return await Car.all()

    @staticmethod
    async def get_car_colour(car_id: int):
        return await CarColour.filter(car_id=car_id).all()
