import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { SolidBorderStyles } from '../../../../../utils/Constant'
import CommonCardFooter from '../Common/CommonCardFooter'
import { solidBorderStyleData } from '../../../../../Data/Forms/FormsControl/MegaOption/MegaOption'
import SolidBorderStyleForm from './SolidBorderStyleForm'

const SolidBorderStyle = () => {
  return (
    <Col sm="12" xxl="6" className="box-col-6">
      <Card>
        <CardHeaderCommon title={SolidBorderStyles} span={solidBorderStyleData} />
        <CardBody>
          <SolidBorderStyleForm />
        </CardBody>
        <CommonCardFooter footerClass="text-end" color1="primary" color2="light"/>
      </Card>
    </Col>
  )
}

export default SolidBorderStyle