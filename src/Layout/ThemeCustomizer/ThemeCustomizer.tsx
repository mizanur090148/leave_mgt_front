import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavCustomizer from "./NavCustomizer/NavCustomizer";
import TabCustomizer from "./TabCustomizer/TabCustomizer";
import { setOpenCus } from "../../Store/Slices/ThemeCustomizerSlice";

const ThemeCustomizer = () => {
  const [selected, setSelected] = useState("sidebar-type");
  const { openCus } = useSelector((state: any) => state.themeCustomizer);
  const dispatch = useDispatch();

  const callbackNav = (select: string, open: boolean) => {
    setSelected(select);
    dispatch(setOpenCus(open));
  };
  return (
    <>
      <div className={`customizer-links ${openCus ? "open" : ""}`}>
        <NavCustomizer callbackNav={callbackNav} selected={selected} />
      </div>
      <div className={`customizer-contain ${openCus ? "open" : ""}`}>
        <TabCustomizer selected={selected} callbackNav={callbackNav} />
      </div>
    </>
  );
};

export default ThemeCustomizer;
