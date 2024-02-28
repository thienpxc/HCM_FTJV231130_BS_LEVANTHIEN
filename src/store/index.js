import { configureStore } from "@reduxjs/toolkit";
import { categoryAction, categoryReducer } from "./slices/jobs.slice";

export const store = configureStore({
    reducer: {
        categoryStore: categoryReducer
    }
  
})
store.dispatch(categoryAction.jobAll())