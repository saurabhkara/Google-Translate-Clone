import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./historySlice";
import savedSearchSlice from "./savedSearchSlice";

export default configureStore({
  reducer: {
    history: historySlice,
    savedSearch: savedSearchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
