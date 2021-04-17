async function setupDatabase(update){
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

    function callUpdate() {
        update();
    }

    let drinksFetch = await fetch("http://localhost:5050/api/cocktails_details")
        .then(res => res.json())
        .then(
            (result) => {
                isDrinksLoaded = true
                drinks = result.drinks

                callUpdate();
            }
        );

    let ingredientsFetch = await fetch("http://127.0.0.1:5050/api/ingredients_details")
        .then(res => res.json())
        .then(
            (result) => {
                isIngredientsLoaded = true
                ingredients = result.ingredients;

                callUpdate();
            }
        );

    return { getDrinks, getIngredients }
}

export default setupDatabase;