import { useSelector } from "react-redux";
import EditProfileContainer from "../../../Componant/Application/Profiles/Index";
import CorporateProfile from "../../../Componant/Application/Profiles/corporate/CorporateProfile";
import PractitionerProfile from "../../../Componant/Application/Profiles/practitioner/PractitionerProfile";

const Profile = () => {
  let userInfo = useSelector((state: any) => state.auth.data);

  return (
    <div className="page-body">
      {userInfo?.profile_type === "individual" && <EditProfileContainer />}
      {userInfo?.profile_type === "corporate" && <CorporateProfile />}
      {userInfo?.profile_type === "practitioner" && <PractitionerProfile />}
    </div>
  );
};

export default Profile;
