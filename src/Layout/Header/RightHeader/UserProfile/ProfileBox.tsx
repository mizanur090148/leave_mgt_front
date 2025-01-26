import { Link } from "react-router-dom";
import { FeatherIcons, LI, UL } from "../../../../AbstractElements";
import { profilesMessage } from "../../../../Data/LayoutData/HeaderData";
import { signOut } from "../../../../Store/Slices/AuthSlice";
import { useDispatch } from "react-redux";

const ProfileBox = () => {
  const dispatch = useDispatch();
  const handleClick = (name: string) => {
    if (name === "Log Out") {
      localStorage.removeItem("token");
      dispatch(signOut({}));
    }
  };
  return (
    <UL className="profile-dropdown onhover-show-div">
      {profilesMessage.map((data, index) => (
        <LI key={index}>
          <Link to={data.link} onClick={() => handleClick(data.name)}>
            <FeatherIcons iconName={data.icon} />
            <span>{data.name}</span>
          </Link>
        </LI>
      ))}
    </UL>
  );
};

export default ProfileBox;
