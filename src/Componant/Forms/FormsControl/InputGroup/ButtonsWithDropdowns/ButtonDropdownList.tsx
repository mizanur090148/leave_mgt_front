import React, { Fragment, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { ToggleDropdown } from "../../../../../utils/Constant";
import { ButtonDropdownListProp } from "../../../../../Types/Forms/FormsControl/FormsControls";

const ButtonDropdownList: React.FC<ButtonDropdownListProp> = ({
  color,
  title,
  options,
  outline,
  divider,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color={color} outline={outline} caret split>
        {title}
        <span className="visually-hidden">{ToggleDropdown}</span>
      </DropdownToggle>
      <DropdownMenu className="dropdown-block">
        {options.map((item: any, i: number) => (
          <Fragment key={i}>
            <DropdownItem>{item}</DropdownItem>
            {divider && i === 2 && <DropdownItem divider />}
          </Fragment>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ButtonDropdownList;
