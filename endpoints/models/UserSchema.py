from marshmallow import Schema, fields, validate


class UserLoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class UserRegistrationSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))
    email = fields.Email(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    phone = fields.Str()
