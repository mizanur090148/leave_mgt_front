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
import {Btn, Image} from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const ServicePlan = () => {
  return (
    <Col xl="9">
      <Form>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Service Plans"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row>
              <div className="service-plans">
                <div className="plan">
                  <h2>Basic</h2>
                  <p> Recommended for individuals with complex tax scenarios </p>
                  <p className="price">BDT 1200</p>
                  <ul>
                    <li>Service Location: City Corporation Area</li>
                    <li>Return Preparation: Fully Automated</li>
                    <li>Data Entry Model: Corporate Admin</li>
                    <li>Review By: Easy tax Expert</li>
                    <li>Return Submission: Easy Tax Team</li>
                    <li>Edits: Unlimited</li>
                    <li>Data Storage: 500 MB</li>
                    <li>Return Download: Unlimited</li>
                  </ul>
                  {/* <ul>
                    <li>10 GB Storage</li>
                    <li>100 GB Bandwidth</li>
                    <li>24/7 Support</li>
                  </ul>*/}
                  <br/>
                  <button>Choose Plan</button>

                </div>
                <div className="plan">
                <h2>Premium</h2>
                  <p> Best suited for individuals seeking personalized tax planning advice   </p>
                  <p className="price">BDT 2500</p>
                  <ul>
                    <li>Service Location: City Corporation Area</li>
                    <li>Return Preparation: Fully Automated</li>
                    <li>Data Entry Model: Easy Tax Team</li>
                    <li>Review By: Easy tax Expert</li>
                    <li>Return Submission: Easy Tax Team</li>
                    <li>Edits: Unlimited</li>
                    <li>Data Storage: 500 MB</li>
                    <li>Return Download: Unlimited</li>
                  </ul>
                  {/* <ul>
                    <li>10 GB Storage</li>
                    <li>100 GB Bandwidth</li>
                    <li>24/7 Support</li>
                  </ul>*/}
                  <br/>
                  <button>Upgrade</button>
                </div>

              </div>
            </Row>
            <Row>

              <Col md="6">
                <FormGroup>
                  <Label>No. Of Employee</Label>
                  <Input type="text" placeholder="No. Of Employee"/>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Discount Coupon</Label>
                  <Input type="text" placeholder="Discount Coupon"/>
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>Total Cost</Label>
                  <Input type="text" placeholder="total cost"/>
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

export default ServicePlan;
