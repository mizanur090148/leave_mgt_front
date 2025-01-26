import { useDispatch } from "react-redux";
import { H5, UL } from "../../../AbstractElements";
import { Mix_Layout } from "../../../utils/Constant";
import BgLight from "./BgLight";
import BgDark from "./BgDark";
import ConfigDB from "../../../Config/ThemeConfig";
import { setMixBackgroundLayout } from "../../../Store/Slices/ThemeCustomizerSlice";

const MixLayoutComponent = () => {
  const dispatch = useDispatch();
  const mixLayout = ConfigDB.data.color.mix_background_layout;

  const addMixBackgroundLayout = (mix_background_layout: string) => {
    ConfigDB.data.color.mix_background_layout = mix_background_layout;
    dispatch(setMixBackgroundLayout(mix_background_layout));
  };

  const handleCustomizerMix_Background = (value: string) => {
    addMixBackgroundLayout(value);
    if (value === "dark-sidebar") {
      document.body.classList.add("dark-sidebar");
      document.body.classList.remove("dark-only");
    } else if (value === "dark-only") {
      document.body.classList.remove("dark-sidebar");
      document.body.classList.add("dark-only");
    }
  };
  return (
    <>
      <H5>{Mix_Layout}</H5>
      <UL className="layout-grid customizer-mix flex-row simple-list">
        <BgLight
          mixLayout={mixLayout}
          handleCustomizerMix_Background={handleCustomizerMix_Background}
        />
        <BgDark
          mixLayout={mixLayout}
          handleCustomizerMix_Background={handleCustomizerMix_Background}
        />
      </UL>
    </>
  );
};

export default MixLayoutComponent;
