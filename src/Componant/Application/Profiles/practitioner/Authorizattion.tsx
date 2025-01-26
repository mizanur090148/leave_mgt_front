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
import { Btn, Image, P } from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { dynamicImage } from "../../../../Service";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { postRequest } from "../../../../utils/axiosRequests";

const Authorizattion = () => {
  const defaultValues = {
    company_logo: "",
    company_name: "",
    phone_no: "",
    email_address: "",
    type_of_business: "male",
    incorporation_no: "",
    trade_license_no: "",
    etin_no: "",
    bin_no: "",
    office_address: "",
    office_city: "",
    office_post_code: "",
    office_country: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CompanyProfile>({ defaultValues });

  useEffect(() => {
    //setValue("profile_type", "individual");
  }, [setValue]);



  const onSubmit: SubmitHandler<PersonalProfile> = (inputData) => {
    console.log(inputData, "inputData");
    const actionType = postRequest("auth/register", inputData);
    actionType
      .then((data: any) => {
        toast.success("Successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.log("from react query error: ", error.message);
      });
  };

  return (
    <Col xl="9">
      <Form className="theme-form" >
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Authorization"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
           {/* <Row>
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
            </Row>*/}
            <Row>

              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Person Name</Label>
                  <Input
                      type="text"
                      bsSize="sm"
                      placeholder="Enter Person Name"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Designation </Label>
                  <Input
                      type="text"
                      bsSize="sm"
                      placeholder="Enter Designation"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Phone No</Label>
                  <Input
                      type="text"
                      bsSize="sm"
                      placeholder="Enter Phone No"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input
                      type="text"
                      bsSize="sm"
                      placeholder="Enter emain"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Authority</Label>
                  <Input type="select" bsSize="sm" className="form-select">
                    <option value="authority1">Authority 1</option>
                    <option value="authority2">Authority 2</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Authorization Letter</Label>
                  <div style={{display: "flex", alignItems: "center"}}>
                   {/* <Image
                        className="img-70 rounded-circle"
                        alt="edit-user"
                        src={dynamicImage("user/7.jpg")}
                    />*/}
                    <div style={{marginLeft: "15px"}}>
                      <Btn size="sm" color="primary" type="submit">
                        Upload File / Photo
                      </Btn>
                      <span className="mb-1" style={{fontSize: "11px"}}>
                      {"Allowed JPG, File, GIF or PNG. Max size of 800K"}
                    </span>
                    </div>
                  </div>
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
            <Btn
                className="pull-right"
                color="primary"
                type="submit"
            >
              Save
            </Btn>
          </CardBody>
          <CardFooter className="text-end"></CardFooter>
        </Card>
      </Form>
    </Col>
  );
};

export default Authorizattion;
