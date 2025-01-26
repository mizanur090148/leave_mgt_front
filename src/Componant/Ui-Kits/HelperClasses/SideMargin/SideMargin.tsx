import { Card, CardBody, Col, Row } from "reactstrap";
import { MarginLeft, OnlyOneSideMargin } from "../../../../utils/Constant";
import { H5 } from "../../../../AbstractElements";
import {
  sideMarginData,
  sideMarginDetails,
  sideMargins,
} from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const SideMargin = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon
          title={OnlyOneSideMargin}
          span={sideMarginData}
          headClass="card-no-border pb-0"
        />
        <CardBody>
          <Row className="g-3">
            <Col xxl="3" sm="6">
              <div className="border-wrapper h-100 alert-light-light dark-helper">
                <H5 className="f-w-600 mb-3">{MarginLeft}</H5>
                <div className="common-p-box">
                  {sideMargins.map((value, index) => (
                    <span key={index}>{value}</span>
                  ))}
                </div>
              </div>
            </Col>
            {sideMarginDetails.map((item: any, index: number) => (
              <Col xxl="3" sm="6" key={index}>
                <div className="border-wrapper h-100 alert-light-light dark-helper">
                  <H5 className="f-w-600 mb-3">{item.title}</H5>
                  <div className="common-p-box">
                    {item.direction.map((data: any, index: any) => (
                      <span key={index}>{data}</span>
                    ))}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SideMargin;
