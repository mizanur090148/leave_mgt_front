import { useDispatch } from "react-redux";
import {
  CartQuantityButtonProp,
  CartType,
} from "../../../../Types/Application/Ecommerce/Product";
import {
  decrementData,
  incrementData,
} from "../../../../Store/Slices/CartSlice";
import { Input, InputGroup } from "reactstrap";
import { Btn } from "../../../../AbstractElements";

const CartQuantityButton = ({ item }: CartQuantityButtonProp) => {
  const dispatch = useDispatch();

  const incrementQty = (product: CartType, quantity: number) =>
    dispatch(incrementData({ item: product, quantity: quantity }));
  const decrementQuantity = (id: number) => dispatch(decrementData(id));
  return (
    <td>
      <fieldset className="qty-box w-50 border-0">
        <InputGroup className="d-flex flex-nowrap">
          <Btn
            color="primary"
            className="btn-square bootstrap-touchspin-down"
            onClick={() => decrementQuantity(item.id)}
          >
            <i className="fa fa-minus"></i>
          </Btn>
          <Input
            className="touchspin text-center"
            type="text"
            name="quantity"
            value={item.total}
            readOnly
          />
          <Btn
            color="primary"
            className="btn-square bootstrap-touchspin-up"
            onClick={() => incrementQty(item, 1)}
          >
            <i className="fa fa-plus"></i>
          </Btn>
        </InputGroup>
      </fieldset>
    </td>
  );
};

export default CartQuantityButton;
