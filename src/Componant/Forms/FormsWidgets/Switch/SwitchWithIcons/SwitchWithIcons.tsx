import { Card, CardBody, Col, Input, Label } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { SwitchWithIcon } from '../../../../../utils/Constant'
import { switchIconData, switchIconDataList } from '../../../../../Data/Forms/FormsWidgets/Switch/Switch'

const SwitchWithIcons = () => {
  return (
    <Col md="12">
      <Card>
        <CardHeaderCommon title={SwitchWithIcon} span={switchIconData} />
        <CardBody className="common-flex switch-wrapper">
          {switchIconDataList.map(({ label, flexClass, defaultChecked, disabled }, index) => (
            <div className="d-flex" key={index}>
              <Label className="col-form-label m-r-10" check>{label}</Label>
              <div className={`flex-grow-1 text-end icon-state ${flexClass}`}>
                <Label className="switch">
                  <Input type="checkbox" defaultChecked={defaultChecked} disabled={disabled} />
                  <span className="switch-state"></span>
                </Label>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default SwitchWithIcons