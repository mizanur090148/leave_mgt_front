import { useDispatch, useSelector } from "react-redux";
import {
  ContactCreated,
  ContactHistory,
  Href,
} from "../../../../../utils/Constant";
import { H6, H4, P } from "../../../../../AbstractElements";
import { Link } from "react-router-dom";
import { setHistory } from "../../../../../Store/Slices/ContactSlice";

const HistoryClass = () => {
  const { history } = useSelector((state: any) => state.contact);
  const dispatch = useDispatch();
  return (
    <div id="right-history" className={history ? "show" : ""}>
      <div className="modal-header p-l-20 p-r-20">
        <H4 className="modal-title w-100">
          {ContactHistory}
          <span className="pull-right">
            <Link
              className="closehistory"
              to={Href}
              onClick={() => dispatch(setHistory())}
            >
              <i className="icofont icofont-close"></i>
            </Link>
          </span>
        </H4>
      </div>
      <div className="history-details">
        <div className="text-center">
          <i className="icofont icofont-ui-edit"></i>
          <P>{"Contact has not been modified yet."}</P>
        </div>
        <div className="d-flex">
          <i className="icofont icofont-star me-3"></i>
          <div className="flex-grow-1 mt-0">
            <H6 className="mt-0">{ContactCreated}</H6>
            <P className="mb-0">{"Contact is created via mail"}</P>
            <span className="f-12">Sep 10, 2022 4:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryClass;
