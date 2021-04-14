import requests
import json
import concurrent.futures
import inspect
from pprint import pprint 

def api_get_cocktail_details(id, position):
    url = 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id
    print('fetching', url, 'position', position)
    try:
        r = requests.get(url, timeout=5).json()['drinks'][0]
    except requests.exceptions.ConnectTimeout:
        # print('position', position)
        return None

    # if r.status_code != 200:
    #     return None
    print('received response', id, 'position', position)
    return r


def api_get_cocktails():
    r = requests.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
    cocktails = r.json()['drinks']
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
            # try:
                
            #     cocktails_details.append(data)
            #     print(data)
            # except AttributeError:
            #     print('reached error')    
            #     # if not inspect.isclass(data):
            #     #     cocktails_details.append(data.result())
        
        pprint(cocktails_details)
        print('cocktails_details length', len(cocktails_details))
    # for cocktail in cocktails:
    #     print(cocktail['strDrink'])
    #     details = requests.get('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+cocktail['idDrink'])
    #     print(details.json()['drinks'][0])
    return cocktails

api_get_cocktails()