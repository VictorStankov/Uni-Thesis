class UserNotFoundException(Exception):
    def __init__(self, username: str):
        super().__init__()
        self.message = f'User "{username}" not found'


class UserAlreadyExistsException(Exception):
    def __init__(self, username: str):
        super().__init__()
        self.message = f'User "{username}" already exists'
