import { Fragment, Key, useState } from "react";
import { useSelector } from "react-redux";
import { MenuList } from "../../Data/LayoutData/SidebarData";
import Menulist from "./Menulist";
import { MenuItem } from "../../Types/Layout/SidebarType";
//import { useTranslation } from "react-i18next";

const SidebarMenuList = () => {
  const userInfo = useSelector((state: AppState) => state.auth.data);
  const [activeMenu, setActiveMenu] = useState<string[]>([]);

  const filteringData = () => {
    return MenuList;
  };

  return (
    <>
      {MenuList &&
        filteringData()?.map(
          (mainMenu: MenuItem, index: Key | null | undefined) => (
            <Fragment key={index}>
              {/* <LI
              className={`sidebar-main-title ${
                shouldHideMenu(mainMenu) ? "d-none" : ""
              }`}
            >
              <div>
                <H6 className={mainMenu.lanClass && mainMenu.lanClass}>
                  {t(mainMenu.title)}
                </H6>
              </div>
            </LI> */}
              <Menulist
                menu={mainMenu.Items}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                level={0}
              />
            </Fragment>
          )
        )}
    </>
  );
};

export default SidebarMenuList;
