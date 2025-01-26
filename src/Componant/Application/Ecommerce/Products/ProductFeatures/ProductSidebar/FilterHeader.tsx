import { useDispatch } from "react-redux";
import { CardHeader } from "reactstrap";
import { H4 } from "../../../../../../AbstractElements";
import { Filters } from "../../../../../../utils/Constant";
import { setSideBarOn } from "../../../../../../Store/Slices/FilterSlice";

const FilterHeader = () => {
  const dispatch = useDispatch();
  return (
    <CardHeader>
      <H4 className="mb-0 f-w-600">
        {Filters}
        <span className="pull-right" onClick={() => dispatch(setSideBarOn())}>
          <i className="fa fa-chevron-down toggle-data"></i>
        </span>
      </H4>
    </CardHeader>
  );
};

export default FilterHeader;
