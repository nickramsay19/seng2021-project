import api
import server 
import data

u_id = 0

def user_register(username, password):
    user_id = len(data.users)
    data.users.append({'user': username, 'password': password, 'u_id': user_id, 'logged_in': False, 'shopping_list': []})
    return user_id
    
def user_login(username, password): 
    for i in data.users:
        if ((i['user'] == username) and (i['password'] == password) and (i['logged_in'] == False)):
             i['logged_in'] = True
             return i['u_id']
    return -1

def user_logout(username):
    for i in data.users:
        if (i['user'] == username and i['logged_in']):
             i['logged_in'] = False
             return i['u_id']
    return -1

def shoppinglist_add(userID, ingredient):
    for i in data.users:
        if (i['u_id'] == userID and i['logged_in']):
            i['shopping_list'].append(ingredient)
            return True
    return False

def shoppinglist_remove(userID, ingredient):
    for i in data.users:
        print(str(type(userID)) + ', ' + str(type(i['user'])))
        print(str(i['user'] == userID) + ', ' + str(i['logged_in']))
        if (i['user'] == userID and i['logged_in']):
            i['shopping_list'].remove(ingredient)
            return True
    return False

def shoppinglist_get(userID):
    for i in data.users:
        print(str(i['u_id'] == userID) + ', ' + str(i['logged_in']))
        if ((i['u_id'] == userID) and (i['logged_in'])):
            return i['shopping_list']
    return None

