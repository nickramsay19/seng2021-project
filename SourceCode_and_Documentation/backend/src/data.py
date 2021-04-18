from api import *

def clear():
    users = []
    comments = []

drinks = ref_cocktails_details

ingredients = ref_ingredients_details

global users, comments
#users = []
comments = []


# users format

users = [{
    'user': 'dd',
    'password': '',
    'u_id': 0,
    'shopping_list': [],
}]


# comments format
'''
comments = [{
    'drink': '',
    'comment_id': '',
    'message': '',
    'time': '',
    'u_id': '',
}]
'''