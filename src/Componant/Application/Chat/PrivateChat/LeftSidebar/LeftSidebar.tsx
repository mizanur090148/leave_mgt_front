import { Card, Col, Input, InputGroup, InputGroupText } from "reactstrap";
import { SearchHere } from "../../../../../utils/Constant";
import ChatOptionTab from "./ChatOptionTab";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMember } from "../../../../../Store/Slices/ChatSlice";

const LeftSidebar = () => {
  const [searchKeyword, setSearchKeyword] = useState<string | undefined>("");
  const dispatch = useDispatch();
  const handleSearchKeyword = (keyword: string) => {
    setSearchKeyword(keyword);
    dispatch(searchMember(keyword));
  };
  return (
    <Col xxl="3" xl="4" md="5" className="box-col-5">
      <Card className="left-sidebar-wrapper">
        <div className="left-sidebar-chat">
          <InputGroup>
            <InputGroupText>
              <i className="search-icon text-gray" />
            </InputGroupText>
            <Input
              type="text"
              defaultValue={searchKeyword}
              placeholder={SearchHere}
              onChange={(e) => handleSearchKeyword(e.target.value)}
            />
          </InputGroup>
        </div>
        <ChatOptionTab />
      </Card>
    </Col>
  );
};

export default LeftSidebar;
