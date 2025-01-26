import { featuresData } from '../../../../Data/Miscellaneous/Faq'
import { Card, CardBody, CardFooter, Col } from 'reactstrap'
import { H5, Image } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'
import { Rating } from "react-simple-star-rating";
import FaqProductHover from './FaqProductHover';

const FaqFeaturesTutorialDetail = () => {
  return (
    <>
      {featuresData.map((item, id) => (
        <Col xl="3" md="6" className="box-col-3" key={id}>
          <Card className="features-faq product-box">
            <div className="faq-image product-img">
              <Image alt="feature" className="img-fluid" src={dynamicImage(`${item.img}`)} />
              <FaqProductHover />
            </div>
            <CardBody>
              <H5 className="f-w-600">{item.title}</H5>
              <p>{item.short_description}</p>
            </CardBody>
            <CardFooter className="d-flex align-items-center justify-content-between">
              <span>{item.date}</span>
              <Rating fillColor={"var(--theme-deafult)"} initialValue={Math.random() * 5} size={14} />
            </CardFooter>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default FaqFeaturesTutorialDetail