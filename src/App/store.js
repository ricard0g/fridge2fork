import { configureStore } from "@reduxjs/toolkit";
import { mealsApi } from "../features/api/apiSlice";
import byIngredientsReducer from "../features/byIngredient/byIngredientSlice";
import randomReducer from "../features/random/randomSlice";

export const store = configureStore({
	reducer: {
		[mealsApi.reducerPath]: mealsApi.reducer,
		mealsByIngredientIds: byIngredientsReducer,
		randomMeals: randomReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(mealsApi.middleware),
});

export default store;
