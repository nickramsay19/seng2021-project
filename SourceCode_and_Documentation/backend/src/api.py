import requests
import json
import concurrent.futures
import inspect
import random
from pprint import pprint
import time

'''
Author: Henry Ho
'''

# Increasing this reduces time taken to build database and increases multithread resources required
DEFAULT_MAX_WORKERS = 100
# Increasing this increases time taken to build database with questionable increase in reliability
DEFAULT_TIMEOUT = 2

'''
Description:
Fetches drink details from the API and returns it to caller.

Args:
    id: id of the drink
    position: position in the original array

Returns:
    r : singular object from API response

Exceptions:
    ConnectTimeout: The API failed to return the request on time.
'''


def api_get_cocktail_details(id, position):
    url = 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id
    print('fetching', url, '; position:', position)
    try:
        r = requests.get(url, timeout=DEFAULT_TIMEOUT).json()['drinks'][0]
    except requests.exceptions.ConnectTimeout:
        # print('position', position)
        return
    print('received response from', id, 'in position', position)
    return r


'''
Description:
Builds a raw array of all cocktail drinks and returns it. If the fetch
request fails, it will not be included in the returned array.

Args:
    cocktails: raw list of cocktails

Returns:
    cocktails_details: list of raw object outputs from API
'''


def api_get_cocktails(cocktails):
    cocktails_details = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=DEFAULT_MAX_WORKERS) as executor:
        future_to_url = (executor.submit(api_get_cocktail_details,
                         cocktail['idDrink'], i) for i, cocktail in enumerate(cocktails))
        for future in concurrent.futures.as_completed(future_to_url):
            try:
                data = future.result()
            except Exception as exc:
                print(str(type(exc)))
                data = None
            if data != None:
                cocktails_details.append(data)

    return cocktails_details


'''
Description:
Extracts the string of all all ingredients used in the cocktails array.

Args:
    cocktails: raw list of cocktails
Returns:
    ingredients: list of strings
'''


def extract_ingredients(cocktails):
    ingredients = []
    for cocktail in cocktails:
        for i in range(1, 15):
            ingredient = 'strIngredient' + str(i)
            if cocktail[ingredient] == None or cocktail[ingredient] == '':
                break
            elif cocktail[ingredient].casefold() not in (ingredient.casefold() for ingredient in ingredients):
                ingredients.append(cocktail[ingredient].capitalize())
    return ingredients


'''
Description:
Fetches ingredient details from the API and returns it to caller. A known
issue is a type error being raised from one the ingredients called.

Args:
    name: string name of the ingredient

Returns:
    r : singular object from API response

Exceptions:
    ConnectTimeout: The API failed to return the request on time.
'''


def api_get_ingredient_details(name):
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + name
    print('fetching', url)
    try:
        ingredient_details = requests.get(url, timeout=DEFAULT_TIMEOUT).json()[
            'ingredients'][0]
    except requests.exceptions.ConnectTimeout:
        return
    print('received response from', name)
    return ingredient_details


'''
Description:
Builds a raw array of all ingredients and returns it. If the fetch
request fails, it will not be included in the returned array.

Args:
    ingredients: list of strings with the names of the ingredients

Returns:
    ingredients_details: list of raw object output from API

'''


def api_get_ingredients(ingredients):
    ingredients_details = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=DEFAULT_MAX_WORKERS) as executor:
        future_to_url = (executor.submit(api_get_ingredient_details, name)
                         for name in ingredients)
        for future in concurrent.futures.as_completed(future_to_url):
            try:
                data = future.result()
            except Exception as exc:
                print(str(type(exc)))
                data = None
            if data != None:
                ingredients_details.append(data)
    return ingredients_details


# UNTESTED
'''
Description:
Returns a 100x100 image of the ingredient since thumbnails of ingredients are not included.

Args:
    name: name of the ingredient

Returns:
    r: small image resolution of the ingredient
'''


def api_get_ingredient_image_small(name):
    url = 'www.thecocktaildb.com/images/ingredients/'+name+'-Small.png'
    r = requests.get(url)
    return r


# UNTESTED
'''
Description:
Returns a 350x350 image of the ingredient since thumbnails of ingredients are not included.

Args:
    name: name of the ingredient

Returns:
    r: medium image resolution of the ingredient
'''


def api_get_ingredient_image_medium(name):
    url = 'www.thecocktaildb.com/images/ingredients/'+name+'-Medium.png'
    r = requests.get(url)
    return r


# UNTESTED
'''
Description:
Returns a 700x700 image of the ingredient since thumbnails of ingredients are not included.

Args:
    name: name of the ingredient

Returns:
    r: full image resolution of the ingredient
'''


def api_get_ingredient_image(name):

    url = 'http://www.thecocktaildb.com/images/ingredients/'+name+'.png'
    print('fetching', name, ' image')
    try:
        r = requests.get(url, timeout=DEFAULT_TIMEOUT)
    except requests.exceptions.ConnectTimeout:
        # print('position', position)
        return
    return r

    # url = 'http://www.thecocktaildb.com/images/ingredients/'+name+'.png'
    # r = requests.get(url)
    # return r


# Does not belong here
'''
Description:
Selects from a random list of refined array of cocktails and returns one.

Returns:
    _ : refined object of a random cocktail
'''


