import { Form, Input } from "reactstrap";
import { FeatherIcons } from "../../../AbstractElements";
import { SearchMofi } from "../../../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import {
  MenuItem,
  SearchSuggestionItem,
} from "../../../Types/Layout/SidebarType";
import { MenuList } from "../../../Data/LayoutData/SidebarData";
import ResponsiveSearchList from "./ResponsiveSearchList";
import { setResponsiveSearch } from "../../../Store/Slices/LayoutSlice";

const SearchInput = () => {
  const [arr, setArr] = useState<SearchSuggestionItem[]>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [searchedArray, setSearchedArray] = useState<SearchSuggestionItem[]>(
    []
  );
  const { responsiveSearch } = useSelector((state: any) => state.layout);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setResponsiveSearch());
    setSearchedWord("");
    document.body.classList.remove("offcanvas");
  };

  useEffect(() => {
    const suggestionArray: SearchSuggestionItem[] = [];
    const getAllLink = (item: MenuItem, icon: string | undefined) => {
      if (item.children) {
        item.children.forEach((ele) => {
          getAllLink(ele, icon);
        });
      } else {
        suggestionArray.push({
          icon: icon,
          title: item.title,
          path: item.path || "",
        });
      }
    };
    MenuList?.forEach((item) => {
      item.Items?.forEach((child) => {
        getAllLink(child, child.icon);
      });
    });
    setArr(suggestionArray);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!searchedWord) setSearchedWord("");
    setSearchedWord(e.target.value);
    let data = [...arr];
    let result = data.filter((item) =>
      item.title?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedArray(result);
  };
  return (
    <Form
      className={`form-inline search-full ${responsiveSearch ? "open" : ""}`}
      method="get"
    >
      <div className="w-100 form-group">
        <div className="Typeahead Typeahead--twitterUsers">
          <div className="u-posRelative">
            <Input
              className="demo-input Typeahead-input form-control-plaintext w-100"
              type="text"
              placeholder={SearchMofi}
              name="q"
              value={searchedWord}
              onChange={(e) => handleSearch(e)}
            />
            <div className="spinner-border Typeahead-spinner" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <FeatherIcons
              className="close-search"
              iconName="X"
              onClick={handleClose}
            />
          </div>
          <div
            className={`Typeahead-menu ${searchedWord.length ? "is-open" : ""}`}
          >
            <ResponsiveSearchList
              searchedArray={searchedArray}
              setSearchedWord={setSearchedWord}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SearchInput;
