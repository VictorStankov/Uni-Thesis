from database import Order

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
    async def create_order(car_id: int, colour_id: int, interior_id: int, user_id: int, price: float):
        order = await Order.create(
            car_id=car_id,
            colour_id=colour_id,
            interior_id=interior_id,
            user_id=user_id,
            price=price
        )

        return order.id
