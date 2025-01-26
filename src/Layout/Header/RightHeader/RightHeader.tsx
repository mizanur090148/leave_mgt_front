import { Col } from "reactstrap";
import { UL } from "../../../AbstractElements";
//import SearchInputs from "./SearchInputs/SearchInputs";
import Notifications from "./Notifications/Notifications";
import HeaderBookmark from "./HeaderBookmark/HeaderBookmark";
import DarkMode from "./DarkMode/DarkMode";
import HeaderMessage from "./HeaderMessage/HeaderMessage";
import HeaderCart from "./HeaderCart/HeaderCart";
import UserProfile from "./UserProfile/UserProfile";
import Language from "./Language/Language";
import ZoomInOut from "./ZoomInOut/ZoomInOut";

const RightHeader = () => {
  return (
    <Col
      xxl="8"
      xl="6"
      md="7"
      xs="8"
      className="nav-right pull-right right-header p-0 ms-auto"
    >
      <UL className="nav-menus flex-row simple-list">
        {/* <SearchInputs /> */}
        <ZoomInOut />
        <Notifications />
        <HeaderBookmark />
        <DarkMode />
        <HeaderMessage />
        <HeaderCart />
        <Language />
        <UserProfile />
      </UL>
    </Col>
  );
};

export default RightHeader;
