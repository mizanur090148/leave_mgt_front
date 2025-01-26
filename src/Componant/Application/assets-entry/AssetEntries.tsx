import EditProfileContainer from "../Profiles/Index";
import { useState } from "react";

import Index from "./components/Index";

const AssetEntries = () => {
  const [userType, setUserType] = useState("individual");

  return (
    <div className="page-body">
      {userType === "individual" && <Index />}
    {/*  {userType === "corporate" && <CorporateProfile />}
      {userType === "practitioner" && <PractitionerProfile />}*/}
    </div>
  );
};

export default AssetEntries;
