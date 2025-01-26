//@ts-nocheck
import { useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap';
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import Rating from "react-rating";
import { StarRatingBar } from '../../../../utils/Constant';
import { starRatingData } from '../../../../Data/BonusUi/Rating/Rating';

const StarRating = () => {
    const [rating, setRating] = useState(1);

    return (
      <Col xxl="4" md="6">
        <Card>
          <CardHeaderCommon title={StarRatingBar} span={starRatingData} />
          <CardBody>
            <div className="rating">
              <Rating initialRating={rating} emptySymbol="text-primary star fa fa-star-o fa-2x" fullSymbol="text-primary star fa fa-star fa-2x" onChange={(rate) => setRating(rate)} />
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default StarRating