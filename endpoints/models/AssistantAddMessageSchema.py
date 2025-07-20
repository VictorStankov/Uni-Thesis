from marshmallow import Schema, fields


class AssistantAddMessageSchema(Schema):
    chat_id = fields.Str(required=True)
    message = fields.Str(required=True)
