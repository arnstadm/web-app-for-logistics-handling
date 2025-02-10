import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const ItemTypesDropdown = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{props.dropDownValue}</DropdownToggle>
      <DropdownMenu>
        {props.types.map(type => (
          <DropdownItem key={type.item_type_id}>
            <div onClick={props.changeValue} id={type.item_type_id}>
              {type.item_type_name}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ItemTypesDropdown;
