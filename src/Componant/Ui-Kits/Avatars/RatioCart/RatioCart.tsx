import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Ratio } from '../../../../utils/Constant'
import { ratioData, ratios } from '../../../../Data/Ui-Kits/Avtar/Avtar'
import { Image } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'

const RatioCart = () => {
  return (
    <Col md="6">
      <Card className="height-equal">
        <CardHeaderCommon title={Ratio} span={ratioData} />
        <CardBody className="avatar-showcase">
          <div className="avatars">
            <div className="avatar ratio">
              <Image width={100} height={100} className="b-r-8 img-100" src={dynamicImage(`avtar/11.jpg`)} alt="image" />
            </div>
            {ratios.map(({ className, src ,size}, index) => (
              <div className="avatar ratio" key={index}>
                <Image width={size} height={size} className={`b-r-8 ${className}`} src={dynamicImage(`${src}`)} alt="image" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default RatioCart