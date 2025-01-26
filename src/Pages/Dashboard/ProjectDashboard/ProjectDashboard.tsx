import ContainerProject from "../../../Componant/Dashboard/ProjectDashboard/ProjectDashboard";
import { useDispatch, useSelector } from "react-redux";
import { assetEntry, incomeEntry, pastReturn, liability, expense, assessmentIncomeYour } from "../../../Store/Slices/PastReturnTotalSlice";
import { getRequest } from "../../../utils/axiosRequests";
import { useEffect } from "react";

const ProjectDashboard = () => {
  const dispatch = useDispatch();
  const pastReturnData = useSelector((state: any) => state?.pastReturn?.pastReturnData);
  const assetEnrtyData = useSelector((state: any) => state?.pastReturn?.assetEntryData);

  const getTotalPastReturnData = async () => {
    try {
      const res = await getRequest(`past-return-total`);
      dispatch(pastReturn(res?.data));
    } catch (error: any) {
      console.error("Error fetching data:", error?.message);
    }
  };

  const getTotalIncomeData = async () => {
    try {
      const res = await getRequest(`income-entry-total`);
      dispatch(incomeEntry(res?.data));
    } catch (error: any) {
      console.error("Error fetching data:", error?.message);
    }
  };

  const getTotalAsssetEntryData = async () => {
    try {
      const res = await getRequest(`assets-return-total`);
      dispatch(assetEntry(res?.data));
    } catch (error: any) {
      console.error("Error fetching data:", error?.message);
    }
  };

  const getTotalLiabilityData = async () => {
    try {
      const res = await getRequest(`liabilities-total`);
      dispatch(liability(res?.data));
    } catch (error: any) {
      console.error("Error fetching data:", error?.message);
    }
  };

  const getTotalExpenseData = async () => {
    try {
      const res = await getRequest(`expenses-total`);
      dispatch(expense(res?.data));
    } catch (error: any) {
      console.error("Error fetching data:", error?.message);
    }
  };

  const getIncomeAndAssessment = async () => {
    try {
      const res = await getRequest(`settings/income-and-assessment`);
      dispatch(assessmentIncomeYour(res?.data));
    } catch (error: any) {
      console.error("Error fetching data:", error?.message);
    }
  };

  useEffect(() => {
    getIncomeAndAssessment();
    getTotalPastReturnData();
    getTotalIncomeData();
    getTotalAsssetEntryData();
    getTotalLiabilityData();
    getTotalExpenseData();
  }, []);
  
  return (
    <div className='page-body'>
      <ContainerProject />
    </div>
  );
};

export default ProjectDashboard;
