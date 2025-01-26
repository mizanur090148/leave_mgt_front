import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Loader from "./Loader/Loader";
import Sidebar from "./Sidebar/Sidebar";
import TapTop from "./TapTop/TapTop";
import ThemeCustomizer from "./ThemeCustomizer/ThemeCustomizer";
import { useEffect } from "react";
import { setToggleSidebar } from "../Store/Slices/LayoutSlice";
import { setLayout } from "../Store/Slices/ThemeCustomizerSlice";

const Layout = () => {
  const { layout } = useSelector((state: any) => state.themeCustomizer);
  const dispatch = useDispatch();
  const compactSidebar = () => {
    let windowWidth = window.innerWidth;
    if (layout === "compact-wrapper") {
      if (windowWidth < 1200) {
        dispatch(setToggleSidebar(true));
      } else {
        dispatch(setToggleSidebar(false));
      }
    } else if (layout === "horizontal-wrapper") {
      if (windowWidth < 992) {
        dispatch(setToggleSidebar(true));
        dispatch(setLayout("compact-wrapper"));
      } else {
        dispatch(setToggleSidebar(false));
        dispatch(setLayout(localStorage.getItem("layout")));
      }
    }
  };
  useEffect(() => {
    compactSidebar();
    window.addEventListener("resize", () => {
      compactSidebar();
    });
  }, [layout]);
  return (
    <>
      <Loader />
      <TapTop />
      <div className={`page-wrapper ${layout}`}>
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <Outlet />
          <Footer />
        </div>
      </div>
      <ThemeCustomizer />
    </>
  );
};

export default Layout;
