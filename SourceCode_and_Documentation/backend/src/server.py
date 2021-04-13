import jwt
from json import dumps
from flask import Flask, request, send_from_directory
from flask_cors import CORS


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


#############################
##       auth_login        ##
#############################

@APP.route("/auth/login", methods=['POST'])
def auth_login_flask():

    return dumps(dataOut)
