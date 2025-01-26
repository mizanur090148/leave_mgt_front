import { Card, CardBody, Col, Row } from "reactstrap";
import {
  sidePaddingData,
  sidePaddingDetails,
  sidePaddings,
} from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import { H5 } from "../../../../AbstractElements";
import { OnlyOneSidePadding, PaddingLeft } from "../../../../utils/Constant";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const SidePadding = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon
          title={OnlyOneSidePadding}
          span={sidePaddingData}
          headClass="card-no-border pb-0"
        />
        <CardBody>
          <Row className="g-3">
            <Col xxl="3" sm="6">
              <div className="border-wrapper h-100 alert-light-light dark-helper">
                <H5 className="f-w-600 mb-3">{PaddingLeft}</H5>
                <div className="common-p-box">
                  {sidePaddings.map((value, index) => (
                    <span key={index}>{value}</span>
                  ))}
                </div>
              </div>
            </Col>
            {sidePaddingDetails.map((item: any, index: number) => (
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

export default SidePadding;
