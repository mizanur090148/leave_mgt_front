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
import { Primary, RoundedDropdowns } from "../../../../utils/Constant";
import CommonDropDown from "../Common/CommonDropDown";
import {
  roundedData,
  roundedList,
} from "../../../../Data/Ui-Kits/Dropdown/Dropdown";

const RoundedDropdown = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={RoundedDropdowns} span={roundedData} />
        <CardBody className="rtl-dropdown">
          <div className="common-flex">
            <ButtonGroup>
              <Dropdown isOpen={open} toggle={toggle}>
                <DropdownToggle caret color="primary" className="rounded-pill">
                  {Primary}
                </DropdownToggle>
                <DropdownMenu className="dropdown-block">
                  <DropdownItem>Dark</DropdownItem>
                  <DropdownItem>Light</DropdownItem>
                  <DropdownItem>Lighter</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
            {roundedList.map((data: any, index: any) => (
              <CommonDropDown key={index} item={data} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RoundedDropdown;
