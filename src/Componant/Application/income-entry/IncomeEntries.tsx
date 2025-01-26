import EditProfileContainer from "../Profiles/Index";
import { useState } from "react";
import CorporateProfile from "../Profiles/corporate/CorporateProfile";
import PractitionerProfile from "../Profiles/practitioner/PractitionerProfile";
import SalaryIncome from "./components/SalaryIncome";
import Index from "./components/Index";

const IncomeEntries = () => {
  const [userType, setUserType] = useState("individual");

  return (
    <div className="page-body">
      {userType === "individual" && <Index />}
    {/*  {userType === "corporate" && <CorporateProfile />}
      {userType === "practitioner" && <PractitionerProfile />}*/}
    </div>
  );
};

export default IncomeEntries;
