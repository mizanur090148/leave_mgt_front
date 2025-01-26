import { Input } from "reactstrap";
import { NameAndPhoneNumber } from "../../../../../utils/Constant";
import { FeatherIcons, SVG } from "../../../../../AbstractElements";

const SearchContacts = () => {
  return (
    <div className="search-contacts">
      <Input type="text" placeholder={NameAndPhoneNumber}/>
      <SVG iconId="stroke-search" />
      <FeatherIcons iconName="Mic" className="feather feather-mic mic-search" />
    </div>
  );
};

export default SearchContacts;
