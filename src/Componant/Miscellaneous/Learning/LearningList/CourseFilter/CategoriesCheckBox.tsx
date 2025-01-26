import { CategoriesLearning } from "../../../../../utils/Constant";
import { learningFilterData } from "../../../../../Data/Learning/Learning";
import { Input, Label } from "reactstrap";

const CategoriesCheckBox = () => {
  return (
    <div className="checkbox-animated">
      <div className="learning-header">
        <span className="f-w-700">{CategoriesLearning}</span>
      </div>
      {learningFilterData.map((data: any, index: any) => (
        <Label
          key={index}
          className="d-block mb-2"
          htmlFor={`chk-ani-${index}`}
        >
          <Input
            className="checkbox_animated"
            id={`chk-ani-${index}`}
            type="checkbox"
          />
          {data}
        </Label>
      ))}
    </div>
  );
};

export default CategoriesCheckBox;
