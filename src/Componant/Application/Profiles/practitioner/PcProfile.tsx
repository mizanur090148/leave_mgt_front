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

const PcProfile = () => {
  const defaultValues = {
    company_logo: "",
    company_name: "",
    phone_no: "",
    email_address: "",
    type_of_practitioner: "",
    license_no: "",
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
  } = useForm<PractitionerProfile>({ defaultValues });

  useEffect(() => {
    //setValue("profile_type", "individual");
  }, [setValue]);



  const onSubmit: SubmitHandler<PractitionerProfile> = (inputData) => {
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
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Practitioner Profile"}
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
              </div>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Practitioner Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter full name"
                    className={`${errors?.company_name ? "is-invalid" : ""}`}
                    {...register("company_name", {
                      required: "Full name is required",
                      maxLength: {
                        value: 50,
                        message: "Name cannot exceed 50 characters",
                      },
                    })}
                    onChange={(e) => {
                      setValue("company_name", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.company_name && (
                    <span className="error-msg">
                      {errors?.company_name?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Phone No</Label>
                  <Input
                      type="text"
                      placeholder="Enter phone no"
                      className={`${errors?.phone_no ? "is-invalid" : ""}`}
                      {...register("phone_no", {
                        required: "Phone No is required",
                        maxLength: {
                          value: 50,
                          message: "Name cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("phone_no", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.phone_no && (
                      <span className="error-msg">
                      {errors?.phone_no?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input
                      type="text"
                      placeholder="Enter email address"
                      className={`${errors?.email_address ? "is-invalid" : ""}`}
                      {...register("email_address", {
                        required: "Phone No is required",
                        maxLength: {
                          value: 50,
                          message: "Name cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("email_address", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.email_address && (
                      <span className="error-msg">
                      {errors?.email_address?.message}
                    </span>
                  )}

                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Type Of Practitioner</Label>
                  <Input type="select" bsSize="sm" className="form-select">
                    <option value="sole_proprietorships">Sole proprietorships</option>
                    <option value="limited_liability_companies">Limited-liability companies (LLCs)</option>
                    <option value="general_partnership">General partnership (GP)</option>
                    <option value="limited_partnerships">Limited partnerships (LP)</option>
                    <option value="limited_liability_partnership">Limited liability partnership (LLP)</option>
                    <option value="c_corporation">C corporation (C corp)</option>
                    <option value="s_corporation">S corporation (S corp)</option>
                    <option value="close_corporation">Close corporation (CC) </option>
                    <option value="public_benefit_corporation">Public benefit corporation (PBC)</option>
                    <option value="nonprofit_corporation">Nonprofit corporation</option>
                    <option value="cooperative">Cooperative </option>
                    <option value="joint_ventures ">Joint ventures </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>License No</Label>
                  <Input
                      type="text"
                      placeholder="Enter License no"
                      className={`${errors?.license_no ? "is-invalid" : ""}`}
                      {...register("license_no", {
                        required: "License No is required",
                        maxLength: {
                          value: 50,
                          message: "License no cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("license_no", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.license_no && (
                      <span className="error-msg">
                      {errors?.license_no?.message}
                    </span>
                  )}

                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Trade License No</Label>
                  <Input
                      type="text"
                      placeholder="Enter trade license no"
                      className={`${errors?.trade_license_no ? "is-invalid" : ""}`}
                      {...register("trade_license_no", {
                        required: "trade license is required",
                        maxLength: {
                          value: 50,
                          message: "trade license no cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("trade_license_no", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.trade_license_no && (
                      <span className="error-msg">
                      {errors?.trade_license_no?.message}
                    </span>
                  )}

                </FormGroup>
              </Col>
              <Col sm="6" md="5">
                <FormGroup>
                  <Label>ETIN No</Label>
                  <Input
                      type="text"
                      placeholder="Enter etin"
                      className={`${errors?.etin_no ? "is-invalid" : ""}`}
                      {...register("etin_no", {
                        required: "etin is required",
                        maxLength: {
                          value: 50,
                          message: "etin  cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("etin_no", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.etin_no && (
                      <span className="error-msg">
                      {errors?.etin_no?.message}
                    </span>
                  )}

                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>BIN No</Label>
                  <Input
                      type="text"
                      placeholder="Enter bin"
                      className={`${errors?.bin_no ? "is-invalid" : ""}`}
                      {...register("bin_no", {
                        required: "bin is required",
                        maxLength: {
                          value: 50,
                          message: "bin  cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("bin_no", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.bin_no && (
                      <span className="error-msg">
                      {errors?.bin_no?.message}
                    </span>
                  )}

                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>Address (Home/Street/Block details):</Label>
                  <Input
                      type="text"
                      placeholder="Enter office address"
                      className={`${errors?.office_address ? "is-invalid" : ""}`}
                      {...register("office_address", {
                        required: "office address is required",
                        maxLength: {
                          value: 100,
                          message: "office address cannot exceed 100 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("office_address", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.office_address && (
                      <span className="error-msg">
                      {errors?.office_address?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>City</Label>
                  <Input
                      type="text"
                      placeholder="Enter office city"
                      className={`${errors?.office_city ? "is-invalid" : ""}`}
                      {...register("office_city", {
                        required: "office city is required",
                        maxLength: {
                          value: 50,
                          message: "office city cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("office_city", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.office_city && (
                      <span className="error-msg">
                      {errors?.office_city?.message}
                    </span>
                  )}

                </FormGroup>
              </Col>

              <Col sm="6" md="4">
                <FormGroup>
                  <Label>PostCode</Label>
                  <Input
                      type="text"
                      placeholder="Enter office city"
                      className={`${errors?.office_post_code ? "is-invalid" : ""}`}
                      {...register("office_post_code", {
                        required: "post code is required",
                        maxLength: {
                          value: 50,
                          message: "post code cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("office_post_code", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.office_post_code && (
                      <span className="error-msg">
                      {errors?.office_post_code?.message}
                    </span>
                  )}

                </FormGroup>
              </Col>

              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Country</Label>
                  <Input
                      type="text"
                      placeholder="Enter country"
                      className={`${errors?.office_country ? "is-invalid" : ""}`}
                      {...register("office_country", {
                        required: "country is required",
                        maxLength: {
                          value: 50,
                          message: "country cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("office_country", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                  />
                  {errors?.office_country && (
                      <span className="error-msg">
                      {errors?.office_country?.message}
                    </span>
                  )}

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

export default PcProfile;
