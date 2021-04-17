function setupDatabase(){
    let drinks = []
    let ingredients = []
    let isDrinksLoaded = false
    let isIngredientsLoaded = false

    function getDrinks() {
        return drinks;
    }

    function getIngredients() {
        return ingredients;
    }

    let drinksFetch = fetch("http://localhost:5050/api/cocktails_details")
        .then(res => res.json())
        .then(
            (result) => {
                isDrinksLoaded = true
                drinks = result.drinks
                console.log('got drinks')
                return "";
            }
        );

    let ingredientsFetch = fetch("http://127.0.0.1:5050/api/ingredients_details")
        .then(res => res.json())
        .then(
            (result) => {
                isIngredientsLoaded = true
                ingredients =  result.ingredients
                console.log('got ingredients')
            }
        )

    return new Promise
            .all([drinksFetch, ingredientsFetch])
            .then((res) => {
                return { getDrinks, getIngredients }
            });
}

export default setupDatabase