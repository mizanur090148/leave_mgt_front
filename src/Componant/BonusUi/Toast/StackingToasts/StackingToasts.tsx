import { useState } from "react";
import { Card, CardBody, Col, Toast, ToastBody, ToastHeader } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { StackingToast } from "../../../../utils/Constant";
import { Bell } from "react-feather";
import {
  stackingToastData,
  stackingToastDataList,
} from "../../../../Data/BonusUi/Toast/Toast";
import CommonToast from "../Common/CommonToast";
import { Btn } from "../../../../AbstractElements";

const StackingToasts = () => {
  const [open, setopen] = useState(true);

  return (
    <Col md="6">
      <Card>
        <CardHeaderCommon title={StackingToast} span={stackingToastData} />
        <CardBody className="toast-rtl">
          <div className="toast-container position-static">
            <Toast isOpen={open}>
              <ToastHeader>
                <Bell className="toast-icons toast-primary" />
                <div className="me-auto">Mofi theme</div>
                <small className="txt-danger">just now</small>
                <Btn close className="p-0" onClick={() => setopen(false)}></Btn>
              </ToastHeader>
              <ToastBody className="toast-dark">
                Hello, I'm a web-designer.
              </ToastBody>
            </Toast>
            {stackingToastDataList.map((data: any, index: any) => (
              <CommonToast item={data} key={index} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default StackingToasts;
