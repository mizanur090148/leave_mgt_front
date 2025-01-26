import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { AddNewBookmark, Bookmark, Href } from "../../../../utils/Constant";
import { H5, LI, SVG, UL } from "../../../../AbstractElements";
import { setFlip } from "../../../../Store/Slices/LayoutSlice";

const BookmarkBox = () => {
  const { bookmarkedData } = useSelector((state: any) => state.bookmarkHeader);
  const dispatch = useDispatch();
  return (
    <div className="front">
      <H5 className="f-18 f-w-600 mb-0 dropdown-title">{Bookmark}</H5>
      <UL className="bookmark-dropdown">
        <LI>
          <Row>
            {bookmarkedData.map((item: any, index: number) => (
              <Col xs="4" className="text-center mb-2" key={index}>
                <Link to={`${item.path}`}>
                  <div className="bookmark-content">
                    <div
                      className={`bookmark-icon bg-light-${
                        item.color ? item.color : "primary"
                      }`}
                    >
                      <SVG
                        className={`stroke-icon stroke-${
                          item.color ? item.color : "primary"
                        }`}
                        iconId={`stroke-${item.icon}`}
                      />
                    </div>
                    <span
                      className={`font-${item.color ? item.color : "primary"}`}
                    >
                      {item.title}
                    </span>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </LI>
        <LI className="text-center m-0" onClick={() => dispatch(setFlip())}>
          <Link className="flip-btn f-w-700" id="flip-btn" to={Href}>
            {AddNewBookmark}
          </Link>
        </LI>
      </UL>
    </div>
  );
};

export default BookmarkBox;
