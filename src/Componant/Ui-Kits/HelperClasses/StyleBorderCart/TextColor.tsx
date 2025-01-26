import { Col } from "reactstrap";
import { H5 } from "../../../../AbstractElements";
import { TextColors } from "../../../../utils/Constant";
import { textColorData } from "../../../../Data/Ui-Kits/HelperClasses/HelperClassesData";

const TextColor = () => {
  return (
    <Col xxl="3" sm="6">
      <div className="border-wrapper alert-light-light h-100 dark-helper">
        <H5 className="f-w-600 mb-3">{TextColors}</H5>
        <div className="d-flex align-items-center mb-2 gap-2">
          <div className="helper-box helper-text border txt-primary">C </div>
          <span>.txt-primary</span>
        </div>
        {textColorData.map((item: any, index: number) => (
          <div className="d-flex align-items-center mb-2 gap-2" key={index}>
            <div
              className={`helper-box helper-text border ${item} ${
                item === "txt-light" ? "bg-dark" : ""
              }`}
            >
              C{" "}
            </div>
            <span>.{item}</span>
          </div>
        ))}
      </div>
    </Col>
  );
};

export default TextColor;
