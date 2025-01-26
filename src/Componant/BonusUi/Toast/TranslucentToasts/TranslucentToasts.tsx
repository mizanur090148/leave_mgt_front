import { useState } from "react";
import { Card, CardBody, Col, Toast, ToastBody, ToastHeader } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { TranslucentToast } from "../../../../utils/Constant";
import { Disc } from "react-feather";
import CommonToast from "../Common/CommonToast";
import {
  translucentToastData,
  translucentToastDataList,
} from "../../../../Data/BonusUi/Toast/Toast";
import { Btn } from "../../../../AbstractElements";

const TranslucentToasts = () => {
  const [open, setOpen] = useState(true);
  return (
    <Col md="6">
      <Card className="overflow-hidden">
        <CardHeaderCommon
          title={TranslucentToast}
          span={translucentToastData}
        />
        <CardBody className="toast-rtl">
          <div className="toast-container">
            <Toast isOpen={open}>
              <ToastHeader>
                <Disc className="toast-icons toast-info" />
                <strong className="me-auto">Mofi theme</strong>
                <small className="text-muted d-sm-block d-none">
                  11 mins ago
                </small>
                <Btn close className="p-0" onClick={() => setOpen(false)}></Btn>
              </ToastHeader>
              <ToastBody className="toast-dark">
                {" "}
                Hello, I'm a web-designer.
              </ToastBody>
            </Toast>
            {translucentToastDataList.map((data: any, index: any) => (
              <CommonToast item={data} key={index} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TranslucentToasts;
