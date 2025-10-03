import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mealsApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.themealdb.com/api/json/v1/1",
    }),
    endpoints: (builder) => ({
        getMealsByIngredient: builder.query({
            query: (ingredient) => `/filter.php?i=${ingredient}`,
        }),
        getMealDetailsById: builder.query({
            query: (id) => `/lookup.php?i=${id}`,
        }),
        getRandomMeal: builder.query({
            query: () => `/random.php`,
            keepUnusedDataFor: 0,
        }),
        getListOfIngredients: builder.query({
            query: () => `/list.php?i=list`
        })
    }),
});

export const {
    useGetMealsByIngredientQuery,
    useGetMealDetailsByIdQuery,
    useGetRandomMealQuery,
    useGetListOfIngredientsQuery,
} = mealsApi;
