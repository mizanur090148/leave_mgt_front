import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Sizes } from "../../../../utils/Constant";
import { sizeData, sizeImages } from "../../../../Data/Ui-Kits/Avtar/Avtar";

const SizesCart = () => {
  return (
    <Col xl="4" md="6">
      <Card className="height-equal">
        <CardHeaderCommon title={Sizes} span={sizeData} />
        <CardBody className="avatar-showcase">
          <div className="avatars">
            <div className="avatar">
              <Image
                width={100}
                height={100}
                className="img-100 rounded-circle"
                src={dynamicImage(`avtar/3.jpg`)}
                alt="image"
              />
            </div>
            {sizeImages.map((item: any, index: number) => (
              <div className="avatar" key={index}>
                <Image
                  width={item.size}
                  height={item.size}
                  className={`${item.className} rounded-circle`}
                  src={dynamicImage(`avtar/${item.src}`)}
                  alt="image"
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SizesCart;
