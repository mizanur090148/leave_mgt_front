import { Link } from "react-router-dom";
import { P, SVG } from "../../../AbstractElements";
import { SearchSuggestionListType } from "../../../Types/Layout/SidebarType";
import { useDispatch } from "react-redux";
import { setResponsiveSearch } from "../../../Store/Slices/LayoutSlice";

const ResponsiveSearchList = ({
  searchedArray,
  setSearchedWord,
}: SearchSuggestionListType) => {
  const dispatch = useDispatch();
  const handleSearch = () => {
    setSearchedWord("");
    dispatch(setResponsiveSearch());
  };
  return (
    <>
      {searchedArray?.map((item: any, index: number) => (
        <div className="ProfileCard u-cf" key={index}>
          <div className="ProfileCard-avatar">
            <SVG
              className="feather feather-airplay m-0"
              iconId={`stroke-${item.icon}`}
            />
          </div>
          <div className="ProfileCard-details">
            <div className="ProfileCard-realName">
              <Link
                className="realname  w-auto d-flex justify-content-start gap-2"
                to={item.path}
                onClick={handleSearch}
              >
                {item.title}
              </Link>
            </div>
          </div>
        </div>
      ))}
      {!searchedArray?.length && <P>Opps!! There are no result found.</P>}
    </>
  );
};

export default ResponsiveSearchList;
