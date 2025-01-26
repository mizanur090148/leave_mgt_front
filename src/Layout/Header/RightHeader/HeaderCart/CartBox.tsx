import { Link } from "react-router-dom";
import {
  Btn,
  FeatherIcons,
  H6,
  Image,
  LI,
  UL,
} from "../../../../AbstractElements";
import { cartsData } from "../../../../Data/LayoutData/HeaderData";
import { dynamicImage } from "../../../../Service";
import { Checkout, Href } from "../../../../utils/Constant";
import { Input, InputGroup } from "reactstrap";

const CartBox = () => {
  return (
    <UL>
      {cartsData.map((data: any, index: any) => (
        <LI key={index}>
          <div className="d-flex">
            <Image
              className="img-fluid b-r-5 me-3 img-60"
              src={dynamicImage(`other-images/${data.img}`)}
              alt="cart"
            />
            <div className="flex-grow-1">
              <span className="f-w-600">{data.userName}</span>
              <div className="qty-box">
                <InputGroup>
                  <span className="input-group-prepend">
                    <Btn className="quantity-left-minus"> -</Btn>
                  </span>
                  <Input
                    className="input-number"
                    type="text"
                    name="quantity"
                    defaultValue={1}
                  />
                  <span className="input-group-prepend">
                    <Btn className="quantity-right-plus">+ </Btn>
                  </span>
                </InputGroup>
              </div>
              <H6 className="font-primary">${data.amount}</H6>
            </div>
            <div className="close-circle">
              <Link className="bg-danger" to={Href}>
                <FeatherIcons iconName="X" />
              </Link>
            </div>
          </div>
        </LI>
      ))}
      <LI className="total">
        <H6 className="mb-0">
          Order Total : <span className="f-w-600 f-right">$1000.00</span>
        </H6>
      </LI>
      <LI className="text-center">
        <Link className="d-block mb-3 view-cart f-w-700" to={"/ecommerce/cart"}>
          {"Go to your cart"}
        </Link>
        <Link
          className="btn btn-primary view-checkout"
          to={"/ecommerce/checkout"}
        >
          {Checkout}
        </Link>
      </LI>
    </UL>
  );
};

export default CartBox;
