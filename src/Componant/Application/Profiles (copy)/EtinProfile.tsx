import {
  Col,
  Form,
  Card,
  CardBody,
  Row,
  FormGroup,
  Label,
  Input,
  CardFooter,
} from "reactstrap";
import { Btn, Image, P } from "../../../AbstractElements";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { dynamicImage } from "../../../Service";

const EtinProfile = () => {
  return (
    <Col xl="9">
      <Form>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"ETIN Profile"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>ETIN Number</Label>
                  <Input type="text" placeholder="Enter ETIN number" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Circle</Label>
                  <Input type="select" bsSize="sm" className="form-select">
                    <option value="male">Circle 01</option>
                    <option value="female">Circle 02</option>
                    <option value="other">Circle 03</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Zone</Label>
                  <Input type="select" bsSize="sm" className="form-select">
                    <option value="male">Zone 01</option>
                    <option value="female">Zone 02</option>
                    <option value="other">Zone 03</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Tax Payer Status</Label>
                  <Input type="select" bsSize="sm" className="form-select">
                    <option value="male">Status 01</option>
                    <option value="female">Status 02</option>
                    <option value="other">Status 03</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Residenttial Status</Label>
                  <Input type="select" bsSize="sm" className="form-select">
                    <option value="male">Status 01</option>
                    <option value="female">Status 02</option>
                    <option value="other">Status 03</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Tax Payer Location</Label>
                  <Input type="select" bsSize="sm" className="form-select">
                    <option value="male">Status 01</option>
                    <option value="female">Status 02</option>
                    <option value="other">Status 03</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Old TIN</Label>
                  <Input type="text" placeholder="Enter old TIN" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Circle</Label>
                  <Input type="number" placeholder="Enter circle" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Zone</Label>
                  <Input type="number" placeholder="Enter zone" />
                </FormGroup>
              </Col>
            </Row>
            <Btn
              className="pull-right save-and-continue"
              color="primary"
              type="submit"
            >
              Save & Continue
            </Btn>
            <Btn className="pull-right" color="primary" type="submit">
              Save
            </Btn>
          </CardBody>
          <CardFooter className="text-end"></CardFooter>
        </Card>
      </Form>
    </Col>
  );
};

export default EtinProfile;
