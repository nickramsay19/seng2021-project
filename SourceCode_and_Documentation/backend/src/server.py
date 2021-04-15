import jwt
from json import dumps
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from error import InputError

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
    return dumps({
        'data' : None
    })

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