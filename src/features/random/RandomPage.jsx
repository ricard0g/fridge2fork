import { useEffect, useState } from "react";
import { useGetRandomMealQuery } from "../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveRandomMeal, resetRandomMeals } from "./randomSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import "../../styles/random.css";

export default function RandomPage() {
	const savedRandomMeals = useSelector((state) => state.randomMeals);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const dispatch = useDispatch();

	const {
		data: randomMeal,
		isLoading: isLoadingRandomMeal,
		isError: randomMealError,
		refetch,
	} = useGetRandomMealQuery(null, {
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		console.log("Effect running, randomMeal:", randomMeal);
		if (randomMeal && randomMeal.meals && randomMeal.meals[0]) {
			console.log("New meal received, updating state");
			dispatch(saveRandomMeal(randomMeal.meals[0]));
			setCurrentIndex(savedRandomMeals.length);
		}
	}, [dispatch, randomMeal]);

	const currentMeal = savedRandomMeals[currentIndex];

	const handleNextMeal = () => {
		if (currentIndex === savedRandomMeals.length - 1) {
			refetch();
		} else {
			setCurrentIndex((prev) => prev + 1);
		}
	};

	const handleResetMeals = () => {
		dispatch(resetRandomMeals());
	};

	const handlePreviousMeal = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
		}
	};

	if (isLoadingRandomMeal || !currentMeal) {
		return <Loader />;
	}

	if (randomMealError) {
		return <div>There has been an error with the request</div>;
	}

	let mealTags = currentMeal.strTags ? currentMeal.strTags.split(",") : [];

	const ingredients = Object.entries(currentMeal)
		.filter(
			([key, value]) =>
				key.startsWith("strIngredient") && value && value.trim() !== ""
		)
		.reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {});

	return (
		<section className="byIngredientPageContainer">
			<nav className="navBarContainer">
				<ul className="navBarList">
					<li className="navBtnContainer">
						<button
							className="navBtn"
							onClick={handlePreviousMeal}
							disabled={currentIndex === 0}
						>
							Anterior
						</button>
					</li>
					<li>
						<Link to="/" onClick={handleResetMeals} className="navHomeBtn">
							👩🏻‍🍳
						</Link>
					</li>
					<li className="navBtnContainer">
						<button className="navBtn" onClick={handleNextMeal}>
							Siguiente
						</button>
					</li>
				</ul>
			</nav>
			<section className="randomMealContainer">
				<article className="randomMealCard">
					<header className="randomImgContainer">
						<img
							className="randomMealImg"
							src={currentMeal.strMealThumb}
							alt={currentMeal.strMeal}
						/>
					</header>
					<main className="randomMealInfoContainer">
						<h1 className="randomMealTitle">{currentMeal.strMeal}</h1>
						<div className="randomTagsContainer">
							{mealTags.map((mealTag, index) => (
								<span key={index} className="randomMealTag">
									{mealTag}
								</span>
							))}
						</div>
						<h2 className="randomIngredientsTitle">Ingredients</h2>
						<ul className="randomIngredientsList">
							{Object.values(ingredients).map((ingredient, index) => (
								<li className="randomIngredientItem" key={index}>
									{ingredient}
								</li>
							))}
						</ul>
					</main>
					<footer className="randomBtnsContainer">
						<a
							href={currentMeal.strSource}
							target="_blank"
							rel="noopener noreferrer"
							className="randomLinkRecipeBtn"
						>
							{currentMeal.strSource
								? "Enlace Receta Completa"
								: "Enlace No Disponible"}
						</a>
						<a
							href={currentMeal.strYoutube}
							className="randomVideoLinkBtn"
							target="_blank"
							rel="noopener noreferrer"
						>
							Ver Vídeo de la Receta
						</a>
					</footer>
				</article>
			</section>
		</section>
	);
}
