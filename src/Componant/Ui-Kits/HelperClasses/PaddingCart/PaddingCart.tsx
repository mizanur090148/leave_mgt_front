import { Card, CardBody, Col } from "reactstrap";
import {
  paddingCartData,
  paddingCartDetail,
} from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import { Padding } from "../../../../utils/Constant";
import { H5 } from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const PaddingCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon
          title={Padding}
          span={paddingCartData}
          headClass="card-no-border pb-0"
        />
        <CardBody>
          <div className="border-wrapper h-100 alert-light-light dark-helper">
            <H5 className="f-w-600 mb-3">{Padding}</H5>
            <div className="helper-common-box helper-p-wrapper">
              <div className="helper-p-box p-10 bg-light border">
                <span>.p-10</span>
              </div>
              {paddingCartDetail.map((item: any, index: number) => (
                <div
                  className={`helper-p-box p-${item} bg-light border`}
                  key={index}
                >
                  <span>{`.p-${item}`}</span>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PaddingCart;
