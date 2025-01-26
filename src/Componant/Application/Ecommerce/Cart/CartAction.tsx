import { useSelector } from "react-redux";
import { Input, InputGroup } from "reactstrap";
import { Btn, H4 } from "../../../../AbstractElements";
import {
  Apply,
  Checkout,
  ContinueShopping,
  EnterCouponCode,
  TotalPrice,
} from "../../../../utils/Constant";
import { Link } from "react-router-dom";
import { getallCardTotal } from "../../../../Service/Ecommerce.service";

const CartAction = () => {
  const { cart } = useSelector((state: any) => state.cartData);
  const { symbol } = useSelector((state: any) => state.product);
  return (
    <>
      <tr>
        <td colSpan={4}>
          <InputGroup>
            <Input className="me-2" type="text" placeholder={EnterCouponCode} />
            <Btn tag="a" color="primary" className="text-white">
              {Apply}
            </Btn>
          </InputGroup>
        </td>
        <td className="total-amount">
          <H4 className="m-0 text-end">
            <span className="f-w-700">{TotalPrice} :</span>
          </H4>
        </td>
        <td>
          <span>
            {symbol}
            {getallCardTotal(cart)}
          </span>
        </td>
      </tr>
      <tr>
        <td className="text-end" colSpan={5}>
          <Link
            to={`${process.env.PUBLIC_URL}/ecommerce/products`}
            className="btn btn-secondary cart-btn-transform"
          >
            {ContinueShopping}
          </Link>
        </td>
        <td>
          <Link
            className="btn btn-success cart-btn-transform"
            to={`${process.env.PUBLIC_URL}/ecommerce/checkout`}
          >
            {Checkout}
          </Link>
        </td>
      </tr>
    </>
  );
};

export default CartAction;
