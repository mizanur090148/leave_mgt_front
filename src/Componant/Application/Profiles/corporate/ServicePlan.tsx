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
import { Btn, Image } from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signIn } from "../../../../Store/Slices/AuthSlice";
import { patchRequest } from "../../../../utils/axiosRequests";

const ServicePlan = () => {
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);

  const defaultValues = {
    no_of_employee: userInfo?.user_detail?.no_of_employee ?? "",
    discount_coupon: userInfo?.user_detail?.discount_coupon ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServicePlan>({ defaultValues });

  const no_of_employee = watch("no_of_employee");
  const discount_coupon = watch("discount_coupon");

  //const totalCost = no_of_employee - discount_coupon;

  const onSubmit: SubmitHandler<ServicePlan> = (inputData) => {
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
                  <p>
                    {" "}
                    Recommended for individuals with complex tax scenarios{" "}
                  </p>
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
                  <button>Choose Plan</button>
                </div>
                <div className="plan">
                  <h2>Premium</h2>
                  <p>
                    {" "}
                    Best suited for individuals seeking personalized tax
                    planning advice{" "}
                  </p>
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
                  <button>Upgrade</button>
                </div>
              </div>
            </Row>
            <Row className="mt-3">
              <Col md="6">
                <FormGroup>
                  <Label>No. Of Employee</Label>
                  <Input
                    type="text"
                    placeholder="No. Of Employee"
                    className={`${errors?.no_of_employee ? "is-invalid" : ""}`}
                    {...register("no_of_employee", {
                      maxLength: {
                        value: 20,
                        message: "no_of_employee cannot exceed 20 characters",
                      },
                    })}
                    defaultValue={no_of_employee}
                    onChange={(e) => {
                      setValue("no_of_employee", parseInt(e.target.value), {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.no_of_employee && (
                    <span className="error-msg">
                      {errors?.no_of_employee?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Discount Coupon</Label>
                  <Input
                    type="number"
                    placeholder="Discount Coupon"
                    className={`${errors?.discount_coupon ? "is-invalid" : ""}`}
                    {...register("discount_coupon", {
                      maxLength: {
                        value: 20,
                        message: "discount_coupon cannot exceed 20 characters",
                      },
                    })}
                    defaultValue={discount_coupon}
                    onChange={(e) => {
                      setValue("discount_coupon", parseInt(e.target.value), {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.discount_coupon && (
                    <span className="error-msg">
                      {errors?.discount_coupon?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>Total Cost</Label>
                  <Input type="text" placeholder="total cost" />
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
