import { Card, CardBody, Col, Label } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { iconSwitchData, iconSwitchDataList } from '../../../../../Data/Forms/FormsWidgets/Switch/Switch'
import { IconsSwitchHeading } from '../../../../../utils/Constant'
import CommonSwitchSpan from '../Common/CommonSwitchSpan'

const IconsSwitch = () => {
  return (
    <Col xl="4" sm="6">
      <Card className="height-equal">
        <CardHeaderCommon title={IconsSwitchHeading} span={iconSwitchData} />
        <CardBody className="common-flex flex-column switch-wrapper">
          {iconSwitchDataList.map(({ color, text }, index) => (
            <div className="d-flex align-items-center" key={index}>
              <div className="text-end icon-state">
                <CommonSwitchSpan color={color} defaultChecked/>
              </div>
              <Label className="m-l-10" check>{text}</Label>
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default IconsSwitch