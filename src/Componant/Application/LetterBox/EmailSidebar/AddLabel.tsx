import { NavItem, NavLink } from "reactstrap";
import { AddLabelHeading } from "../../../../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../../Store/Slices/LetterBoxSlice";

const AddLabel = () => {
  const { modal } = useSelector((state: any) => state.letterBox);
  const dispatch = useDispatch();
  return (
    <NavItem>
      <NavLink onClick={() => dispatch(setModal(!modal))}>
        <i className="fa fa-plus" />
        {AddLabelHeading}
      </NavLink>
    </NavItem>
  );
};

export default AddLabel;
