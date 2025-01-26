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

import { Btn } from "../../../../AbstractElements";

const RentalIncome = () => {
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);
  const [count, setCount] = useState([1]);

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

  const dob = watch("dob");
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

  const addMore = () => {
    setCount([...count, 1]);
  };

  const deleteRentalIncome = (index: number) => {
    setCount(count.splice(index, 1));
  };

  const rentalIncome = () => {
    return count.map((item, index) => {
      return (
        <>
          <Row className="fw-bold">
            <Col> Property: 01 (Type, Location, Unit, Size)</Col>
            <Col className="text-end">
              {index !== 0 && (
                <i
                  style={{ fontSize: "17px" }}
                  className="fa fa-times-circle text-danger del-custom"
                  onClick={() => deleteRentalIncome(index)}
                ></i>
              )}
            </Col>
          </Row>
          <Row>
            <br />
            <br />
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Do you have any ownership sharing ?</Label>
                <Input
                  style={{ padding: "6px 10px" }}
                  type="select"
                  bsSize="sm"
                  className="form-select select-custom"
                >
                  <option value="male">Yes</option>
                  <option value="female">No</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>What is your percentage of shares?</Label>
                <Input
                  type="number"
                  placeholder="What is your percentage of shares?"
                />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Type Of Property</Label>
                <Input
                  style={{ padding: "6px 10px" }}
                  type="select"
                  bsSize="sm"
                  className="form-select select-custom"
                >
                  <option value="male">Yes</option>
                  <option value="female">No</option>
                </Input>
              </FormGroup>
            </Col>

            <br />
            <h3> Rental Income</h3>
            <br />
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Total Rent Received</Label>
                <Input type="number" placeholder="Total Rent Received" />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>
                  Annual Value (As per City Corporation Holding Tax)
                </Label>
                <Input
                  type="number"
                  placeholder="Annual Value (As per City Corporation Holding Tax)"
                />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Taxable Rent</Label>
                <Input type="number" placeholder="Taxable Rent" />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Advance Rent Received</Label>
                <Input type="number" placeholder="Advance Rent Received" />
              </FormGroup>
            </Col>

            <Col sm="6" md="4">
              <FormGroup>
                <Label>Advance Rent Adjustment</Label>
                <Input type="number" placeholder="Advance Rent Adjustment" />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Vacancy Allowance (Rent Loss Due to Vacancy)</Label>
                <Input
                  type="number"
                  placeholder="Vacancy Allowance (Rent Loss Due to Vacancy)"
                />
              </FormGroup>
            </Col>
            <Col sm="6" md="12">
              <FormGroup>
                <Label>Total Rent Income</Label>
                <Input type="number" placeholder="Total Rent Income" />
              </FormGroup>
            </Col>

            <br />
            <h3> Allowable Deductions</h3>
            <br />

            <Col sm="6" md="4">
              <FormGroup>
                <Label>Repair & Maintenance</Label>
                <Input type="number" placeholder="Repair & Maintenance" />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Municipal/Holding Tax</Label>
                <Input type="number" placeholder="Municipal/Holding Tax" />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Land Tax</Label>
                <Input type="number" placeholder="Land Tax" />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Interest Paid on Housing Loan</Label>
                <Input
                  type="number"
                  placeholder="Interest Paid on Housing Loan"
                />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label>Insurance Premium Paid</Label>
                <Input type="number" placeholder="Insurance Premium Paid" />
              </FormGroup>
            </Col>
            <Col sm="6" md="4">
              <FormGroup>
                <Label> Others (if any)</Label>
                <Input type="number" placeholder=" Others (if any)" />
              </FormGroup>
            </Col>

            <Col sm="6" md="12">
              <FormGroup>
                <Label> Admissible Deductions</Label>
                <Input type="number" placeholder=" Admissible Deductions" />
              </FormGroup>
            </Col>
          </Row>
          <div className="dashed-hr"></div>
          <Row>
            <Col sm="6" md="6">
              <FormGroup>
                <Label>Net Rent Income</Label>
                <Input type="number" placeholder="Net Rent Income" />
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                <Label> Tax Deduction at Source (TDS)</Label>
                <Input
                  type="number"
                  placeholder=" Tax Deduction at Source (TDS)"
                />
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                <Label>Income Belongs to Assessee</Label>
                <Input type="number" placeholder="Income Belongs to Assessee" />
              </FormGroup>
            </Col>
            <Col sm="6" md="6">
              <FormGroup>
                <Label> TDS Belongs to Assessee</Label>
                <Input type="number" placeholder=" TDS Belongs to Assessee" />
              </FormGroup>
            </Col>
          </Row>
        </>
      );
    });
  };

  return (
    <Col xl="9">
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Rental Income"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row className="mb-3"></Row>
            <Row>
              <Col sm="6" md="12">
                <FormGroup>
                  <Label>Do you have any rental income?</Label>
                  <br />
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
            </Row>
            {rentalIncome()}
            <Row>
              <Col>
                <Btn
                  className=""
                  color="primary"
                  type="submit"
                  onClick={() => addMore()}
                >
                  Add More Rental Income
                </Btn>
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

export default RentalIncome;
