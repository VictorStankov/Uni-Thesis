from marshmallow import Schema, fields


class TestDriveSchema(Schema):
    car_id = fields.Int(required=True)
