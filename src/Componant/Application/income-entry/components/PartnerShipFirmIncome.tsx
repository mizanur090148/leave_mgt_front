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
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { patchRequest, postRequest } from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { signIn } from "../../../../Store/Slices/AuthSlice";

import {Btn, Image} from "../../../../AbstractElements";
import {dynamicImage} from "../../../../Service";

const PartnerShipFirmIncome = () => {
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);

  const defaultValues = {
    full_name: userInfo?.user_detail?.full_name ?? "",
    mobile: userInfo?.user_detail?.mobile ?? "",
    nid: userInfo?.user_detail?.nid ?? "",
    gender: userInfo?.user_detail?.gender ?? "male",
    passport_no: userInfo?.user_detail?.passport_no ?? "",
    dob: userInfo?.user_detail?.dob ?? "",
    disabilities: userInfo?.user_detail?.disabilities ?? false,
    disability_details: userInfo?.user_detail?.disability_details ?? "",
    freedom_fighter: userInfo?.user_detail?.freedom_fighter ?? false,
    freedom_fighter_details:
      userInfo?.user_detail?.freedom_fighter_details ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SalaryIncome>({ defaultValues });

  const disabilities = watch("disabilities");
  const full_name = watch("full_name");
  const dob = watch("dob");
  const freedom_fighter = watch("freedom_fighter");
  const gender = watch("gender");
  const nid = watch("nid");
  const passport_no = watch("passport_no");
  const disability_details = watch("disability_details");
  const freedom_fighter_details = watch("freedom_fighter_details");

  var age: number | undefined = undefined;
  if (watch("dob") || dob) {
    const now = moment();
    const birthDate = moment(dob, "YYYY-MM-DD");
    if (!birthDate.isAfter(now)) {
      age = now.diff(birthDate, "years");
    }
  }

  useEffect(() => {
    setValue("dob", dob ? dob : "");
  }, [setValue]);

  const onSubmit: SubmitHandler<SalaryIncome> = (inputData) => {
    console.log(inputData, "inputDatainputData");
    patchRequest(`auth/profile-update/${userInfo.id}`, inputData)
      .then((data: any) => {
        const updatedUserInfo = {
          ...userInfo,
          user_detail: {
            ...userInfo.user_detail,
            ...data?.data,
          },
        };
        dispatch(signIn(updatedUserInfo));
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
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Partner Ship Firm Income"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row className="mb-3">

            </Row>
            <Row>
              <Col sm="6" md="12">
                <FormGroup>
                  <Label>Do you have any Income from Partnership Business?</Label>
                  <br/>
                  <Input
                      className="radio_animated"
                      id="rental_income-no"
                      type="radio"
                      value="false"

                  />
                  <span className="radio-right-space">No</span>
                  <Input
                      className="radio_animated pl-5"
                      id="rental_income-yes"
                      type="radio"
                      value="true"

                  />
                  <span>Yes</span>
                </FormGroup>
              </Col>
              <br/>
              <h3>Business : 01 (Name, Address)</h3>
              <br/>

              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Name of Business</Label>
                  <Input
                      type="number"
                      placeholder="Name of Business"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Percentage of Share</Label>
                  <Input
                      type="number"
                      placeholder="Percentage of Share"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>ETIN of Business</Label>
                  <Input
                      type="number"
                      placeholder="ETIN of Business"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Nature of Business</Label>
                  <Input
                      type="number"
                      placeholder="Nature of Business"
                  />
                </FormGroup>
              </Col>

              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Address </Label>
                  <Input
                      type="number"
                      placeholder="Address "
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Is the Business exempted from tax ?</Label>
                  <br/>
                  <Input
                      className="radio_animated"
                      id="rental_income-no"
                      type="radio"
                      value="false"

                  />
                  <span className="radio-right-space">No</span>
                  <Input
                      className="radio_animated pl-5"
                      id="rental_income-yes"
                      type="radio"
                      value="true"

                  />
                  <span>Yes</span>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Are the Financial Statements Audited?</Label>
                  <br/>
                  <Input
                      className="radio_animated"
                      id="rental_income-no"
                      type="radio"
                      value="false"

                  />
                  <span className="radio-right-space">No</span>
                  <Input
                      className="radio_animated pl-5"
                      id="rental_income-yes"
                      type="radio"
                      value="true"

                  />
                  <span>Yes</span>
                </FormGroup>
              </Col>
              <Col>
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
                <div style={{marginLeft: "15px"}}>
                  <Btn size="sm" color="primary" type="submit">
                    Upload Audit Report
                  </Btn>
                  <span className="mb-1 d-block" style={{fontSize: "11px"}}>
                      {"Allowed File, PDF, JPG, GIF or PNG. Max size of 800K"}
                    </span>
                </div>
              </div>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Opening Capital</Label>
                  <Input
                      type="number"
                      placeholder="Opening Capital"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Profit before Tax</Label>
                  <Input
                      type="number"
                      placeholder="Profit before Tax"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Closing Capital</Label>
                  <Input
                      type="number"
                      placeholder="Closing Capital"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Tax Paid</Label>
                  <Input
                      type="number"
                      placeholder="Tax Paid"
                  />
                </FormGroup>
              </Col>
              <br/>
              <hr/>
              <br/>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Capital attributable to me</Label>
                  <Input
                      type="number"
                      placeholder="Capital attributable to me"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Profit attributable to me</Label>
                  <Input
                      type="number"
                      placeholder="Profit attributable to me"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Tax attributable to me	</Label>
                  <Input
                      type="number"
                      placeholder="Tax attributable to me	"
                  />
                </FormGroup>
              </Col>

need to Add More Business
            </Row>
            <Btn
                className="pull-right save-and-continue"
                color="primary"
                type="submit"
                onClick={() => handleSubmit(onSubmit)}
            >
              Save & Continue
            </Btn>
            <Btn
                className="pull-right"
                color="primary"
                type="submit"
                onClick={() => handleSubmit(onSubmit)}
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

export default PartnerShipFirmIncome;
