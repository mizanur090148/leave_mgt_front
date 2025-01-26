import { Col } from "reactstrap";
import { H5 } from "../../../../AbstractElements";
import { darkBackgroundData } from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";
import { DarkBackground } from "../../../../utils/Constant";

const DarkBackgrounds = () => {
  return (
    <Col xl="4" sm="6">
      <div className="border-wrapper h-100 border">
        <H5 className="f-w-600 mb-3">{DarkBackground}</H5>
        <div className="d-flex align-items-center mb-2 gap-2">
          <div className="helper-box bg-primary"></div>.bg-primary
        </div>
        {darkBackgroundData.map((item: any, index: number) => (
          <div className="d-flex align-items-center mb-2 gap-2" key={index}>
            <div className={`helper-box ${item}`}></div>.{item}
          </div>
        ))}
      </div>
    </Col>
  );
};

export default DarkBackgrounds;
