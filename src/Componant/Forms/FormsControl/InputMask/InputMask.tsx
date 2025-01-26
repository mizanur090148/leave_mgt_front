import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { DefaultInputMask, InputMasks } from '../../../../utils/Constant'
import { H6 } from '../../../../AbstractElements'
import { inputMaskData } from '../../../../Data/Forms/FormsControl/InputMask/InputMask'
import DateFormat from './DateFormat/DateFormat'
import TimeFormat from './TimeFormat/TimeFormat'
import DefaultInputMaskForm from './DefaultInputMaskForm/DefaultInputMaskForm'

const InputMaskContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs="12">
          <Card>
            <CardHeaderCommon title={InputMasks} span={inputMaskData} />
            <CardBody>
              <Row className="g-3">
                <DateFormat />
                <TimeFormat />
                <Col xs="12">
                  <div className="card-wrapper border rounded-3 light-card checkbox-checked">
                    <H6 className="sub-title">{DefaultInputMask}</H6>
                    <DefaultInputMaskForm />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default InputMaskContainer