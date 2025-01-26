import { useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Image } from "../../../../../../AbstractElements";
import FilterHeader from "./FilterHeader";
import Category from "./Category";
import PriceRange from "./PriceRange";
import SearchBox from "./SearchBox";

const ProductSidebar = () => {
  const { isFilter } = useSelector((state: any) => state.filterData);
  return (
    <Row>
      <Col sm="3">
        <div className={`product-sidebar ${isFilter ? "open" : ""}`}>
          <div className="filter-section">
            <Card>
              <FilterHeader />
              <div className="left-filter">
                <CardBody className="filter-cards-view animate-chk">
                  <Category />
                  <PriceRange />
                  <div className="product-filter text-center">
                    <Image
                      className="img-fluid banner-product"
                      src={"../assets/images/ecommerce/banner.jpg"}
                      alt="product"
                    />
                  </div>
                </CardBody>
              </div>
            </Card>
          </div>
        </div>
      </Col>
      <SearchBox />
    </Row>
  );
};

export default ProductSidebar;
