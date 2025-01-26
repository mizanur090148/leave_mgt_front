import { useSelector } from "react-redux";
import { Image, LI, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import ProfileBox from "./ProfileBox";

const UserProfile = () => {
  const userInfo = useSelector((state: AppState) => state.auth.data);
  const nameArr = userInfo?.name?.split(" ");
  const name =
    nameArr?.length > 2 ? nameArr.slice(0, 2).join(" ") : nameArr?.join(" ");

  return (
    <LI className="profile-nav onhover-dropdown px-0 py-0">
      <div className="d-flex profile-media align-items-center">
        <Image
          className="img-37 profile-pic-circular"
          src={dynamicImage("dashboard/profile.png")}
          alt="user"
        />
        <div className="flex-grow-1">
          <span>{name}</span>
          <P className="mb-0 font-outfit">
            {userInfo?.userType}
            <i className="fa fa-angle-down" />
          </P>
        </div>
      </div>
      <ProfileBox />
    </LI>
  );
};

export default UserProfile;
