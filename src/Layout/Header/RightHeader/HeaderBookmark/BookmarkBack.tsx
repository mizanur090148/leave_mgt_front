import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkedDataType } from "../../../../Types/Layout/SidebarType";
import { Input } from "reactstrap";
import { LI, SVG, UL } from "../../../../AbstractElements";
import { Link } from "react-router-dom";
import { Back, Href } from "../../../../utils/Constant";
import { handleBookmarkChange } from "../../../../Store/Slices/BookmarkHeaderSlice";
import { setFlip } from "../../../../Store/Slices/LayoutSlice";

const BookmarkBack = () => {
  const dispatch = useDispatch();
  const { linkItemsArray } = useSelector((store: any) => store.bookmarkHeader);
  const [searchedItems, setSearchedItems] = useState<BookmarkedDataType[]>([]);
  const [searchWord, setSearchWord] = useState("");

  const searchItems = (e: string) => {
    let copyArray = [...linkItemsArray];
    let result = copyArray.filter((item: any, i: number) =>
      item.title?.toLowerCase().includes(e.toLowerCase())
    );
    setSearchedItems(result);
  };

  const handleBackButton = () => {
    dispatch(setFlip());
    setSearchWord("");
  };

  const bookMarkInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    searchItems(e.target.value);
  };
  return (
    <div className="back">
      <UL>
        <LI>
          <div className="bookmark-dropdown flip-back-content">
            <Input
              type="text"
              placeholder="search..."
              onChange={(e) => bookMarkInputChange(e)}
              value={searchWord}
            />
          </div>
          <div
            className={`filled-bookmark Typeahead-menu  ${
              searchWord ? "is-open" : ""
            } custom-scrollbar`}
          >
            {searchedItems?.map((item: any, i: number) => (
              <div key={i} className="ProfileCard u-cf">
                <div className="ProfileCard-avatar">
                  <SVG iconId={`stroke-${item.icon}`} />
                </div>
                <div className="ProfileCard-details">
                  <div className="ProfileCard-realName">
                    <Link className="realname" to={Href}>
                      {item.title}
                    </Link>
                    <span className="pull-right">
                      <Link to={Href}>
                        <i
                          onClick={() =>
                            dispatch(
                              handleBookmarkChange(linkItemsArray[item.id - 1])
                            )
                          }
                          className={`fa fa-star-o mt-1 icon-star ${
                            linkItemsArray[item.id - 1].bookmarked
                              ? "starred"
                              : ""
                          }`}
                        ></i>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {!searchedItems.length && <p>Opps!! There are no result found.</p>}
          </div>
        </LI>
        <LI onClick={handleBackButton}>
          <Link className="f-w-700 d-block flip-back" id="flip-back" to={Href}>
            {Back}
          </Link>
        </LI>
      </UL>
    </div>
  );
};

export default BookmarkBack;
