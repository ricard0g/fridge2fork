export function IngredientsList({ ingredients }) {
    if (ingredients) {
        for (let i = 0; i < 6; i++) {
            console.log(ingredients.meals[i].strIngredient)
        }
    }

    return (
        <ul>
            {ingredients.meals.map((ingredient) => (
                <li>{ingredient.strIngredient}</li>
            ))}
        </ul>
    )
}
