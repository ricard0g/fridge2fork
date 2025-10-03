import { Link, useNavigate } from "react-router-dom";
import searchIcon from "../../assets/icons/search-icon.svg";
import "../../styles/home.css";
import { useGetListOfIngredientsQuery } from "../api/apiSlice";
import { useEffect, useState, useMemo } from "react";
import { IngredientsList } from "../../components/IngredientsList";
import Loader from "../../components/Loader";

export default function Home() {
    const [showError, setShowError] = useState(false);
    const [ingredient, setIngredient] = useState("");
    const navigate = useNavigate();
    const {
        data: listOfIngredients,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetListOfIngredientsQuery();

    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(!showError);
            }, 5000)
        }
    }, [showError])

    const handleSubmit = (e) => {
        if (!ingredient.length) {
            setShowError(!showError);
            return;
        }
        e.preventDefault();
        navigate(`/ingredient/${ingredient}`);
    };

    const errorMsg = (
        <div className="inputError">
            <p className="textError">
                Tienes que escribir un ingrediente para poder buscar con este botón Marti!
            </p>
        </div>
    );

    const content = useMemo(() => {
        if (isLoading) {
            <Loader />
        }

        if (isError) {
            console.log(error);
            return new Error("There was an error during the request");
        }

        if (isSuccess && listOfIngredients) {
            return (
                <div>
                    <IngredientsList ingredients={listOfIngredients} />
                </div>
            )
        }
    })

    return (
        <section className="homePage">
            <div className="searchContainer">
                {showError && errorMsg}
                <h1 className="homeTitle">Fridge2Fork 🥘</h1>
                <div className="inputContainer">
                    <div className="searchIconContainer">
                        <img className="searchIcon" src={searchIcon} alt="Search Icon" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by ingredient..."
                        className="searchBar"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                    />
                </div>
                <div className="btnsContainerHome">
                    <Link className="homeBtn" onClick={handleSubmit}>
                        By Ingredient
                    </Link>
                    <Link to="/aleatorio" className="homeBtn">Random</Link>
                </div>
                <div>
                    {content}
                </div>
            </div>
        </section>
    );
}
