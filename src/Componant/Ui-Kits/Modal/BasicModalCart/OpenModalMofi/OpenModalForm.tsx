import { useState } from "react";
import { Col, Form, FormGroup, Input, Label, ModalBody, Row } from "reactstrap";
import {
  EmailAddress,
  EnterYourFirstName,
  EnterYourLastName,
  FirstName,
  LastName,
  MofiEmail,
  SignUp,
  TermsAndCondition,
} from "../../../../../utils/Constant";
import { FormSubmitProp } from "../../../../../Types/Ui-Kits/UiKitsTypes";
import { formSchema } from "../../../../../Data/Ui-Kits/Modal/Modal";
import { Btn } from "../../../../../AbstractElements";

const OpenModalForm: React.FC<FormSubmitProp> = ({ modal }) => {
  const [formSubmit, setFormSubmit] = useState(false);
  return (
    <ModalBody>
      <Form>
        <Row className="g-3">
          <Col md="6">
            <FormGroup>
              <Label>{FirstName}</Label>
              <Input
                type="text"
                name="firstname"
                className={`form-control`}
                placeholder={EnterYourFirstName}
              />
            </FormGroup>
          </Col>
          {/* <Col md="6">
                <FormGroup>
                  <Label>{LastName}</Label>
                  <Input type="text" name="lastname" className={`form-control ${formSubmit && `${errors.lastname ? "is-invalid" : "is-valid"}`}`} placeholder={EnterYourLastName} />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>{EmailAddress}</Label>
                  <Input type="text" name="email" className={`form-control ${formSubmit && `${errors.lastname ? "is-valid" : "is-invalid"}`}`} placeholder={MofiEmail} />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup check>
                  <Input className="form-check-input" type="checkbox" name="agree" />
                  <Label check className="text-success">{TermsAndCondition}</Label>
                </FormGroup>
                <Btn color="primary" onClick={() => setFormSubmit(true)}>{SignUp}</Btn>
              </Col> */}
        </Row>
      </Form>
    </ModalBody>
  );
};

export default OpenModalForm;
