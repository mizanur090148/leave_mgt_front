import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Btn, Image, P } from "../../../AbstractElements";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { dynamicImage } from "../../../Service";

const PersonalProfile = () => {
  return (
    <Col xl="9">
      <Form>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Personal Profile"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row>
              <div className="profile-title">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px",
                  }}
                >
                  <Image
                    className="img-70 rounded-circle"
                    alt="edit-user"
                    src={dynamicImage("user/7.jpg")}
                  />
                  <div style={{ marginLeft: "15px" }}>
                    <Btn size="sm" color="primary" type="submit">
                      Upload Photo
                    </Btn>
                    <span className="mb-1" style={{ fontSize: "11px" }}>
                      {"Allowed JPG, GIF or PNG. Max size of 800K"}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    className="img-70 rounded-circle"
                    alt="edit-user"
                    src={dynamicImage("user/7.jpg")}
                  />
                  <div style={{ marginLeft: "15px" }}>
                    <Btn size="sm" color="primary" type="submit">
                      Upload Photo
                    </Btn>
                    <span className="mb-1" style={{ fontSize: "11px" }}>
                      {"Allowed JPG, GIF or PNG. Max size of 800K"}
                    </span>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Full Name</Label>
                  <Input type="text" placeholder="Enter full name" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Gender</Label>
                  <Input type="select" bsSize="sm" className="form-select">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Date of Birth</Label>
                  <Input
                    bsSize="sm"
                    type="date"
                    placeholder="Enter date of birth"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Age</Label>
                  <Input type="number" placeholder="Enter age" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>NID</Label>
                  <Input type="text" placeholder="Enter NID" />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Passport No</Label>
                  <Input type="text" placeholder="Enter passport no" />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label className="d-block" check for={"id"}>
                    Do you have any disabilities?
                  </Label>
                  <Input
                    className="radio_animated"
                    id={"id"}
                    type="radio"
                    name="rdo-ani"
                    defaultChecked={true}
                  />
                  <span className="radio-right-space">No</span>
                  <Input
                    className="radio_animated pl-5"
                    id={"id1"}
                    type="radio"
                    name="rdo-ani1"
                    defaultChecked={true}
                  />
                  <span>Yes</span>
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label className="d-block" check for={"id"}>
                    Are you a gazetted freedom fighter?
                  </Label>
                  <Input
                    className="radio_animated"
                    id={"id"}
                    type="radio"
                    name="rdo-ani"
                    defaultChecked={true}
                  />
                  <span className="radio-right-space">No</span>
                  <Input
                    className="radio_animated ml-5"
                    id={"id1"}
                    type="radio"
                    name="rdo-ani1"
                    defaultChecked={true}
                  />
                  <span>Yes</span>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Please provide details (ID Number):</Label>
                  <Input type="text" placeholder="" />
                </FormGroup>
              </Col>
              <Col md="6">
                <Label>Please provide details (ID Number):</Label>
                <Input type="text" placeholder="" />
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

export default PersonalProfile;
