import { Input } from "reactstrap";
import { CustomFormSelectProp } from "../../../../../Types/Forms/FormsLayout/FormWizardOne";

const CustomFormSelect = ({
  inputId,
  options,
  title,
}: CustomFormSelectProp) => {
  return (
    <Input type="select" id={inputId}>
      <option defaultValue="">{title}</option>
      {options.map((item: any, i: number) => (
        <option key={i} value={i}>
          {item}
        </option>
      ))}
    </Input>
  );
};

export default CustomFormSelect;
