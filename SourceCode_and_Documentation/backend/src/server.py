import jwt
from json import dumps
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from error import InputError, AccessError

# import user utitlities and data
import login_system

import api
from comments import *
import data

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response


APP = Flask(__name__, static_url_path='/static/')
CORS(APP)

# Example
@APP.route("/echo", methods=['GET'])
def echo():
    data = request.args.get('data')
    if data == 'echo':
   	    raise InputError(description='Cannot echo "echo"')
    return dumps({
        'data': data
    })

#############################
##       auth_login        ##
#############################

@APP.route("/auth/login", methods=['POST'])
def auth_login_flask():
    
    # obtain users list
    users = data.users
    
    # obtain username and password from args
    username = request.args.get('username')
    password = request.args.get('password')
    
    # create a data object to be returned
    return dumps({'data' : login_system.user_login(username, password)})

@APP.route("/auth/logout", methods=['POST'])
def auth_logout_flask():
    
    # obtain users list
    users = data.users
    
    # obtain username and password from args
    username = request.args.get('username')
    
    # create a data object to be returned
    return dumps({'data' : login_system.user_logout(username)})


@APP.route("/auth/register", methods=['POST'])
def auth_register_flask():
    
    # obtain username and password from args
    username = request.args.get('username')
    password = request.args.get('password')
    
    # check if username and password are valid
    if len(username) == 0 and len(password) == 0:
        return dumps({'data' : -1})
    
    # check if username is taken
    for u in data.users:
        if username == u['user']:
            return dumps({'data' : -2})
    
    # attempt to add user, return user ID
    return dumps({'data' : login_system.user_register(username, password)})

@APP.route("/shopping_list/add", methods=['POST'])
def auth_shopping_list_add_flask():
    
    # obtain username and password from args
    user_id = int(request.args.get('user_id'))
    ingredient = request.args.get('ingredient')
    
    # return success or failure code (0/-1)
    data = 0 if login_system.shoppinglist_add(user_id, ingredient) else -1
    return dumps({'data' : data})

@APP.route("/shopping_list/get", methods=['POST'])
def auth_shopping_list_get_flask():
    
    # obtain username and password from args
    user_id = int(request.args.get('user_id'))
    
    # return success or failure code (0/-1)
    data = login_system.shoppinglist_get(user_id)
    return dumps({'data' : data})

@APP.route("/shopping_list/remove", methods=['POST'])
def auth_shopping_list_remove_flask():
    
    # obtain username and password from args
    user_id = int(request.args.get('user_id'))
    ingredient = request.args.get('ingredient')
    
    # return success or failure code (0/-1)
    data = 0 if login_system.shoppinglist_remove(user_id, ingredient) else -1
    return dumps({'data' : data})


@APP.route("/api/cocktails_details", methods=['GET'])
def api_cocktail_details():
    response = data.drinks
    reformattedData = {
        'drinks' : response
    }
    return reformattedData

@APP.route("/api/ingredients_details", methods=['GET'])
def api_ingredients_details():
    response = data.ingredients
    reformattedData = {
        'ingredients' : response
    }
    return reformattedData

@APP.route("/api/random_cocktail", methods = ['GET'])
def api_random_cocktail():
    response = api.random_cocktail(data.drinks)
    reformattedData = {
        'drinks' : response
    }
    return reformattedData

# comments_add flask route
@APP.route("/comments/add", methods = ['POST'])
def http_comments_add():
    payload = request.get_json()
    # print(payload['cocktail'])
    return dumps(comments_add(payload['u_id'], payload['cocktail'], payload['message'], payload['time']))

# comments_remove flask route
@APP.route("/comments/remove", methods = ['POST'])
def http_comments_remove():
    payload = request.get_json()
    try:
        return dumps(comments_remove(payload['u_id'], payload['comment_id']))
    except AccessError:
        error_msg = "You can only delete comments posted by you."
        return custom_error(400, message = error_msg)

# comments_get flask route
@APP.route("/comments/get", methods = ['GET'])
def http_comments_get():
    cocktail = request.args.get('cocktail')
    return dumps(comments_get(cocktail))

# for error checking
def custom_error(status_code, message):
    response = jsonify({'status': status_code, 'message': message})
    response.status_code = status_code
    return response

# comments_testusers flask route
@APP.route("/comments/testusers", methods = ['GET'])
def http_comments_testusers():
    return dumps(data.users)

# comments_testcomments flask route
@APP.route("/comments/testcomments", methods = ['GET'])
def http_comments_testcomments():
    return dumps(data.comments)

# @APP.route("/api/")
#     pass
if __name__ == "__main__":
    APP.run(port=5050) # Do not edit this port