import { Input, Label } from "reactstrap";
import { statusCheckData } from "../../../../../Data/Learning/Learning";
import { StatusLearning } from "../../../../../utils/Constant";

const StatusCheckBox = () => {
  return (
    <div className="checkbox-animated mt-0">
      <div className="learning-header">
        <span className="f-w-600">{StatusLearning}</span>
      </div>
      {statusCheckData.map((data: any, index: any) => (
        <Label
          key={index}
          className="d-block"
          htmlFor={`StatusCheckBox-${index}`}
          check
        >
          <Input
            className="checkbox_animated"
            id={`StatusCheckBox-${index}`}
            type="checkbox"
          />
          {data}
        </Label>
      ))}
    </div>
  );
};

export default StatusCheckBox;
