import { Link } from "react-router-dom";
import { H6, Image, LI, UL } from "../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import LogoWrapper from "./LogoWrapper";
import SimpleBar from "simplebar-react";
import { Back, Pinned } from "../../utils/Constant";
import { dynamicImage } from "../../Service";
import { ArrowLeft, ArrowRight } from "react-feather";
import SidebarMenuList from "./SidebarMenuList";
import { scrollToLeft, scrollToRight } from "../../Store/Slices/LayoutSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { layout } = useSelector((state: any) => state.themeCustomizer);
  const { toggleSidebar, margin } = useSelector((state: any) => state.layout);
  //const { pinedMenu } = useSelector((state: any) => state.layout);
  return (
    <div
      className={`sidebar-wrapper ${toggleSidebar ? "close_icon" : ""}`}
      id="sidebarwrappers"
    >
      <LogoWrapper />
      <nav className="sidebar-main">
        <div
          className={`left-arrow ${margin === 0 ? "disabled" : ""}`}
          onClick={() => dispatch(scrollToLeft())}
        >
          <ArrowLeft />
        </div>
        <div
          id="sidebar-menu"
          style={{
            marginLeft: layout === "horizontal-wrapper" ? `${margin}px` : "0px",
          }}
        >
          <UL className="sidebar-links" id="simple-bar">
            <SimpleBar style={{ width: "80px", height: "350px" }}>
              <LI className="back-btn">
                {/* <Link to={`/dashboard`}>
                  <Image
                    className="img-fluid"
                    src="../../assets/images/logo/logo.png"
                    // src={dynamicImage("logo/milon.png")}
                    alt="logo"
                  />
                </Link> */}
                <div className="mobile-back text-end ">
                  <span>{Back}</span>
                  <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
                </div>
              </LI>
              {/* <LI
                className={`pin-title sidebar-main-title ${
                  pinedMenu.length > 1 ? "show" : ""
                } `}
              >
                <div>
                  <H6>{Pinned}</H6>
                </div>
              </LI> */}
              <SidebarMenuList />
            </SimpleBar>
          </UL>
        </div>
        <div
          className={`right-arrow ${margin === -3500 ? "disabled" : ""}`}
          onClick={() => dispatch(scrollToRight())}
        >
          <ArrowRight />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
