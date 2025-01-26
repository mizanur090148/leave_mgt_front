import { Col, Row } from 'reactstrap'
import { H5 } from '../../../../../AbstractElements'
import { RateNow } from '../../../../../utils/Constant'
import { Rating } from "react-simple-star-rating";
import { useState } from 'react';

const ProductRate = () => {
  const [rating, setRating] = useState(1);
  const changeRating = (newRating: number) => {
    setRating(newRating);
  };
  return (
    <Row>
      <Col md="4">
        <H5 className="product-title f-w-600">{RateNow}</H5>
      </Col>
      <Col md="8">
        <div className="d-flex">
          <Rating
            onClick={changeRating}
            initialValue={rating}
            size={17}
            style={{ padding: "0" }}
          />
          <span>(250 review)</span>
        </div>
      </Col>
    </Row>
  )
}

export default ProductRate