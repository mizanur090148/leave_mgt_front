import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterSearchBy } from "../../../../../../Store/Slices/FilterSlice";
import { Col, Form, FormGroup, Input } from "reactstrap";
import { Search } from "../../../../../../utils/Constant";

const SearchBox = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();

  const handleSearchKeyword = (keyword: string) => {
    setSearchKeyword(keyword);
    dispatch(filterSearchBy(searchKeyword));
  };
  return (
    <Col md="9" sm="12">
      <Form>
        <FormGroup className="form-group m-0">
          <Input
            type="search"
            placeholder={Search}
            onChange={(e) => handleSearchKeyword(e.target.value)}
          />
          <i className="fa fa-search"></i>
        </FormGroup>
      </Form>
    </Col>
  );
};

export default SearchBox;
