import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    assessmentIncomeYear: {
        incomeYear: "",
        assessmentYear: ""
    },
    pastReturnData: {
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
    incomeEntryData: {
        salaryIncome: "",
        capital_Gain: "",
        total: "",
    },
    assetEntryData: {
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
    liabilityData: {
        institutional: "",
        nonInstitutional: "",
        otherLiabilities: "",
        total: "",
    },
    expenseData: {
        self_and_family: "",
        housing: "",
        transport: "",
        utility: "",
        education: "",
        vacation_festival: "",
        finance: "",
        tax_paid_refund: "",
        total: "",
    }
}

const PastReturnTotalSlice = createSlice({
    name: "pastReturn",
    initialState,
    reducers: {
        assessmentIncomeYour: (state, action) => {
            state.assessmentIncomeYear = action.payload
        },
        pastReturn: (state, action) => {
            state.pastReturnData = action.payload
        },
        incomeEntry: (state, action) => {
            state.incomeEntryData = action.payload
        },
        assetEntry: (state, action) => {
            state.assetEntryData = action.payload
        },
        liability: (state, action) => {
            state.liabilityData = action.payload
        },
        expense: (state, action) => {
            state.expenseData = action.payload
        }
    }
});
export const { assessmentIncomeYour, pastReturn, incomeEntry, assetEntry, liability, expense } = PastReturnTotalSlice.actions;

export default PastReturnTotalSlice.reducer