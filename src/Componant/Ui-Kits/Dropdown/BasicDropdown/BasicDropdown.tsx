import { useState } from "react";
import {
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { BasicDropdowns, Dashboard } from "../../../../utils/Constant";
import {
  dropDownData,
  dropDownList,
} from "../../../../Data/Ui-Kits/Dropdown/Dropdown";
import CommonDropDown from "../Common/CommonDropDown";

const BasicDropdown = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={BasicDropdowns} span={dropDownData} />
        <CardBody className="rtl-dropdown">
          <div className="common-flex">
            <ButtonGroup>
              <Dropdown isOpen={open} toggle={toggle}>
                <DropdownToggle caret color="primary">
                  {Dashboard}
                </DropdownToggle>
                <DropdownMenu className="dropdown-block">
                  <DropdownItem>Project</DropdownItem>
                  <DropdownItem>Ecommerce</DropdownItem>
                  <DropdownItem>Crypto</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
            {dropDownList.map((data: any, index: any) => (
              <CommonDropDown item={data} key={index} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicDropdown;
