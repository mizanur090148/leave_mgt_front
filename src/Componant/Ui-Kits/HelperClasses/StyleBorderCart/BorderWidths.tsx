import { Col } from "reactstrap";
import { BorderWidth } from "../../../../utils/Constant";
import { borderWidthData } from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import { H5 } from "../../../../AbstractElements";

const BorderWidths = () => {
  return (
    <Col xxl="3" sm="6">
      <div className="border-wrapper h-100 alert-light-light dark-helper">
        <H5 className="f-w-600 mb-3">{BorderWidth}</H5>
        <div className="d-flex align-items-center mb-2 gap-2">
          <div className="helper-box border-1 border"> </div>
          <span>.border-1</span>
        </div>
        {borderWidthData.map((item: any, index: number) => (
          <div className="d-flex align-items-center mb-2 gap-2" key={index}>
            <div className={`helper-box ${item} border`}> </div>
            <span>.{item}</span>
          </div>
        ))}
      </div>
    </Col>
  );
};

export default BorderWidths;
