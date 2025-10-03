import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const byIngredientSlice = createSlice({
	name: "byIngredients",
	initialState: initialState,
	reducers: {
		saveMealsByIngredient: (state, action) => {
			state.push(...action.payload);
		},
		resetMeals: (state, action) => {
			return [];
		},
	},
});

export const { saveMealsByIngredient, resetMeals } = byIngredientSlice.actions;
export default byIngredientSlice.reducer;

