import { Input } from "reactstrap";
import { SearchMofi } from "../../../../utils/Constant";
import { ChangeEvent, useEffect, useState } from "react";
import {
  MenuItem,
  SearchSuggestionItem,
} from "../../../../Types/Layout/SidebarType";
import { MenuList } from "../../../../Data/LayoutData/SidebarData";
import { LI, SVG } from "../../../../AbstractElements";
import SearchSuggestionList from "./SearchSuggestionList";
import { useDispatch } from "react-redux";
import { getLinkItemsArray } from "../../../../Store/Slices/BookmarkHeaderSlice";
import { setResponsiveSearch } from "../../../../Store/Slices/LayoutSlice";

const SearchInputs = () => {
  const [arr, setArr] = useState<SearchSuggestionItem[]>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [searchedArray, setSearchedArray] = useState<SearchSuggestionItem[]>(
    []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const suggestionArray: SearchSuggestionItem[] = [];
    let num = 0;
    const getAllLink = (item: MenuItem, icon: string | undefined) => {
      if (item.children) {
        item.children.forEach((ele) => {
          getAllLink(ele, icon);
        });
      } else {
        num = num + 1;
        suggestionArray.push({
          icon: icon,
          title: item.title,
          path: item.path ? item.path : "",
          bookmarked: false,
          id: num,
        });
      }
    };
    MenuList?.forEach((item) => {
      item.Items?.forEach((child) => {
        getAllLink(child, child.icon);
      });
    });
    setArr(suggestionArray);
    dispatch(getLinkItemsArray(suggestionArray));
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!searchedWord) setSearchedWord("");
    setSearchedWord(e.target.value);
    let result = arr.filter((item) =>
      item.title?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedArray(result);
  };

  return (
    <>
      <LI onClick={() => dispatch(setResponsiveSearch())}>
        <span className="header-search">
          <SVG iconId="search" />
        </span>
      </LI>
      <LI>
        <div className="form-group w-100">
          <div className="Typeahead Typeahead--twitterUsers">
            <div className="u-posRelative d-flex align-items-center">
              <SVG className="search-bg svg-color" iconId="search" />
              <Input
                className="demo-input py-0 Typeahead-input form-control-plaintext w-100"
                type="text"
                placeholder={"jyfhfhg"}
                name="q"
                onChange={(e) => handleSearch(e)}
                value={searchedWord}
              />
            </div>
            <div
              className={`Typeahead-menu w-100 custom-scrollbar ${
                searchedWord.length ? "is-open" : ""
              }`}
            >
              <SearchSuggestionList
                searchedArray={searchedArray}
                setSearchedWord={setSearchedWord}
              />
            </div>
          </div>
        </div>
      </LI>
    </>
  );
};

export default SearchInputs;
