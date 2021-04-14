import requests
import json
import concurrent.futures
import inspect
from pprint import pprint 

DEFAULT_TIMEOUT = 1

def api_get_cocktail_details(id, position):
    url = 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id
    # print('fetching', url, '; position:', position)
    try:
        r = requests.get(url, timeout=DEFAULT_TIMEOUT).json()['drinks'][0]
    except requests.exceptions.ConnectTimeout:
        # print('position', position)
        return
    # print('received response from', id, 'in position', position)
    return r


def api_get_cocktails(cocktails):
    cocktails_details = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
        future_to_url = (executor.submit(api_get_cocktail_details, cocktail['idDrink'], i) for i, cocktail in enumerate(cocktails))
        for future in concurrent.futures.as_completed(future_to_url):
            try:
                data = future.result()
            except Exception as exc:
                print(str(type(exc)))
                data = None
            if data != None:
                cocktails_details.append(data)
    return cocktails_details

def extract_ingredients(cocktails):
    ingredients = []
    for cocktail in cocktails:
        for i in range(1,15):
            ingredient = 'strIngredient' + str(i)
            if cocktail[ingredient] == None or cocktail[ingredient] == '':
                break
            elif cocktail[ingredient].casefold() not in (ingredient.casefold() for ingredient in ingredients):
                ingredients.append(cocktail[ingredient].capitalize())
    return ingredients

def api_get_ingredient_details(name):
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + name
    # print('fetching', url)
    try:
        ingredient_details = requests.get(url, timeout=DEFAULT_TIMEOUT).json()['ingredients'][0]
    except requests.exceptions.ConnectTimeout:
        return
    # print('received response from', name)
    return ingredient_details



def api_get_ingredients(ingredients):
    ingredients_details = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
        future_to_url = (executor.submit(api_get_ingredient_details, name) for name in ingredients)
        for future in concurrent.futures.as_completed(future_to_url):
            try:
                data = future.result()
            except Exception as exc:
                print(str(type(exc)))
                data = None
            if data != None:
                ingredients_details.append(data)
    return ingredients_details

# Untested
def api_get_ingredient_image_small(name):
    # 100x100 pixels
    url = 'www.thecocktaildb.com/images/ingredients/'+name+'-Small.png'
    r = requests.get(url)
    return r

# UNTESTED
def api_get_ingredient_image_medium(name):
    # 350x350 pixels
    url = 'www.thecocktaildb.com/images/ingredients/'+name+'-Medium.png'
    r = requests.get(url)
    return r

# UNTESTED
def api_get_ingredient_image(name):
    # 700x700 pixels
    url = 'www.thecocktaildb.com/images/ingredients/'+name+'.png'
    r = requests.get(url)
    return r

cocktails = requests.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail').json()['drinks']

cocktails_details = api_get_cocktails(cocktails) # list of objects

ingredients = extract_ingredients(cocktails_details) # list of strings

ingredients_details = api_get_ingredients(ingredients) # list of objects

# printing all lists. comment out if too spammy
pprint(sorted(cocktails_details, key=lambda x: x['strDrink'].casefold()))
pprint(sorted(ingredients))
pprint(sorted(ingredients_details, key=lambda x: x['strIngredient'].casefold()))

print('Collected', len(cocktails_details), 'cocktails out of 100 in', DEFAULT_TIMEOUT, 'seconds')
print('Received', len(ingredients_details), 'ingredient details out of', len(ingredients), 'in', DEFAULT_TIMEOUT * 2, 'seconds.' )