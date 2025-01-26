import { Col } from "reactstrap";
import { dynamicImage } from "../../../../Service";
import { Carousel } from "react-responsive-carousel";

const ProductImages = () => {
  return (
    <Col sm="6">
      <div className="product-page-main p-0">
        <Carousel className="owl-carousel owl-theme" showStatus={false} showIndicators={false} showArrows={false}>
          <div className="item">
            <img src={dynamicImage("dashboard-3/slider/4.png")} />
          </div>
          <div className="item">
            <img src={dynamicImage("dashboard-3/slider/5.png")} />
          </div>
          <div className="item">
            <img src={dynamicImage("dashboard-3/slider/6.png")} />
          </div>
        </Carousel>
      </div>
    </Col>
  );
};

export default ProductImages;
