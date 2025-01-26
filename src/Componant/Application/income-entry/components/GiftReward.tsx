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
import { patchRequest } from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { signIn } from "../../../../Store/Slices/AuthSlice";
import { Btn } from "../../../../AbstractElements";

const GiftReward = () => {
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

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
    freedom_fighter_details: userInfo?.user_detail?.freedom_fighter_details ?? "",
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
                title={" Gift / Reward"}
                tagClass={"card-title mb-0"}
            />
            <CardBody>
              <Row className="mb-3">
                <Col sm="6" md="12">
                  <FormGroup>
                    <Label>Do you receive any gift/reward?</Label>
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
              </Row>
              <Row>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Name of Person</Label>
                    <Input
                        type="number"
                        placeholder="Name of Person"
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>ETIN No</Label>
                    <Input
                        type="number"
                        placeholder="ETIN No"
                    />
                  </FormGroup>
                </Col>
                {showAdditionalFields && (
                    <>
                      <Col sm="6" md="4">
                        <FormGroup>
                          <Label>Relationship</Label>
                          <Input
                              style={{ padding: "6px 10px" }}
                              type="select"
                              bsSize="sm"
                              className="form-select select-custom"
                          >
                            <option value="wife">Wife</option>
                            <option value="husband">Husband</option>
                            <option value="father">Father</option>
                            <option value="mother">Mother</option>
                            <option value="brother">Brother</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="4">
                        <FormGroup>
                          <Label>Name of Gift</Label>
                          <Input
                              type="number"
                              placeholder="Name of Gift"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="4">
                        <FormGroup>
                          <Label>Type of Gift</Label>
                          <Input
                              style={{ padding: "6px 10px" }}
                              type="select"
                              bsSize="sm"
                              className="form-select select-custom"
                          >
                            <option value="animals">Animals</option>
                            <option value="apparel">Apparel</option>
                            <option value="art_and_crafts">Art and Crafts</option>
                            <option value="baby_gear">Baby Gear</option>
                            <option value="electronics">Electronics</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="4">
                        <FormGroup>
                          <Label>Quantity</Label>
                          <Input
                              type="number"
                              placeholder="Quantity"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="12">
                        <FormGroup>
                          <Label>Value/Amount</Label>
                          <Input
                              type="number"
                              placeholder="Value/Amount"
                          />
                        </FormGroup>
                      </Col>
                    </>
                )}
              </Row>
              {!showAdditionalFields && (
                  <Btn
                      className="pull-right"
                      color="primary"
                      onClick={() => setShowAdditionalFields(true)}
                  >
                    Show More
                  </Btn>
              )}
              {showAdditionalFields && (
                  <>
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
                  </>
              )}
            </CardBody>
            <CardFooter className="text-end"></CardFooter>
          </Card>
        </Form>
      </Col>
  );
};

export default GiftReward;
