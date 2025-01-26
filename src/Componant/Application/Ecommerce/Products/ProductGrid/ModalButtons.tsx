import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ModalButtonsProp,
  ProductItemInterface,
} from "../../../../../Types/Application/Ecommerce/Product";
import { addToCartData } from "../../../../../Store/Slices/CartSlice";
import { AddToCartHeading, ViewDetails } from "../../../../../utils/Constant";

const ModalButtons = ({ singleProduct, quantity }: ModalButtonsProp) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddToCarts = (item: ProductItemInterface) => {
    dispatch(addToCartData({ item, quantity }));
    navigate(`${process.env.PUBLIC_URL}/ecommerce/cart`);
  };
  return (
    <div className="addcart-btn">
      <Link
        to={`${process.env.PUBLIC_URL}/ecommerce/cart`}
        className="btn btn-primary"
        onClick={() => AddToCarts(singleProduct)}
      >
        {AddToCartHeading}
      </Link>
      <Link
        to={`${process.env.PUBLIC_URL}/ecommerce/product_page`}
        className="btn btn-primary ms-2"
      >
        {ViewDetails}
      </Link>
    </div>
  );
};

export default ModalButtons;
