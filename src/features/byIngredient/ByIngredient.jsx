import { Link, useParams } from "react-router-dom";
import { useGetMealsByIngredientQuery } from "../api/apiSlice";
import { useEffect, useMemo, useState, useCallback } from "react";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { saveMealsByIngredient, resetMeals } from "./byIngredientSlice";
import MealCard from "../../components/MealCard";
import "../../styles/byIngredient.css";

export default function ByIngredient() {
	const { ingredient } = useParams();
	const [mealPlaceId1, setMealPlaceId1] = useState(0);
	const [mealPlaceId2, setMealPlaceId2] = useState(1);
	const mealsIds = useSelector((state) => state.mealsByIngredientIds);
	const formattedIngredient = ingredient.replace(/\s/g, "_").toLowerCase();
	const {
		data: mealsByIngredient,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetMealsByIngredientQuery(formattedIngredient);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isSuccess && mealsByIngredient.meals) {
			const mealsIds = mealsByIngredient.meals.map((meal) => meal.idMeal);
			dispatch(saveMealsByIngredient(mealsIds));
		}
	}, [isSuccess, mealsByIngredient, dispatch, ingredient]);

	const handleNextMeal = useCallback(() => {
		setMealPlaceId1((prev) => Math.min(prev + 2, mealsIds.length - 2));
		setMealPlaceId2((prev) => Math.min(prev + 2, mealsIds.length - 1));
	}, [mealsIds.length]);

	const handlePreviousMeal = useCallback(() => {
		setMealPlaceId1((prev) => Math.max(prev - 2, 0));
		setMealPlaceId2((prev) => Math.max(prev - 2, 1));
	}, []);

	const handleResetMealsByGoingHome = () => {
		dispatch(resetMeals());
	};

	const content = useMemo(() => {
		if (isLoading) {
			return <Loader />;
		}

		if (!mealsIds.length) {
			return (
				<div role="alert" className="notFoundContainer">
					<p className="notFoundText">
						Marti, no hay comidas con{" "}
						<span className="notFoundSpan">"{ingredient}"</span> de ingrediente!
						Lo siento te he fallado 😔
					</p>
				</div>
			);
		}

		if (isError) {
			console.log(error);
			return "No Meals Available";
		}

		const mealId1 = mealsIds[mealPlaceId1];
		const mealId2 = mealsIds[mealPlaceId2];

		if (isSuccess && mealsIds.length) {
			return (
				<section className="mealCardsContainer">
					<MealCard id={mealId1} />
					<MealCard id={mealId2} />
				</section>
			);
		}
	});

	return (
		<section className="byIngredientPageContainer">
			<nav className="navBarContainer">
				<ul className="navBarList">
					<li className="navBtnContainer">
						<button onClick={handlePreviousMeal} className="navBtn">
							Anterior
						</button>
					</li>
					<li>
						<Link
							to="/"
							className="navHomeBtn"
							onClick={handleResetMealsByGoingHome}
						>
							👩🏻‍🍳
						</Link>
					</li>
					<li className="navBtnContainer">
						<button onClick={handleNextMeal} className="navBtn">
							Siguiente
						</button>
					</li>
				</ul>
			</nav>
			{content}
		</section>
	);
}
