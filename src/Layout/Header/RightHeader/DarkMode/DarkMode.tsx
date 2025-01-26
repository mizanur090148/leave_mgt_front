import { LI, SVG } from "../../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../../../Store/Slices/LayoutSlice";
import { setMixBackgroundLayout } from "../../../../Store/Slices/ThemeCustomizerSlice";

const DarkMode = () => {
  const { mix_background_layout } = useSelector(
    (state: any) => state.themeCustomizer
  );
  const dispatch = useDispatch();
  const handleDarkMode = (name: string) => {
    dispatch(setDarkMode());
    if (name === "light" || name === "dark-sidebar") {
      document.body.classList.remove("light");
      document.body.classList.add("dark-only");
      dispatch(setMixBackgroundLayout("dark-only"));
    } else if (name === "dark-only") {
      document.body.classList.remove("dark-only");
      document.body.classList.add("light");
      dispatch(setMixBackgroundLayout("light"));
    }
  };
  return (
    <LI onClick={() => handleDarkMode(mix_background_layout)}>
      <div className={`mode ${mix_background_layout ? "active" : ""}`}>
        <SVG iconId="moon" />
      </div>
    </LI>
  );
};

export default DarkMode;
