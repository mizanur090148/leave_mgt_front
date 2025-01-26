import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import ProductFeatures from "./ProductFeatures/ProductFeatures";
import { setProductItem } from "../../../../Store/Slices/ProductSlice";
import { productsData } from "../../../../Data/Application/Ecommerce/Product";
import ProductGrid from "./ProductGrid/ProductGrid";

const ProductsContainer = () => {
  const { sideBarOn } = useSelector((state: any) => state.filterData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductItem(productsData));
  }, []);
  return (
    <Container
      fluid
      className={`product-wrapper ${sideBarOn ? "sidebaron" : ""}`}
    >
      <div className="product-grid">
        <ProductFeatures />
        <ProductGrid />
      </div>
    </Container>
  );
};

export default ProductsContainer;
