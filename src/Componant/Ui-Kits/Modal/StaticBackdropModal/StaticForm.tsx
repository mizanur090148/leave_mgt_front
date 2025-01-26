import React from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import {
  CheckMeOut,
  Email,
  Password,
  SignIn,
} from "../../../../utils/Constant";
import { StaticModalToggleProp } from "../../../../Types/Ui-Kits/UiKitsTypes";
import { Btn } from "../../../../AbstractElements";

const StaticForm: React.FC<StaticModalToggleProp> = ({ staticModalToggle }) => {
  return (
    <Form>
      <Row className="g-3">
        <Col md="12">
          <Label>{Email}</Label>
          <Input
            className="form-control"
            name="email"
            type="email"
            placeholder="Enter Your Email"
          />
        </Col>
        <Col md="12">
          <Label>{Password}</Label>
          <Input
            className="form-control"
            name="password"
            type="password"
            placeholder="Enter Your Password"
          />
        </Col>
        <Col xs="12">
          <div className="form-check">
            <Input type="checkbox" />
            <Label className="form-check-label" for="gridCheck">
              {CheckMeOut}
            </Label>
          </div>
        </Col>
        <Col xs="12">
          <Btn color="primary" onClick={staticModalToggle}>
            {SignIn}
          </Btn>
        </Col>
      </Row>
    </Form>
  );
};

export default StaticForm;