def random_cocktail(ref_cocktails_details):
    return random.choice(ref_cocktails_details)


'''
Description:
Refines a raw object of a cocktail and returns only the necessary parts.

Args:
    cocktail: raw cocktail object

Returns:
    _: dictionary of refined cocktail
'''


def cocktail_cleanup(cocktail):
    ingredients = {}

    for i in range(1, 15):
        ingredient_name = 'strIngredient' + str(i)
        ingredient_measure = 'strMeasure' + str(i)
        if cocktail[ingredient_name] == None or cocktail[ingredient_name] == '':
            break
        else:
            ingredients[cocktail[ingredient_name]
                        ] = cocktail[ingredient_measure]

    return {
        'name':        cocktail['strDrink'],
        'id':          cocktail['idDrink'],
        'ingredients': ingredients,
        'instructions': cocktail['strInstructions'],
        'thumbnail':   cocktail['strDrinkThumb']
    }


'''
Description:
Refines the cocktail array and returns a list of dicts with only the necessary parts.

Args:
    array: list of raw cocktail objects
Returns:
    _: list of refined cocktail objects
'''


def clean_cocktails_array(array):
    return [cocktail_cleanup(cocktail) for cocktail in array]


'''
Description:
Refines a raw object of an ingredient and returns only the necessary parts.

Args:
    ingredient: raw ingredient object

Returns:
    _: dictionary of refined ingredient
'''


def ingredient_cleanup(ingredient, ref_cocktails_details):
    return {
        'ingredient':  ingredient['strIngredient'],
        'id':          ingredient['idIngredient'],
        'description': ingredient['strDescription'],
        'used_in': cocktails_using_ingredient(ingredient['strIngredient'], ref_cocktails_details),
    }


'''
Description:
Refines the ingredients array and returns a list of dicts with only the necessary parts.

Args:
    array: list of raw ingredient objects
Returns:
    _: list of refined ingredient objects
'''


def clean_ingredients_array(ingredients_details, ref_cocktails_details):
    return [ingredient_cleanup(ingredient, ref_cocktails_details) for ingredient in ingredients_details]


'''
Description:
Searches through a refined list of cocktails and returns cocktails that use the ingredient.

Args:
    ingredient: string name of the ingredient

Returns:
    used_in: list of dictionarises containing the name and id of cocktails using the ingredient

'''


def cocktails_using_ingredient(ingredient, ref_cocktails_details):
    used_in = []
    for cocktail in ref_cocktails_details:
        # if cocktail['name'] == "Empellón Cocina's Fat-Washed Mezcal":
        #     print(cocktail['name'], 'ingredients are:')
        #     pprint(cocktail['ingredients'])

        if ingredient.casefold() in (name.casefold() for name in cocktail['ingredients'].keys()):
            used_in.append({'name': cocktail['name'],
                            'id': cocktail['id']})
    return used_in


def fetch_ingredient_images(ingredients):
    ingr_imgs = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=DEFAULT_MAX_WORKERS) as executor:
        future_to_url = (executor.submit(api_get_ingredient_image,
                                         ingredient) for ingredient in ingredients)
        for future in concurrent.futures.as_completed(future_to_url):
            try:
                data = future.result()
            except Exception as exc:
                print(str(type(exc)))
                data = None
            if data != None:
                ingr_imgs.append(data)

    return ingr_imgs


t0 = time.time()

hundred_cocktails = requests.get(
    'http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail', timeout=DEFAULT_TIMEOUT).json()['drinks']
cocktails_details = api_get_cocktails(hundred_cocktails)  # list of objects
ref_cocktails_details = clean_cocktails_array(cocktails_details)
t1 = time.time()
ingredients = extract_ingredients(cocktails_details)  # list of strings
images = fetch_ingredient_images(ingredients)

ingredients_details = api_get_ingredients(ingredients)  # list of objects
ref_ingredients_details = clean_ingredients_array(
    ingredients_details, ref_cocktails_details)
t2 = time.time()

# random_ingredient = random.choice(ref_ingredients_details)

# print('random ingredient', random_ingredient['ingredient'], 'in')
# pprint(cocktails_using_ingredient(random_ingredient['ingredient'], ref_cocktails_details))

# pprint(ref_cocktails_details)
for ingredient in ref_ingredients_details:

    if ingredient['ingredient'] == 'Bailey' or ingredient['ingredient'] == 'Carrot':
        print('hello')
        pprint(ingredient)

# pprint(ref_ingredients_details)
# printing all lists. comment out if too spammy
# pprint(sorted(cocktails_details, key=lambda x: x['strDrink'].casefold()))
# pprint(sorted(ingredients))
# pprint(sorted(ingredients_details, key=lambda x: x['strIngredient'].casefold()))
pprint(images)


arr2 = [detail['ingredient'] for detail in ref_ingredients_details]
arr2.extend(ingredients)
pprint(sorted(arr2, key=str.casefold))
# if ingredient not in (detail['ingredient'] for detail in ref_ingredients_details):
#     print(ingredient, 'missing')

print('Collected', len(cocktails_details),
      'cocktails out of 100 in', round(t1 - t0, 3), 'seconds')
print('Received', len(ingredients_details), 'ingredient details out of',
      len(ingredients), 'in', round(t2 - t0, 3), 'seconds.')
