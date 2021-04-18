from api import *

def clear():
    users = []
    comments = []

drinks = ref_cocktails_details

ingredients = ref_ingredients_details

global users, comments
# users = []

comments = [
    {
        'drink': 'Margarita',
        'comment_id': 0,
        'message': 'oo',
        'ldTime': '18/04/2021, 11:02:54',
        'u_id': 0,
    },
    {
        'drink': 'Martini',
        'comment_id': 1,
        'message': 'ooo',
        'ldTime': '18/04/2021, 11:02:54',
        'u_id': 0,
    },
    {
        'drink': 'Margarita',
        'comment_id': 2,
        'message': 'oooo',
        'ldTime': '18/04/2021, 11:02:54',
        'u_id': 0,
    },
    {
        'drink': 'Gin and Tonic',
        'comment_id': 3,
        'message': 'ooooo',
        'ldTime': '18/04/2021, 11:02:54',
        'u_id': 0,
    },
    {
        'drink': 'Margarita',
        'comment_id': 4,
        'message': 'oooooo',
        'ldTime': '18/04/2021, 11:02:54',
        'u_id': 0,
    },
]

# users format

users = [{
    'user': 'abc',
    'password': 'qwerty100',
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