import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarOn: false,
  isFilter: false,
  listView: false,
  colClass: "col-xl-3 col-sm-6",
  filter: {
    brand: ["Diesel", "Hudson", "Lee", "Spykar"],
    color: "",
    value: { min: 100, max: 950 },
    sortBy: "",
    searchBy: "",
    category: [
      "Men's Jacket",
      "Fancy Men's T-shirt",
      "Fancy Women's Top",
      "Fancy Women's T-shirt",
      "Women's T-shirt",
      "Fancy T-shirt",
      "Men's T-shirt",
      "Fancy Men's T-shirt",
    ],
  },
};

const FilterSlice = createSlice({
  name: "FilterSlice",
  initialState,
  reducers: {
    filterGender: (state, action) => {
      state.filter.category.push(action.payload);
    },
    removeGender: (state, action) => {
      state.filter.category = state.filter.category.filter(
        (category) => category !== action.payload
      );
    },
    addNewBrand: (state, action) => {
      state.filter.brand.push(action.payload);
    },
    removeBrand: (state, action) => {
      state.filter.brand.splice(action.payload.index, 1);
      state.filter = { ...state.filter, brand: action.payload.category };
    },
    setIsFilter: (state: any) => {
      state.isFilter = !state.isFilter;
    },
    setSideBarOn: (state: any) => {
      state.sideBarOn = !state.sideBarOn;
    },
    setListView: (state, action) => {
      state.listView = action.payload;
    },
    setColView: (state, action) => {
      state.colClass = action.payload;
    },
    filterSearchBy: (state, action) => {
      state.filter = { ...state.filter, searchBy: action.payload };
    },
    filterColor: (state, action) => {
      state.filter = { ...state.filter, color: action.payload };
    },
    filterSortBy: (state, action) => {
      state.filter = { ...state.filter, sortBy: action.payload };
    },
    filterPrice: (state, action) => {
      state.filter = {
        ...state.filter,
        value: { min: action.payload[0], max: action.payload[1] },
      };
    },
  },
});

export const {
  setSideBarOn,
  filterColor,
  filterPrice,
  filterSortBy,
  filterSearchBy,
  setIsFilter,
  setListView,
  setColView,
  filterGender,
  removeGender,
  addNewBrand,
  removeBrand,
} = FilterSlice.actions;

export default FilterSlice.reducer;
