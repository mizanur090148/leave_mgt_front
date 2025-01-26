import { LI, UL } from "../../../AbstractElements";
import { useDispatch } from "react-redux";
import CommonUL from "./CommonUL";
import { setLayout } from "../../../Store/Slices/ThemeCustomizerSlice";

const Horizontal = () => {
  const dispatch = useDispatch();
  const handleLayout = (layoutName: string) => {
    localStorage.setItem("layout", layoutName);
    dispatch(setLayout(layoutName));
  };
  return (
    <LI
      className={`border-0 ${
        localStorage.getItem("layout") === "compact-wrapper" ? "active" : ""
      }`}
      onClick={() => handleLayout("compact-wrapper")}
    >
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body">
        <UL className="flex-row">
          <LI className="bg-dark sidebar compact"></LI>
          <LI className="bg-light body"></LI>
        </UL>
      </div>
    </LI>
  );
};

export default Horizontal;
