import { useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { DirectionsdTooltip, TooltipOnTop } from "../../../../utils/Constant";
import CommonTooltip from "../Common/CommonTooltip";
import {
  directionTooltipData,
  directionTooltipList,
} from "../../../../Data/Ui-Kits/Tooltip/Tooltip";
import { Btn, ToolTip } from "../../../../AbstractElements";

const TooltipDirections = () => {
  const [tooltip, setTooltip] = useState(false);
  const toggle = () => setTooltip(!tooltip);
  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon
          title={DirectionsdTooltip}
          span={directionTooltipData}
        />
        <CardBody>
          <div className="common-flex">
            <Btn color="primary" id="Tooltip-8" className="mb-0 me-0">
              {TooltipOnTop}
            </Btn>
            <ToolTip
              placement="top"
              isOpen={tooltip}
              target="Tooltip-8"
              toggle={toggle}
            >
              Tooltip on top
            </ToolTip>
            {directionTooltipList.map((item: any) => (
              <CommonTooltip key={item.id} item={item} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TooltipDirections;
