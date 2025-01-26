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

const AgricultureIncome = () => {
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
            title={"Agricultural Income"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row className="mb-3">

            </Row>
            <Row>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Do you have any agricultural income?</Label>
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
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Nature of Agricultural work</Label>
                  <Input
                      type="number"
                      placeholder="Nature of Agricultural work"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Do you maintain books of accounts?</Label>
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
              <Col sm="6" md="4">
                <div className="profile-title">
                  <div style={{display: "flex", alignItems: "center"}}>
                    <Image
                        className="img-70 rounded-circle"
                        alt="edit-user"
                        src={dynamicImage("user/7.jpg")}
                    />
                    <div style={{marginLeft: "15px"}}>
                      <Btn size="sm" color="primary" type="submit">
                        Upload File
                      </Btn>
                      <span className="mb-1 d-block" style={{fontSize: "11px"}}>
                      {"Allowed JPG, GIF or PNG. Max size of 800K"}
                    </span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Sales/Turnover/Receipt</Label>
                  <Input
                      type="number"
                      placeholder="Sales/Turnover/Receipt"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Gross Profit</Label>
                  <Input
                      type="number"
                      placeholder="Gross Profit"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>General Expenses, Selling Expenses, Land Re....</Label>
                  <Input
                      type="number"
                      placeholder="General Expenses, Selling Expenses, Land Re...."
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Income from sale of Tea/Rubber</Label>
                  <Input
                      type="number"
                      placeholder="Income from sale of Tea/Rubber"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label> Gain from sale of Assets</Label>
                  <Input
                      type="number"
                      placeholder=" Gain from sale of Assets"
                  />
                </FormGroup>
              </Col>

              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Net Profit</Label>
                  <Input
                      type="number"
                      placeholder="Net Profit"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Tax Deduction at Source (TDS)</Label>
                  <Input
                      type="number"
                      placeholder="Tax Deduction at Source (TDS)"
                  />
                </FormGroup>
              </Col>


              <Col sm="6" md="12">
                <FormGroup>
                  <Label>Do you maintain books of accounts?</Label>
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
              <h3>  Summary of Income</h3>
              <br/>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Sales/Turnover/Receipt</Label>
                  <Input
                      type="number"
                      placeholder="Sales/Turnover/Receipt"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Gross Profit </Label>
                  <Input
                      type="number"
                      placeholder="Gross Profit"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>General, Admin & Selling Expenses </Label>
                  <Input
                      type="number"
                      placeholder="General, Admin & Selling Expenses"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Net Profit </Label>
                  <Input
                      type="number"
                      placeholder="Net Profit"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Tax Deduction at Source (TDS) </Label>
                  <Input
                      type="number"
                      placeholder="Tax Deduction at Source (TDS)"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Profile attributable to Agricultural Income </Label>
                  <Input
                      type="number"
                      placeholder="Profile attributable to Agricultural Income"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Profit attributable to Business Income </Label>
                  <Input
                      type="number"
                      placeholder="Profit attributable to Business Income"
                  />
                </FormGroup>
              </Col>


              <Col sm="6" md="12">
                <FormGroup>
                  <Label>Do you have any income from the sale/disposal of agricultural assets?</Label>
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

              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Name of sold assets</Label>
                  <Input
                      style={{ padding: "6px 10px" }}
                      type="select"
                      bsSize="sm"
                      className="form-select select-custom">
                    <option value="1">asset 1</option>
                    <option value="2">asset 2</option>
                    <option value="3">asset 3</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Sale value of assets </Label>
                  <Input
                      type="number"
                      placeholder="Sale value of assets"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Less: Written Down Value </Label>
                  <Input
                      type="number"
                      placeholder="Less: Written Down Value"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Cost Price of Assets </Label>
                  <Input
                      type="number"
                      placeholder="Cost Price of Assets"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Less: Depreciation Charged </Label>
                  <Input
                      type="number"
                      placeholder="Less: Depreciation Charged"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Gain from sale of Assets and Capital Gain </Label>
                  <Input
                      type="number"
                      placeholder="Gain from sale of Assets and Capital Gain"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Tax Deduction at Source (TDS) </Label>
                  <Input
                      type="number"
                      placeholder="Tax Deduction at Source (TDS)"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Profile attributable to Agricultural Income </Label>
                  <Input
                      type="number"
                      placeholder="Profile attributable to Agricultural Income"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Profit attributable to Capital Gain </Label>
                  <Input
                      type="number"
                      placeholder="Profit attributable to Capital Gain"
                  />
                </FormGroup>
              </Col>


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

export default AgricultureIncome;
