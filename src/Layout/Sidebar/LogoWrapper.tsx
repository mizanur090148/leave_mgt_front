import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image, SVG } from "../../AbstractElements";
import { dynamicImage } from "../../Service";
import {
  handleResponsiveToggle,
  setToggleSidebar,
} from "../../Store/Slices/LayoutSlice";

const LogoWrapper = () => {
  const dispatch = useDispatch();
  const { toggleSidebar } = useSelector((state: any) => state.layout);
  const { sidebarIconType } = useSelector(
    (state: any) => state.themeCustomizer
  );

  return (
    <>
      <div className="logo-wrapper">
        <Link to={`/dashboard`}>
          <Image
            className="img-fluid sidebar-logo"
            src={dynamicImage("logo/logo.png")}
            alt="logo"
          />
        </Link>
        <div
          className="back-btn"
          onClick={() => dispatch(handleResponsiveToggle())}
        >
          <i className="fa fa-angle-left"></i>
        </div>
        <div className="toggle-sidebar">
          <SVG
            className={`${sidebarIconType}-icon sidebar-toggle status_toggle middle`}
            iconId={`${sidebarIconType === "fill" ? "fill-" : ""}toggle-icon`}
            onClick={() => dispatch(setToggleSidebar(!toggleSidebar))}
          />
        </div>
      </div>
      <div className="logo-icon-wrapper">
        <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
          <Image
            className="img-fluid"
            src={dynamicImage("logo/logo-icon.png")}
            alt="logo"
          />
        </Link>
      </div>
    </>
  );
};

export default LogoWrapper;
