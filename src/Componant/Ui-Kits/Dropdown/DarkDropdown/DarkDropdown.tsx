import { useState } from 'react'
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { DarkDropdowns, DarkNight } from '../../../../utils/Constant';
import { darkData } from '../../../../Data/Ui-Kits/Dropdown/Dropdown';

const DarkDropdown = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <Col xl="4" sm="6">
      <Card className="height-equal">
        <CardHeaderCommon title={DarkDropdowns} span={darkData} />
        <CardBody className="dropdown-basic m-0 rtl-dropdown">
          <div className="common-flex dark-dropdown">
            <Dropdown isOpen={open} toggle={toggle}>
              <DropdownToggle caret color="dark" className="text-white">{DarkNight}</DropdownToggle>
              <DropdownMenu className="dropdown-menu-dark dropdown-block mt-1">
                <DropdownItem active header>Dark moon</DropdownItem>
                <DropdownItem>Dark owl</DropdownItem>
                <DropdownItem>Nightfall</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DarkDropdown