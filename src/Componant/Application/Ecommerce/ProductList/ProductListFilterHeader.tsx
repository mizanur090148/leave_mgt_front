import { useDispatch, useSelector } from "react-redux";
import { Filter } from "react-feather";
import { Link } from "react-router-dom";
import { setFilterToggle } from "../../../../Store/Slices/ProductSlice";
import { AddProduct, Href } from "../../../../utils/Constant";

const ProductListFilterHeader = () => {
  const { filterToggle } = useSelector((state: any) => state.product);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="light-box" onClick={() => dispatch(setFilterToggle())}>
        <Link to={Href}>
          <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
          <i
            className={`icon-close filter-close ${
              filterToggle ? "show" : "hide"
            }`}
          />
        </Link>
      </div>
      <Link className="btn btn-primary" to={Href}>
        <i className="fa fa-plus" />
        {AddProduct}
      </Link>
    </div>
  );
};

export default ProductListFilterHeader;
