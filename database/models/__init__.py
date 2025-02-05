from tortoise.transactions import in_transaction

from .UserBasicInfo import UserBasicInfo
from .User import User
from .Car import Car
from .CarColour import CarColour
from .CarInterior import CarInterior
from .OrderStatus import OrderStatus
from .Order import Order

async def create_order_statuses():
    async with in_transaction():
        statuses = ['Ordered', 'Paid', 'Manufactured', 'Shipped', 'Completed']

        for i, status in enumerate(statuses):
            if not await OrderStatus.exists(name=status):
                await OrderStatus.create(id=i + 1, name=status)