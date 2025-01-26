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
import { patchRequest, postRequest } from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../../Store/Slices/AuthSlice";

const CompanyProfile = () => {
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);

  const defaultValues = {
    //company_logo: userInfo?.user_detail?.full_name ?? "",
    company_name: userInfo?.user_detail?.company_name ?? "",
    phone_no: userInfo?.user_detail?.phone_no ?? "",
    email: userInfo?.user_detail?.email ?? "",
    type_of_business: userInfo?.user_detail?.type_of_business ?? "",
    incorporation_no: userInfo?.user_detail?.incorporation_no ?? "",
    trade_license_no: userInfo?.user_detail?.trade_license_no ?? "",
    etin_number: userInfo?.user_detail?.etin_number ?? "",
    bin: userInfo?.user_detail?.bin ?? "",
    office_address: userInfo?.user_detail?.office_address ?? "",
    office_city: userInfo?.user_detail?.office_city ?? "",
    office_post_code: userInfo?.user_detail?.office_post_code ?? "",
    office_country: userInfo?.user_detail?.office_country ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CompanyProfile>({ defaultValues });

  const company_logo = watch("company_logo");
  const company_name = watch("company_name");
  const phone_no = watch("phone_no");
  const email = watch("email");
  const type_of_business = watch("type_of_business");
  const incorporation_no = watch("incorporation_no");
  const trade_license_no = watch("trade_license_no");
  const etin_number = watch("etin_number");
  const bin = watch("bin");
  const office_address = watch("office_address");
  const office_city = watch("office_city");
  const office_post_code = watch("office_post_code");
  const office_country = watch("office_country");

  useEffect(() => {
    //setValue("profile_type", "individual");
  }, [setValue]);

  const onSubmit: SubmitHandler<CompanyProfile> = (inputData) => {
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
            title={"Company Profile"}
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
                    <span className="mb-1 d-block" style={{ fontSize: "11px" }}>
                      {"Allowed JPG, GIF or PNG. Max size of 800K"}
                    </span>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Company Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter company name"
                    className={`${errors?.company_name ? "is-invalid" : ""}`}
                    {...register("company_name", {
                      required: "Company name is required",
                      maxLength: {
                        value: 100,
                        message: "Company cannot exceed 100 characters",
                      },
                    })}
                    value={company_name}
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
                        message: "Phone cannot exceed 50 characters",
                      },
                    })}
                    value={phone_no}
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
                    className={`${errors?.email ? "is-invalid" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      maxLength: {
                        value: 50,
                        message: "Email cannot exceed 50 characters",
                      },
                    })}
                    value={email}
                    onChange={(e) => {
                      setValue("email", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.email && (
                    <span className="error-msg">{errors?.email?.message}</span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Type Of Business</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select select-custom"
                    value={type_of_business}
                    {...register("type_of_business")}
                    onChange={(e) => {
                      setValue("type_of_business", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="sole_proprietorships">
                      Sole proprietorships
                    </option>
                    <option value="limited_liability_companies">
                      Limited-liability companies (LLCs)
                    </option>
                    <option value="general_partnership">
                      General partnership (GP)
                    </option>
                    <option value="limited_partnerships">
                      Limited partnerships (LP)
                    </option>
                    <option value="limited_liability_partnership">
                      Limited liability partnership (LLP)
                    </option>
                    <option value="c_corporation">
                      C corporation (C corp)
                    </option>
                    <option value="s_corporation">
                      S corporation (S corp)
                    </option>
                    <option value="close_corporation">
                      Close corporation (CC){" "}
                    </option>
                    <option value="public_benefit_corporation">
                      Public benefit corporation (PBC)
                    </option>
                    <option value="nonprofit_corporation">
                      Nonprofit corporation
                    </option>
                    <option value="cooperative">Cooperative </option>
                    <option value="joint_ventures ">Joint ventures </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Incorporation No</Label>
                  <Input
                    type="text"
                    placeholder="Enter incorporation no"
                    className={`${
                      errors?.incorporation_no ? "is-invalid" : ""
                    }`}
                    {...register("incorporation_no", {
                      required: "Incorporation no is required",
                      maxLength: {
                        value: 100,
                        message:
                          "Incorporation no cannot exceed 100 characters",
                      },
                    })}
                    value={incorporation_no}
                    onChange={(e) => {
                      setValue("incorporation_no", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.incorporation_no && (
                    <span className="error-msg">
                      {errors?.incorporation_no?.message}
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
                    className={`${
                      errors?.trade_license_no ? "is-invalid" : ""
                    }`}
                    {...register("trade_license_no", {
                      required: "Trade license is required",
                      maxLength: {
                        value: 50,
                        message: "This cannot exceed 50 characters",
                      },
                    })}
                    value={trade_license_no}
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
                    className={`${errors?.etin_number ? "is-invalid" : ""}`}
                    {...register("etin_number", {
                      required: "etin is required",
                      maxLength: {
                        value: 50,
                        message: "etin  cannot exceed 50 characters",
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
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>BIN No</Label>
                  <Input
                    type="text"
                    placeholder="Enter bin"
                    className={`${errors?.bin ? "is-invalid" : ""}`}
                    {...register("bin", {
                      required: "bin is required",
                      maxLength: {
                        value: 50,
                        message: "bin  cannot exceed 50 characters",
                      },
                    })}
                    value={bin}
                    onChange={(e) => {
                      setValue("bin", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.bin && (
                    <span className="error-msg">{errors?.bin?.message}</span>
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
                    value={office_address}
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
                    value={office_city}
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
                    className={`${
                      errors?.office_post_code ? "is-invalid" : ""
                    }`}
                    {...register("office_post_code", {
                      required: "post code is required",
                      maxLength: {
                        value: 50,
                        message: "post code cannot exceed 50 characters",
                      },
                    })}
                    value={office_post_code}
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
                    type="select"
                    bsSize="sm"
                    className="form-select select-custom"
                    {...register("office_country")}
                    value={office_country}
                    onChange={(e) => {
                      setValue("office_country", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="1">Bangladsesh</option>
                    <option value="2">India</option>
                    <option value="3">Pakistan</option>
                    <option value="4">Maldives</option>
                    <option value="5">Bhutan</option>
                  </Input>
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

export default CompanyProfile;
