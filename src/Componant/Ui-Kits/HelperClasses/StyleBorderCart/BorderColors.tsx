import { Col } from "reactstrap";
import { H5 } from "../../../../AbstractElements";
import { borderColorCartData } from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import { BorderColor } from "../../../../utils/Constant";

const BorderColors = () => {
  return (
    <Col xxl="3" sm="6">
      <div className="border-wrapper h-100 alert-light-light dark-helper">
        <H5 className="f-w-600 mb-3">{BorderColor}</H5>
        <div className="d-flex align-items-center mb-2 gap-2">
          <div className="helper-box border-primary border"></div>
          <span>.border-primary</span>
        </div>
        {borderColorCartData.map((item: any, index: number) => (
          <div className="d-flex align-items-center mb-2 gap-2" key={index}>
            <div className={`helper-box ${item} border`}></div>
            <span>.{item}</span>
          </div>
        ))}
      </div>
    </Col>
  );
};

export default BorderColors;
