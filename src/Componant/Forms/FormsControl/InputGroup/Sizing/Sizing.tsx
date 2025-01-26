import { Card, CardBody, Col, Input, InputGroup, InputGroupText } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { DefaultInput, LargeInput, Sizings, SmallInput } from '../../../../../utils/Constant'
import { sizingDatas } from '../../../../../Data/Forms/FormsControl/InputGroup/InputGroup'

const Sizing = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={Sizings} span={sizingDatas} />
        <CardBody className="card-wrapper input-group-wrapper">
          <InputGroup size="sm">
            <InputGroupText id="inputGroup-sizing-sm">{SmallInput}</InputGroupText>
            <Input type="text" />
          </InputGroup>
          <InputGroup size="default">
            <InputGroupText id="inputGroup-sizing-default">{DefaultInput}</InputGroupText>
            <Input type="text" />
          </InputGroup>
          <InputGroup size="lg">
            <InputGroupText id="inputGroup-sizing-lg">{LargeInput}</InputGroupText>
            <Input type="text" />
          </InputGroup>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Sizing