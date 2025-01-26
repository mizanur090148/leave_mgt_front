import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductDetailsProp } from "../../../../../Types/Application/Ecommerce/Product";
import { H4, P } from "../../../../../AbstractElements";
import { starData } from "../../../../../Data/Application/Ecommerce/Product";

const ProductDetails = ({ item }: ProductDetailsProp) => {
  const { symbol } = useSelector((state: any) => state.product);
  return (
    <div className="product-details">
      {starData}
      <Link to={`${process.env.PUBLIC_URL}/ecommerce/product_page`}>
        <H4>{item.name}</H4>
      </Link>
      <P>{item.note}</P>
      <div className="product-price">
        {symbol}
        {item.price}{" "}
        <del>
          {symbol}
          {item.discountPrice}
        </del>
      </div>
    </div>
  );
};

export default ProductDetails;
