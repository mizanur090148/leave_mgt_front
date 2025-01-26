import { CardBody, Input, Label } from "reactstrap";
import { skillCheckBoxData } from "../../../../../../Data/JobSearch/JobSearch";

const SkillCheckBox = () => {
  return (
    <CardBody className="animate-chk">
      {skillCheckBoxData.map((data: any, index: any) => (
        <Label
          className="d-block"
          key={index}
          for={`checkbox-animate-${index}`}
          check
        >
          <Input
            className="checkbox_animated"
            id={`checkbox-animate-${index}`}
            type="checkbox"
          />
          {data}
        </Label>
      ))}
    </CardBody>
  );
};

export default SkillCheckBox;
