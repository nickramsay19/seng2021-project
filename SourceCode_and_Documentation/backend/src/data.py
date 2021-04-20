from api import *

def clear():
    users = []
    comments = []

drinks = ref_cocktails_details

ingredients = ref_ingredients_details

users = [{
    'user': '',
    'password': '',
    'u_id': '',
    'logged_in': False,
    'shopping_list': [],
}]

comments = [{
    'drink': '',
    'comment_id': '',
    'message': '',
    'time': '',
    'u_id': '',
}]
