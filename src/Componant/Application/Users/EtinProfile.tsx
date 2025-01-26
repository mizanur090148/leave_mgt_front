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
import { Btn } from "../../../AbstractElements";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { patchRequest } from "../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../Store/Slices/AuthSlice";
import { useState } from "react";

const EtinProfile = () => {
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);
  const [saveLoading, setSaveLoading] = useState(false);

  const defaultValues = {
    etin_number: userInfo?.user_detail?.etin_number ?? "",
    circle_id: userInfo?.user_detail?.circle_id ?? "",
    zone_id: userInfo?.user_detail?.zone_id ?? "",
    tax_payer_status: userInfo?.user_detail?.tax_payer_status ?? "",
    residential_status: userInfo?.user_detail?.residential_status ?? "",
    tax_payer_location_id: userInfo?.user_detail?.tax_payer_location_id ?? "",
    old_tin: userInfo?.user_detail?.old_tin ?? "",
    old_circle_id: userInfo?.user_detail?.old_circle_id ?? "",
    old_zone_id: userInfo?.user_detail?.old_zone_id ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EtinProfile>({ defaultValues });

  const etin_number = watch("etin_number");
  const circle_id = watch("circle_id");
  const zone_id = watch("zone_id");
  const tax_payer_status = watch("tax_payer_status");
  const residential_status = watch("residential_status");
  const tax_payer_location_id = watch("tax_payer_location_id");
  const old_tin = watch("old_tin");
  const old_circle_id = watch("old_circle_id");
  const old_zone_id = watch("old_zone_id");

  const onSubmit: SubmitHandler<EtinProfile> = async (inputData) => {
    setSaveLoading(true);
    await patchRequest(`auth/profile-update/${userInfo.id}`, inputData)
      .then((data: any) => {
        setSaveLoading(false);
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
        setSaveLoading(false);
        console.log("from react query error: ", error.message);
      });
  };

  return (
    <Col xl="9">
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
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
                  <Input
                    type="text"
                    placeholder="Enter ETIN number"
                    {...register("etin_number", {
                      required: "ETIN number is required",
                      maxLength: {
                        value: 12,
                        message: "ETIN number cannot exceed 12 digits",
                      },
                      minLength: {
                        value: 12,
                        message: "ETIN number cannot be less 12 digits",
                      },
                    })}
                    value={etin_number}
                    onChange={(e) => {
                      setValue("etin_number", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.etin_number && (
                    <span className="error-msg">
                      {errors?.etin_number?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Circle</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select"
                    {...register("circle_id", {
                      required: "Full name is required",
                    })}
                    value={circle_id}
                    onChange={(e) => {
                      setValue("circle_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="1">Circle 01</option>
                    <option value="2">Circle 02</option>
                    <option value="3">Circle 03</option>
                  </Input>
                  {errors?.circle_id && (
                    <span className="error-msg">
                      {errors?.circle_id?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Zone</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select"
                    {...register("zone_id")}
                    value={zone_id}
                    onChange={(e) => {
                      setValue("zone_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="1">Zone 01</option>
                    <option value="2">Zone 02</option>
                    <option value="3">Zone 03</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Tax Payer Status</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select"
                    {...register("tax_payer_status", {
                      required: "Full name is required",
                      maxLength: {
                        value: 50,
                        message: "Name cannot exceed 50 characters",
                      },
                    })}
                    value={tax_payer_status}
                    onChange={(e) => {
                      setValue("tax_payer_status", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="individual">Individual</option>
                    <option value="firm">Firm</option>
                    <option value="hindu_undivided_family">
                      Hindu Undivided Family
                    </option>
                    <option value="others">Others</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Residenttial Status</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select"
                    {...register("residential_status")}
                    value={residential_status}
                    onChange={(e) => {
                      setValue("residential_status", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="resident">Resident</option>
                    <option value="non-resident">Non-Resident</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Tax Payer Location</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select"
                    {...register("tax_payer_location_id")}
                    value={tax_payer_location_id}
                    onChange={(e) => {
                      setValue("tax_payer_location_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="1">Location 01</option>
                    <option value="2">Location 02</option>
                    <option value="3">Location 03</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Old TIN</Label>
                  <Input
                    type="text"
                    placeholder="Enter old TIN"
                    {...register("old_tin", {
                      maxLength: {
                        value: 12,
                        message: "This cannot exceed 12 characters",
                      },
                    })}
                    value={old_tin}
                    onChange={(e) => {
                      setValue("old_tin", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Circle</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select"
                    {...register("old_circle_id")}
                    value={old_circle_id}
                    onChange={(e) => {
                      setValue("old_circle_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="1">Circle 01</option>
                    <option value="2">Circle 02</option>
                    <option value="3">Circle 03</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Zone</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select"
                    {...register("old_zone_id")}
                    value={old_zone_id}
                    onChange={(e) => {
                      setValue("old_zone_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="1">Zone 01</option>
                    <option value="2">Zone 02</option>
                    <option value="3">Zone 03</option>
                  </Input>
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
              type={saveLoading ? `button` : `submit`}
              onClick={() => handleSubmit(onSubmit)}
            >
              {saveLoading ? "Saving..." : "Save"}
            </Btn>
          </CardBody>
          <CardFooter className="text-end"></CardFooter>
        </Card>
      </Form>
    </Col>
  );
};

export default EtinProfile;
