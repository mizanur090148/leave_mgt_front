import { Card, CardBody, Col, Row } from 'reactstrap'
import { StylerBorders } from '../../../../utils/Constant'
import BorderRadius from './BorderRadius'
import BorderColors from './BorderColors'
import BorderWidths from './BorderWidths'
import TextColor from './TextColor'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { styleData } from '../../../../Data/Ui-Kits/HelperClasses/HelperClassesData'

const StyleBorderCart = () => {
  return (
    <Col xs="12">
      <Card>
        <CardHeaderCommon title={StylerBorders} span={styleData} headClass="card-no-border pb-0"/>
        <CardBody>
          <Row className="g-3">
            <BorderRadius />
            <BorderColors />
            <BorderWidths />
            <TextColor />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default StyleBorderCart