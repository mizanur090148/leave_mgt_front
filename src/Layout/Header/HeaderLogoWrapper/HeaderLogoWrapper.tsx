import { Link } from "react-router-dom";
import Image from "../../../CommonElements/Media";
import { dynamicImage } from "../../../Service";
import { SVG } from "../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSidebar } from "../../../Store/Slices/LayoutSlice";

const HeaderLogoWrapper = () => {
  const dispatch = useDispatch();
  const { toggleSidebar } = useSelector((state: any) => state.layout);
  return (
    <div className="header-logo-wrapper col-auto p-0">
      <div className="logo-wrapper">
        <Link to={"/"}>
          <Image
            className="img-fluid"
            src={dynamicImage("logo/logo.png")}
            alt="MofiLogo"
          />
        </Link>
      </div>
      <div className="toggle-sidebar">
        <SVG
          className="stroke-icon sidebar-toggle status_toggle middle"
          iconId={"toggle-icon"}
          onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}
        ></SVG>
      </div>
    </div>
  );
};

export default HeaderLogoWrapper;
