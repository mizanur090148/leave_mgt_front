import { Card, CardBody, Col } from "reactstrap";
import {
  fontWeightData,
  fontWeightDetail,
} from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { FontWeight } from "../../../../utils/Constant";

const FontWeightCart = () => {
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon
          title={FontWeight}
          span={fontWeightData}
          headClass="card-no-border pb-0"
        />
        <CardBody>
          <div className="helper-common-box">
            <div className="f-w-100">
              You can set light font weight heading .f-w-100
            </div>
          </div>
          {fontWeightDetail.map((item: any, index: number) => (
            <div className="helper-common-box" key={index}>
              <div
                className={item}
              >{`You can set light font weight heading .${item}`}</div>
            </div>
          ))}
        </CardBody>
      </Card>
    </Col>
  );
};

export default FontWeightCart;
