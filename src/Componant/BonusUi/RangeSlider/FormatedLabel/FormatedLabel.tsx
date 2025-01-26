import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { FormatedLabels } from '../../../../utils/Constant'
import FormatedLabelForm from './FormatedLabelForm'
import { defaultRangeData } from '../../../../Data/BonusUi/RangeSlider/RangeSlider'

const FormatedLabel = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={FormatedLabels} span={defaultRangeData} />
        <CardBody>
          <FormatedLabelForm />
        </CardBody>
      </Card>
    </Col>
  )
}

export default FormatedLabel