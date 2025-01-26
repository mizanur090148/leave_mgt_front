import { useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Href, Price, Shipped, ShippedOrder } from "../../../../utils/Constant";
import { Btn, H6, Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { X } from "react-feather";
import { orderData } from "../../../../Data/Application/Ecommerce/OrderHistory";

const ShippedOrders = () => {
  const [shippedOrder, setShippedOrder] = useState(orderData);
  const deleteHandler = (id: number) => {
    const newData = shippedOrder.filter((item) => item.id !== id);
    setShippedOrder([...newData]);
  };
  return (
    <Card>
      <CommonCardHeader title={ShippedOrder} />
      <CardBody>
        <Row className="g-sm-4 g-3">
          {shippedOrder.map((item: any, index: number) => (
            <Col xl="4" md="6" key={index}>
              <div className="prooduct-details-box">
                <div className="d-flex">
                  <Image
                    className="align-self-center img-fluid img-60"
                    src={dynamicImage(`ecommerce/${item.image}`)}
                    alt={item.name}
                  />
                  <div className="flex-grow-1 ms-3">
                    <div className="product-name">
                      <H6>
                        <Link to={Href}>{item.name}</Link>
                      </H6>
                    </div>
                    <Rating initialValue={5} size={17} />
                    <div className="price d-flex p-0 border-0">
                      <div className="text-muted">{Price}</div>: 210$
                    </div>
                    <div className="avaiabilty">
                      <div className="text-success">In stock</div>
                    </div>
                    <Btn tag="a" color="success" size="xs" href={Href}>
                      {Shipped}
                    </Btn>
                    <X
                      className="close"
                      onClick={() => deleteHandler(item.id)}
                    />
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default ShippedOrders;
