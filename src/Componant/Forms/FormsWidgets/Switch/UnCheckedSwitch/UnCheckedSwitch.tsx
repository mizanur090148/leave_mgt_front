import { Card, CardBody, Col, Label } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { uncheckedSwitchData, uncheckedSwitchDataList } from '../../../../../Data/Forms/FormsWidgets/Switch/Switch'
import CommonSwitchSpan from '../Common/CommonSwitchSpan'
import { UncheckedSwitchHeading } from '../../../../../utils/Constant'

const UnCheckedSwitch = () => {
  return (
    <Col xl="4" sm="6">
      <Card className="height-equal">
        <CardHeaderCommon title={UncheckedSwitchHeading} span={uncheckedSwitchData} />
        <CardBody className="common-flex flex-column switch-wrapper">
          {uncheckedSwitchDataList.map(({ color, text }, index) => (
            <div className="d-flex align-items-center" key={index}>
              <div className="text-end">
                <CommonSwitchSpan color={color} defaultChecked />
              </div>
              <Label className="m-l-10" check>{text}</Label>
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default UnCheckedSwitch