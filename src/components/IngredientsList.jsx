import { useState } from "react";
import { Pagination } from "./Pagination";
import "../styles/ingredientsList.css";


export function IngredientsList({ ingredients }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const ingredientList = ingredients.meals;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentIngredients = ingredientList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <ul className="ingredientList">
                {currentIngredients.map((ingredient, index) => (
                    <li className="ingredientListItem" key={index}>
                        {ingredient.strIngredient}
                    </li>
                ))}
            </ul>
            <Pagination
                paginate={paginate}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={ingredientList.length}
            />
        </>
    )
}
