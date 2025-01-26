import { Card, CardBody, Col, Label } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import CommonSwitchSpan from '../Common/CommonSwitchSpan'
import { BordersWithIcon } from '../../../../../utils/Constant'
import { borderIconSwitchData, borderIconSwitchDataList } from '../../../../../Data/Forms/FormsWidgets/Switch/Switch'

const BordersWithIcons = () => {
  return (
    <Col xl="4">
      <Card className="height-equal">
        <CardHeaderCommon title={BordersWithIcon} span={borderIconSwitchData} />
        <CardBody className="common-flex flex-column switch-wrapper ">
          {borderIconSwitchDataList.map(({ color, text }, index) => (
            <div className="d-flex align-items-center" key={index}>
              <div className="text-end icon-state switch-outline">
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

export default BordersWithIcons