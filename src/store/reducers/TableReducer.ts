import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tableData from "./tableData";

export interface TableItem {
  id: string;
  name: string;
  email: string;
  count: number;
  price: number;
  delivery: "empty" | "country" | "city" ;
  country: string;
  city: string[];
}

interface TableState {
  data: TableItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TableState = {
  data: [],
  isLoading: false,
  error: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    loadData(state) {
      state.isLoading = true;
      state.error = null;
      state.data = tableData;
      state.isLoading = false;
    },
    updateData(state, action: PayloadAction<TableItem>) {
      const index = state.data.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      } else {
        state.data.push(action.payload);
      }
    },
    deleteData(state, action: PayloadAction<TableItem>) {
      state.data = state.data.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { loadData, updateData, deleteData } = tableSlice.actions;

export default tableSlice.reducer;
