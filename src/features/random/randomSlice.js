import { createSlice } from "@reduxjs/toolkit";
import { resetMeals } from "../byIngredient/byIngredientSlice";

const initialState = [];

export const randomSlice = createSlice({
	name: "random",
	initialState: initialState,
	reducers: {
		saveRandomMeal: (state, action) => {
			state.push(action.payload);
		},
		resetRandomMeals: (state, action) => {
			return [];
		},
	},
});

export const { saveRandomMeal, resetRandomMeals } = randomSlice.actions;
export default randomSlice.reducer;
