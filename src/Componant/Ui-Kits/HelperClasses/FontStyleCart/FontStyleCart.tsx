import { Card, CardBody, Col } from "reactstrap";
import { P } from "../../../../AbstractElements";
import {
  fontData,
  fontStyleDetail,
} from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { FontStyle } from "../../../../utils/Constant";

const FontStyleCart = () => {
  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon
          title={FontStyle}
          span={fontData}
          headClass="card-no-border pb-0"
        />
        <CardBody>
          <P className="f-s-normal">
            This is a <strong>.f-s-normal</strong> font-style
          </P>
          {fontStyleDetail.map((item: any, index: number) => (
            <P className={item} key={index}>
              This is a <strong>{item}</strong> font-style
            </P>
          ))}
        </CardBody>
      </Card>
    </Col>
  );
};

export default FontStyleCart;
