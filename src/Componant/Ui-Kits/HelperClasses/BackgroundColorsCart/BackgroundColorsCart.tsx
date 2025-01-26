import { Card, CardBody, Col, Row } from 'reactstrap'
import DarkBackgrounds from './DarkBackgrounds'
import LightBackgrounds from './LightBackgrounds'
import ExtendedBackgroundColors from './ExtendedBackgroundColors'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { BackgroundColors } from '../../../../utils/Constant'
import { backgroundData } from '../../../../Data/Ui-Kits/HelperClasses/HelperClassesData'

const BackgroundColorsCart = () => {
  return (
    <Col xs="12">
      <Card>
        <CardHeaderCommon title={BackgroundColors} span={backgroundData} headClass="card-no-border pb-0"/>
        <CardBody>
          <Row className="g-3">
            <DarkBackgrounds />
            <LightBackgrounds />
            <ExtendedBackgroundColors />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BackgroundColorsCart