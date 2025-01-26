import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { ValidationsForms } from "../../../../../utils/Constant";
//import { formValidationSchema, validationFormInitialValue, validationFormSubTitle } from '../../../../../Data/Forms/FormsControl/FormsValidation/FormsValidation'
import { useState } from "react";
import FormValidations from "./ValidationsForm";

const ValidationForm = () => {
  const [submitErrors, setSubmitError] = useState<boolean>(false);

  // const handleSubmit = (values: FormValidationProp, { resetForm }: { resetForm: () => void }) => {
  //   resetForm();
  //   setSubmitError(false);
  // };

  return (
    <Col xl="6">
      <Card className="height-equal">
        {/* <CardHeaderCommon title={ValidationsForms} span={validationFormSubTitle} /> */}
        <CardBody>
          {/* <Formik initialValues={validationFormInitialValue} onSubmit={handleSubmit} validationSchema={formValidationSchema}>
            {({ errors }) => <FormValidations submitErrors={submitErrors} setSubmitError={setSubmitError} errors={errors} />} */}
          {/* </Formik> */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default ValidationForm;
