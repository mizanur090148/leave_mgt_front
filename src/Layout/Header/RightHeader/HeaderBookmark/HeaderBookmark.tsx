import { LI, SVG } from "../../../../AbstractElements";
import { useSelector } from "react-redux";
import BookmarkBack from "./BookmarkBack";
import BookmarkBox from "./BookmarkBox";

const HeaderBookmark = () => {
  const { flip } = useSelector((state: any) => state.layout);
  return (
    <></>
    // <LI className="onhover-dropdown">
    //   <SVG iconId="header-bookmark" />
    //   <div className={`onhover-show-div bookmark-flip ${flip ? "active" : ""}`}>
    //     <div className="flip-card">
    //       <div className={`flip-card-inner ${flip ? "flipped" : ""}`}>
    //         <BookmarkBox />
    //         <BookmarkBack />
    //       </div>
    //     </div>
    //   </div>
    // </LI>
  );
};

export default HeaderBookmark;
