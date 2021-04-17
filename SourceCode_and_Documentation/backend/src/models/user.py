class User:
    user_id = 0
    username = ''
    password = ''
    shopping_list = []
    
    def __init__(user_id, username, password, shopping_list):
        self.user_id = user_id
        self.username = username
        self.password = password
        self.shopping_list = shopping_list