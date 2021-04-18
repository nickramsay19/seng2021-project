import data

u_id = 0

def user_register(username, password):
    
    data.users.append({'user': username, 'password': password, 'u_id': len(data.users), 'logged_in': False, 'shopping_list': []}) #data.users.count()
    


def user_login(username, password): 
    for i in data.users:
        if ((i['user'] == username) and (i['password'] == password) and (i['logged_in'] == False)):
             i['logged_in'] = True
             return True
    return False