import { Col } from "reactstrap";
import { AdditiveRadiusHeading } from "../../../../utils/Constant";
import { radiusData } from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import { H5 } from "../../../../AbstractElements";

const AdditiveRadius = () => {
  return (
    <Col xl="4" sm="12">
      <div className="border-wrapper h-100 border">
        <H5 className="f-w-600 mb-3">{AdditiveRadiusHeading}</H5>
        <div className="d-flex align-items-center mb-2 gap-2">
          <div className="helper-radius radius-wrapper rounded"></div>.rounded
        </div>
        {radiusData.map((item: any, index: number) => (
          <div className="d-flex align-items-center mb-2 gap-2" key={index}>
            <div className={`helper-radius radius-wrapper ${item}`}></div>.
            {item}
          </div>
        ))}
      </div>
    </Col>
  );
};

export default AdditiveRadius;
