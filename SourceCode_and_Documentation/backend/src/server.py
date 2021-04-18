import jwt
from json import dumps
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from error import InputError

# import user utitlities and data
import login_system
import data as users_data

import api

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
    users = users_data.users
    
    # obtain username and password from args
    username = request.args.get('username')
    password = request.args.get('password')
    
    # create a data object to be returned
    data = None
    
    # loop through users and find the correct user
    for u in users:
        if username == u['user'] and password == u['password']:
            data = u['u_id']
            break
    # no user found, return -1 user id
    else:
        data = -1
        
    return dumps({'data' : data})

@APP.route("/auth/register", methods=['POST'])
def auth_register_flask():
    
    # obtain username and password from args
    username = request.args.get('username')
    password = request.args.get('password')
    
    # check if username and password are valid
    if len(username) == 0 and len(password) == 0:
        return dumps({'data' : -1})
    
    # check if username is taken
    for u in users_data.users:
        if username == u['user']:
            return dumps({'data' : -2})
    
    # attempt to add user, return success code 0
    login_system.user_register(username, password)
    return dumps({'data' : 0})

@APP.route("/api/cocktails_details", methods=['GET'])
def api_cocktail_details():
    response = api.ref_cocktails_details
    reformattedData = {
        'drinks' : response
    }
    return reformattedData

@APP.route("/api/ingredients_details", methods=['GET'])
def api_ingredients_details():
    response = api.ref_ingredients_details
    reformattedData = {
        'ingredients' : response
    }
    return reformattedData

@APP.route("/api/random_cocktail", methods = ['GET'])
def api_random_cocktail():
    response = api.random_cocktail(api.ref_cocktails_details)
    reformattedData = {
        'drinks' : response
    }
    return reformattedData

# @APP.route("/api/")
#     pass
if __name__ == "__main__":
    APP.run(port=5050) # Do not edit this port