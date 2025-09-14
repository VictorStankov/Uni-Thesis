import pytest
from tests.init_app import app, client
from tests.init_db import tortoise_db


@pytest.mark.asyncio(loop_scope="session")
async def test_car_list(app, client, tortoise_db):
    response = await client.get("/api/cars/list")

    assert response.status_code == 200
    assert len((await response.json).get("cars")) == 1
    assert (await response.json).get("cars")[0].get("name") == 'TestCar'

@pytest.mark.asyncio(loop_scope="session")
async def test_car_config(app, client, tortoise_db):
    response = await client.get("/api/cars/configs/TestCar")

    assert response.status_code == 200
    assert len((await response.json).get("colours")) == 2
    assert len((await response.json).get("interiors")) == 2
