import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import CommonSwitchSpan from "../Common/CommonSwitchSpan";
import {
  disableOutlineSwitchData,
  disableOutlineSwitchDataList,
} from "../../../../../Data/Forms/FormsWidgets/Switch/Switch";
import { DisabledOutlineSwitchHeading } from "../../../../../utils/Constant";

const DisabledOutlineSwitch = () => {
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon
          title={DisabledOutlineSwitchHeading}
          span={disableOutlineSwitchData}
        />
        <CardBody className="common-flex">
          {disableOutlineSwitchDataList.map((item: any, index: number) => (
            <div className="d-flex" key={index}>
              <div className="flex-grow-1 text-end icon-state switch-outline">
                <CommonSwitchSpan key={index} color={item} />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  );
};

export default DisabledOutlineSwitch;
