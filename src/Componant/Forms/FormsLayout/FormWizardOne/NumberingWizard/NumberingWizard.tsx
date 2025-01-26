import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { Back, NumberingWizardHeading } from "../../../../../utils/Constant";
import { numberWizardData } from "../../../../../Data/Forms/FormsLayout/FormWizardOne/FormWizardOne";
import { Btn } from "../../../../../AbstractElements";
import StepperHorizontal from "./StepperHorizontal";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent } from "react";
import BasicInfoForm from "./BasicInfoForm";
import CartInfoForm from "./CartInfoForm";
import FeedbackForm from "./FeedbackForm";
import FinishForm from "../Common/FinishForm";
import {
  handleBackButton,
  handleNextButton,
  setBasicInputFormValue,
} from "../../../../../Store/Slices/NumberingWizardSlice";

const NumberingWizard = () => {
  const { numberLevel, basicInputFormValue, showFinish } = useSelector(
    (state: any) => state.numberingWizard
  );
  const dispatch = useDispatch();

  const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value =
      name === "agreeTerms" ||
      name === "informationCheckBox" ||
      name === "agreeConditions"
        ? event.target.checked
        : name === "uploadDocumentation"
        ? event.target.files && event.target.files[0].name
        : event.target.value;
    dispatch(setBasicInputFormValue({ ...basicInputFormValue, [name]: value }));
  };

  return (
    <Col xl="6">
      <Card className="height-equal">
        <CardHeaderCommon
          title={NumberingWizardHeading}
          span={numberWizardData}
        />
        <CardBody className="basic-wizard important-validation">
          <StepperHorizontal level={numberLevel} />
          <div id="msform">
            {numberLevel === 1 && (
              <BasicInfoForm
                getUserData={getUserData}
                basicInputFormValue={basicInputFormValue}
              />
            )}
            {numberLevel === 2 && (
              <CartInfoForm
                getUserData={getUserData}
                basicInputFormValue={basicInputFormValue}
              />
            )}
            {numberLevel === 3 && (
              <FeedbackForm
                getUserData={getUserData}
                basicInputFormValue={basicInputFormValue}
              />
            )}
            {numberLevel === 4 && <FinishForm />}
          </div>
          <div className="wizard-footer d-flex gap-2 justify-content-end">
            {numberLevel > 1 && (
              <Btn
                className="alert-light-primary"
                color="transparent"
                onClick={() => dispatch(handleBackButton())}
              >
                {Back}
              </Btn>
            )}
            <Btn
              disabled={showFinish ? true : false}
              color="primary"
              onClick={() => dispatch(handleNextButton())}
            >
              {showFinish ? "Finish" : "Next"}
            </Btn>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default NumberingWizard;
