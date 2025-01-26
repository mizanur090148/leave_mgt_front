import { Card, CardBody, Col } from "reactstrap";
import {
  fontSideData,
  fontSize,
} from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { FontSizes } from "../../../../utils/Constant";

const FontSizesCart = () => {
  return (
    <Col xs="12">
      <Card>
        <CardHeaderCommon
          title={FontSizes}
          span={fontSize}
          headClass="card-no-border pb-0"
        />
        <CardBody>
          <div className="gradient-border">
            <div className="font-wrapper border">
              <div className="f-14">Font-size .$f-14</div>
            </div>
            {fontSideData.map((item: any, index: number) => (
              <div className="font-wrapper border" key={index}>
                <div className={item}>{`Font-size .${item}`}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FontSizesCart;
