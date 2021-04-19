import api
import server 
import data

u_id = 0

def user_register(username, password):
    data.users.append({'user': username, 'password': password, 'u_id': len(data.users), 'logged_in': False, 'shopping_list': []})
    
def user_login(username, password): 
    for i in data.users:
        if ((i['user'] == username) and (i['password'] == password) and (i['logged_in'] == False)):
             i['logged_in'] = True
             return i['u_id']
    return -1

def shoppinglist_add(userID, ingredient):
    for i in data.users:
        print(str(i['u_id'] == userID) + ', ' + str(i['logged_in']))
        if (i['u_id'] == userID and i['logged_in']):
            i['shopping_list'].append(ingredient)
            return True
    return False

def shoppinglist_remove(userID, ingredient):
    for i in data.users:
        if ((i['user'] == userID) and (i['logged_in'] == True)):
            i['shopping_list'].remove(ingredient)
            return True
    return False

def shoppinglist_get(userID):
    for i in data.users:
        print(str(i['u_id'] == userID) + ', ' + str(i['logged_in']))
        if ((i['u_id'] == userID) and (i['logged_in'])):
            return i['shopping_list']
    return None
