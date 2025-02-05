from marshmallow import Schema, fields


class OrderSchema(Schema):
    car_id = fields.Int(required=True)
    colour_id = fields.Int(required=True)
    interior_id = fields.Int(required=True)
