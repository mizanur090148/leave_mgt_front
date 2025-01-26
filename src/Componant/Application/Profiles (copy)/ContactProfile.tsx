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

const ContactProfile = () => {
  return (
    <Col xl="9">
      <Form>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Contact Profile"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Phone No</Label>
                  <Input type="text" placeholder="Enter phone no" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                 <Label>Mobile No</Label>
                  <Input type="text" placeholder="Enter mobile no" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="text" placeholder="Enter email" />
                </FormGroup>
              </Col>
              <Col sm="12" md="12">
                <FormGroup>
                  <Label>Present Address</Label>
                  <P>Address (House/Street/Block details)</P>
                  <Input type="number" placeholder="Enter present address" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>City/Village</Label>
                  <Input type="text" placeholder="Enter city" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Postcode</Label>
                  <Input type="text" placeholder="Enter postcode" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Country</Label>
                  <Input type="text" placeholder="Enter country" />
                </FormGroup>
              </Col>
             <Col sm="12" md="12">
                <FormGroup>
                  <Label>Permanent Address</Label>
                  <P>Address (House/Street/Block details)</P>
                  <Input type="number" placeholder="Enter permanent address" />
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

export default ContactProfile;
