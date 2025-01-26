import { LI, UL } from "../../../AbstractElements";
import { useDispatch } from "react-redux";
import CommonUL from "./CommonUL";
import { setLayout } from "../../../Store/Slices/ThemeCustomizerSlice";

const Vertical = () => {
  const dispatch = useDispatch();
  const handleLayout = (layoutName: string) => {
    localStorage.setItem("layout", layoutName);
    dispatch(setLayout(layoutName));
  };
  return (
    <LI
      data-attr="normal-sidebar"
      className={`border-0 ${
        localStorage.getItem("layout") === "horizontal-wrapper" ? "active" : ""
      }`}
      onClick={() => handleLayout("horizontal-wrapper")}
    >
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body">
        <UL className="simple-list">
          <LI className="bg-dark sidebar"></LI>
          <LI className="bg-light body"></LI>
        </UL>
      </div>
    </LI>
  );
};

export default Vertical;
