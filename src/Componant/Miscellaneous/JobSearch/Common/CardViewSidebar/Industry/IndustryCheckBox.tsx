import { CardBody, Input, Label } from "reactstrap";
import { industryData } from "../../../../../../Data/JobSearch/JobSearch";

const IndustryCheckBox = () => {
  return (
    <CardBody className="animate-chk">
      {industryData.map((data: any, index: any) => (
        <Label
          className="d-block"
          key={index}
          for={`industryCheckBox-${index}`}
          check
        >
          <Input
            className="checkbox_animated"
            id={`industryCheckBox-${index}`}
            type="checkbox"
          />
          {data.industryTitle}({data.industryNumber})
        </Label>
      ))}
    </CardBody>
  );
};

export default IndustryCheckBox;
