import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for pastReturn and assetsEntry
type AssetDetails = {
    partnershipBusiness: string;
    businessAsset: string;
    directoryShare: string;
    nonAgriLand: string;
    agriLand: string;
    motorVehicle: string;
    jewellery: string;
    furniture: string;
    total: string;
};

// Define the initial state with proper typing
interface TopSummaryState {
    pastReturn: AssetDetails;
    assetsEntry: AssetDetails;
}

const initialState: TopSummaryState = {
    pastReturn: {
        partnershipBusiness: "",
        businessAsset: "",
        directoryShare: "",
        nonAgriLand: "",
        agriLand: "",
        motorVehicle: "",
        jewellery: "",
        furniture: "",
        total: "",
    },
    assetsEntry: {
        partnershipBusiness: "",
        businessAsset: "",
        directoryShare: "",
        nonAgriLand: "",
        agriLand: "",
        motorVehicle: "",
        jewellery: "",
        furniture: "",
        total: "",
    }
};

const TopSummarySlice = createSlice({
    name: "topSummary",
    initialState,
    reducers: {
        pastReturnSummary: (state, action: PayloadAction<AssetDetails>) => {
            state.pastReturn = action.payload;
        },
        assetsEntrySummary: (state, action: PayloadAction<AssetDetails>) => {
            state.assetsEntry = action.payload;
        },
    },
});

export const { pastReturnSummary, assetsEntrySummary } = TopSummarySlice.actions;

export default TopSummarySlice.reducer;
