import { Rating } from "react-simple-star-rating";
import { Col, Row } from "reactstrap";
import { Btn, H6, Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Href, MoveToCarts } from "../../../../utils/Constant";
import { Link } from "react-router-dom";
import { whishListProduct } from "../../../../Data/Application/Ecommerce/WhishList";

const WishlistData = () => {
  return (
    <Row className="g-sm-4 g-3">
      {whishListProduct.map((item: any, index: number) => (
        <Col xl="4" md="6" key={index}>
          <div className="prooduct-details-box">
            <div className="d-flex">
              <Image
                className="align-self-center img-fluid img-60"
                src={dynamicImage(`ecommerce/${item.image}`)}
                alt="#"
              />
              <div className="flex-grow-1 ms-3">
                <div className="product-name">
                  <H6>
                    <Link to={Href}>{item.name}</Link>
                  </H6>
                </div>
                <Rating initialValue={5} size={17} />
                <div className="price d-flex border-0 p-0">
                  <div className="text-muted me-2">Price</div> : 210$
                </div>
                <div className="avaiabilty">
                  <div className="text-success">InStock</div>
                </div>
                <div>
                  <Btn tag="a" href={Href} color="primary" size="xs">
                    {MoveToCarts}
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default WishlistData;
