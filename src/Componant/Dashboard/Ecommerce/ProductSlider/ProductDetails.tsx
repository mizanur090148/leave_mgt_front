import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import { Href, SelectSize, SpecialDiscount } from "../../../../utils/Constant";
import { H3, H4, H5, H6, LI, UL } from "../../../../AbstractElements";
import ProductColor from "./ProductColor";
import DealOfTheDay from "./DealOfTheDay";

const ProductDetails = () => {
  return (
    <Col sm="6">
      <div className="product-details my-4">
        <Link to={Href}>
          <H4 className="text-truncate">
            {"Women’s Fit and Flare Knee length one Piece Dress"}
          </H4>
        </Link>
        <H3 className="font-primary">$126</H3>
        <H5>{SelectSize}:</H5>
        <UL className="product-size simple-list flex-row">
          <LI>S </LI>
          <LI>M </LI>
          <LI>L </LI>
          <LI>XL</LI>
        </UL>
        <ProductColor />
        <div className="discount-box">
          <H6>{SpecialDiscount} </H6>
        </div>
        <DealOfTheDay />
      </div>
    </Col>
  );
};

export default ProductDetails;
