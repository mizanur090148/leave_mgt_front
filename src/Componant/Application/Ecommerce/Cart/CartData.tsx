import { useDispatch, useSelector } from "react-redux";
import { CartType } from "../../../../Types/Application/Ecommerce/Product";
import { removeCartData } from "../../../../Store/Slices/CartSlice";
import { Row, Table } from "reactstrap";
import { Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { Href } from "../../../../utils/Constant";
import { XCircle } from "react-feather";
import CartTableHead from "./CartTableHead";
import CartQuantityButton from "./CartQuantityButton";
import CartAction from "./CartAction";
import EmptyCart from "./EmptyCart";

const CartData = () => {
  const dispatch = useDispatch();
  const { symbol } = useSelector((state: any) => state.product);
  const { cart } = useSelector((state: any) => state.cartData);
  const removeFromCart = (item: CartType) => dispatch(removeCartData(item.id));

  return (
    <>
      {cart && cart.length > 0 ? (
        <Row>
          <div className="order-history table-responsive wishlist">
            <Table bordered>
              <CartTableHead />
              <tbody>
                {cart.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>
                      <Image
                        className="img-fluid img-40"
                        src={dynamicImage(`ecommerce/${item.image}`)}
                        alt="product"
                      />
                    </td>
                    <td>
                      <div className="product-name">
                        <Link to={Href}>{item.name}</Link>
                      </div>
                    </td>
                    <td>
                      {symbol}
                      {item.price}
                    </td>
                    <CartQuantityButton item={item} />
                    <td>
                      <Link to={Href} onClick={() => removeFromCart(item)}>
                        <XCircle />
                      </Link>
                    </td>
                    <td>
                      {symbol}
                      {item.price * item.total}
                    </td>
                  </tr>
                ))}
                <CartAction />
              </tbody>
            </Table>
          </div>
        </Row>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default CartData;
