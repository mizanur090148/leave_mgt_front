import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { WithoutBordersStyles } from '../../../../../utils/Constant'
import CommonCardFooter from '../Common/CommonCardFooter'
import { withoutBorderData } from '../../../../../Data/Forms/FormsControl/MegaOption/MegaOption'
import WithoutBordersStyleForm from './WithoutBordersStyleForm'

const WithoutBordersStyle = () => {
  return (
    <Col sm="12" xxl="6" className="box-col-6">
      <Card>
        <CardHeaderCommon title={WithoutBordersStyles} span={withoutBorderData} />
        <CardBody>
          <WithoutBordersStyleForm />
        </CardBody>
        <CommonCardFooter footerClass="text-end" color1="warning" color2="light-warning" btn2Class="list-light-warning"/>
      </Card>
    </Col>
  )
}

export default WithoutBordersStyle