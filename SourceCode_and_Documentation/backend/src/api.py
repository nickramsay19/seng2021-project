import requests
import json
import concurrent.futures
import inspect
from pprint import pprint 

DEFAULT_TIMEOUT = 10

def api_get_cocktail_details(id, position):
    url = 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id
    print('fetching', url, 'position', position)
    try:
        r = requests.get(url, timeout=DEFAULT_TIMEOUT).json()['drinks'][0]
    except requests.exceptions.ConnectTimeout:
        # print('position', position)
        return None

    # if r.status_code != 200:
    #     return None
    print('received response', id, 'position', position)
    return r


def api_get_cocktails():
    cocktails = requests.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail').json()['drinks']
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
    name = name.replace(" ", "%20")
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + name
    print('fetching', url, 'name', name)
    try:
        ingredient_details = requests.get(url, timeout=DEFAULT_TIMEOUT).json()['ingredients'][0]
    except requests.exceptions.ReadTimeout:
        ingredient_details = requests.get(url, timeout=DEFAULT_TIMEOUT).json()['ingredients'][0]
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

cocktails = api_get_cocktails()

pprint(sorted(cocktails, key=lambda x: x['strDrink']))

ingredients = extract_ingredients(cocktails)

# pprint(sorted(ingredients))
# print('Total ingredients', len(ingredients))

ingredients_details = api_get_ingredients(ingredients)
# pprint(ingredients_details)

print('Collected', len(cocktails), 'cocktails out of 100 in', DEFAULT_TIMEOUT, 'seconds')
print('Received', len(ingredients_details), 'ingredient details out of', len(ingredients), 'in', DEFAULT_TIMEOUT * 2, 'seconds.' )