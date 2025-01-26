import { Link } from "react-router-dom";
import { LI, UL } from "../../../../../AbstractElements";
import { useDispatch } from "react-redux";
import {
  HoverButtonsProp,
  ProductItemInterface,
} from "../../../../../Types/Application/Ecommerce/Product";
import { Href } from "../../../../../utils/Constant";
import { addToCartData } from "../../../../../Store/Slices/CartSlice";

const HoverButtons = ({ item, setDataId, setOpenModal }: HoverButtonsProp) => {
  const dispatch = useDispatch();

  const AddToCarts = (item: ProductItemInterface, quantity: number) => {
    dispatch(addToCartData({ item, quantity }));
  };

  const onClickHandle = (i: ProductItemInterface) => {
    setOpenModal(true);
    setDataId(i.id);
  };
  return (
    <div className="product-hover">
      <UL className="simple-list flex-row">
        <LI>
          <Link
            onClick={() => AddToCarts(item, 1)}
            to={`${process.env.PUBLIC_URL}/ecommerce/cart`}
          >
            <i className="icon-shopping-cart ms-1"></i>
          </Link>
        </LI>
        <LI>
          <Link onClick={() => onClickHandle(item)} to={Href}>
            <i className="icon-eye"></i>
          </Link>
        </LI>
      </UL>
    </div>
  );
};

export default HoverButtons;
