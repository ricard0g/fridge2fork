import { useCallback, useMemo } from "react";
import { useGetMealDetailsByIdQuery } from "../features/api/apiSlice";
import "../styles/mealCard.css";
import Loader from "./Loader";

export default function MealCard({ id }) {
	const {
		data: mealDetails,
		isLoading: isLoadingMeal,
		error: detailsErrorMeal,
	} = useGetMealDetailsByIdQuery(id);

	const content = useMemo(() => {
		if(!id) {
			return <div role="alert" className="notMoreMealsContainer">
				<p className="notMoreMealsText">Comida No Existente</p>
			</div>
		}

		if (isLoadingMeal) {
			return <Loader />;
		}

		if (detailsErrorMeal) {
			return "Error Loading Meals Data";
		}

		if (!mealDetails) {
			return <div>No Meal Data Available</div>;
		}

		let mealTags = mealDetails.meals[0].strTags;

		if (mealTags) {
			mealTags = mealTags.split(",");
		}

		const ingredients = Object.entries(mealDetails.meals[0])
			.filter(
				([key, value]) =>
					key.startsWith("strIngredient") && value && value.trim() !== ""
			)
			.reduce((acc, [key, value]) => {
				acc[key] = value;
				return acc;
			}, {});

		return (
			<artcile className="mealCard">
				<header className="imgContainer">
					<img className="mealImg" src={mealDetails.meals[0].strMealThumb} />
				</header>
				<main className="mealInfoContainer">
					<h1 className="mealTitle">{mealDetails.meals[0].strMeal}</h1>
					<div className="tagsContainer">
					{mealTags
						? mealTags.map((mealTag, index) => {
								return (
									<span key={index} className="mealTag">
										{mealTag}
									</span>
								);
						  })
						: ""}
					</div>
					<h2 className="ingredientsTitle">Ingredients</h2>
					<ul className="ingredientsList">
						{Object.values(ingredients).map((ingredient, index) => {
							return (
								<li className="ingredientItem" key={index}>
									{ingredient}
								</li>
							);
						})}
					</ul>
				</main>
				<footer className="btnsContainer">
					<a
						href={
							mealDetails.meals[0].strSource && mealDetails.meals[0].strSource
						}
						target="_blank"
						className="linkRecipeBtn"
					>
						{mealDetails.meals[0].strSource
							? "Enlace Receta Completa"
							: "Enlace No Disponible"}
					</a>
					<a
						href={mealDetails.meals[0].strYoutube}
						className="videoLinkBtn"
						target="_blank"
					>
						Ver Vídeo de la Receta
					</a>
				</footer>
			</artcile>
		);
	}, [mealDetails, id, isLoadingMeal]);

	return <>{content}</>;
}
