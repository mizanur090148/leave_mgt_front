import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { HorizontalStyles } from '../../../../../utils/Constant'
import CommonCardFooter from '../Common/CommonCardFooter'
import { horizontalStyleData } from '../../../../../Data/Forms/FormsControl/MegaOption/MegaOption'
import HorizontalStyleForm from './HorizontalStyleForm'

const HorizontalStyle = () => {
  return (
    <Col sm="12" xxl="6" className="box-col-12">
      <Card className="height-equal">
        <CardHeaderCommon title={HorizontalStyles} span={horizontalStyleData} />
        <CardBody>
          <HorizontalStyleForm />
        </CardBody>
        <CommonCardFooter footerClass="text-end" color1="primary" btn1Class='m-r-15' color2="light" />
      </Card>
    </Col>
  )
}

export default HorizontalStyle