import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import { Btn, H3, H4, H6, Image, P } from "../../AbstractElements";
//import { dynamicImage } from "../../Service";
import {
  CreateAccount,
  DoNotAccount,
  EmailAddress,
  ForgotPassword,
  Href,
  MasterCard,
  Password,
  Paypal,
  RememberPassword,
  Visa,
} from "../../utils/Constant";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postRequest } from "../../utils/axiosRequests";
import { signIn } from "../../Store/Slices/AuthSlice";
import { dynamicImage } from "../../Service";
import { useForm, SubmitHandler } from "react-hook-form";
import TopRightToast from "../BonusUi/Toast/LiveToast/TopRightToast/TopRightToast";
import ToastCustom from "../BonusUi/Toast/LiveToast/TopToast/ToastCustom";

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [error, setError] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValues = {
    full_name: "",
    mobile: "",
    gender: "male",
    profile_type: "individual",
    dob: "",
    email: "",
    password: "",
    confirmed: "",
    termAndService: false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Registration>({ defaultValues });

  console.log(errors, "errors errors");

  const password = watch("password");
  const profileType = watch("profile_type");
  const termAndService = watch("termAndService");

  useEffect(() => {
    setValue("profile_type", "individual");
  }, [setValue]);

  const onSubmit: SubmitHandler<Registration> = (inputData) => {
    const actionType = postRequest("auth/register", inputData);
    actionType
      .then((data: any) => {
        setMessage("Registration Successfully Done");
        setOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch((error) => {
        console.log("from react query error: ", error.message);
      });
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        {open && message && (
          <ToastCustom message={message} open={open} setOpen={setOpen} />
        )}
        <Col xs="12" className="p-0">
          <div className="login-card login-dark">
            <div>
              {/* <div>
                <Link className="logo text-center" to={Href}>
                  <Image
                    className="img-fluid for-light"
                    src={dynamicImage("logo/logo.png")}
                    alt="looginpage"
                  />
                  <Image
                    className="img-fluid for-dark"
                    src={dynamicImage("logo/logo_dark.png")}
                    alt="looginpage"
                  />
                </Link>
              </div> */}
              <div className="login-main" style={{ padding: "20px 40px" }}>
                <div className="logo-image-parent">
                  <Image
                    className="img-fluid for-light easytax-logo"
                    src={dynamicImage("logo/logoTax.png")}
                    alt="looginpage"
                  />
                </div>
                <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <H3 className="fw-bold text-center">Sign up</H3>
                  {error && (
                    <div className="text-danger text-center">{error}</div>
                  )}
                  <FormGroup className="form-group">
                    <Label className="col-form-label">Full Name</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      placeholder="Enter full name"
                      className={`${errors?.full_name ? "is-invalid" : ""}`}
                      {...register("full_name", {
                        required: "Full name is required",
                        maxLength: {
                          value: 50,
                          message: "Full name cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("full_name", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {errors?.full_name && (
                      <span className="error-msg">
                        {errors?.full_name?.message}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      bsSize="sm"
                      type="email"
                      className={`${errors?.email ? "is-invalid" : ""}`}
                      placeholder="Enter email"
                      {...register("email", {
                        required: "Email is required",
                        maxLength: {
                          value: 50,
                          message: "Email cannot exceed 50 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("email", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {errors?.email && (
                      <span className="error-msg">
                        {errors?.email?.message}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Label className="col-form-label">Mobile No.</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      className={`${errors?.mobile ? "is-invalid" : ""}`}
                      placeholder="Enter mobile no."
                      {...register("mobile", {
                        required: "Mobile no is required",
                        maxLength: {
                          value: 20,
                          message: "Mobile cannot exceed 20 characters",
                        },
                      })}
                      onChange={(e) => {
                        setValue("mobile", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {errors?.mobile && (
                      <span className="error-msg">
                        {errors?.mobile?.message}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup className="password-field">
                    <Label className="col-form-label">Password</Label>
                    <div className="form-input position-relative">
                      <Input
                        bsSize="sm"
                        type={show ? "text" : "password"}
                        //className={`${errors?.password ? "is-invalid" : ""}`}
                        placeholder="********"
                        {...register("password", {
                          required: "Password is required",
                          maxLength: {
                            value: 20,
                            message: "Password cannot exceed 20",
                          },
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long",
                          },
                        })}
                        onChange={(e) => {
                          setValue("password", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      {errors?.password && (
                        <span className="error-msg">
                          {errors?.password?.message}
                        </span>
                      )}
                      <div className="show-hide" onClick={() => setShow(!show)}>
                        <span className="show"> </span>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="password-field">
                    <Label className="col-form-label">Retype Password</Label>
                    <div className="form-input position-relative">
                      <Input
                        bsSize="sm"
                        type={showConfirmed ? "text" : "password"}
                        placeholder="********"
                        //className={`${errors?.confirmed ? "is-invalid" : ""}`}
                        {...register("confirmed", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        onChange={(e) => {
                          setValue("confirmed", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      {errors.confirmed && (
                        <span className="error-msg">
                          {errors.confirmed.message}
                        </span>
                      )}
                      <div
                        className="show-hide"
                        onClick={() => setShowConfirmed(!showConfirmed)}
                      >
                        <span className="show"> </span>
                      </div>
                    </div>
                  </FormGroup>
                  <Row>
                    <Col md="6">
                      <FormGroup className="password-field">
                        <Label className="col-form-label">Date Of Birth</Label>
                        <div className="form-input position-relative">
                          <Input
                            bsSize="sm"
                            type="date"
                            placeholder="Enter date of birth"
                            {...register("dob", {
                              required: "Date of birth is required",
                            })}
                            onChange={(e) => {
                              setValue("dob", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                          />
                          {errors?.dob && (
                            <span className="error-msg">
                              {errors?.dob?.message}
                            </span>
                          )}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <Label className="col-form-label">Gender</Label>
                      <Input
                        type="select"
                        id="type"
                        bsSize="sm"
                        {...register("gender", {
                          required: "Gender is required",
                        })}
                        onChange={(e) => {
                          setValue("gender", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        style={{ padding: "7px 10px" }}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Input>
                      {errors?.gender && (
                        <span className="error-msg">
                          {errors?.gender?.message}
                        </span>
                      )}
                    </Col>
                  </Row>
                  <Col xs="12" className="profile-type">
                    {/* <div
                      style={{ paddingTop: "1px", paddingBottom: "10px" }}
                      className="card-wrapper test-checkbox border rounded-3 checkbox-checked"
                    > */}
                    <Label className="col-form-label">Profile Type</Label>
                    <div className="card-wrapper border rounded-3 checkbox-checked">
                      <div className="radio-form">
                        <FormGroup check>
                          <Input
                            type="radio"
                            id="flexRadioDefault1"
                            value="individual"
                            {...register("profile_type", {
                              required: "Profile type is required",
                            })}
                            checked={profileType === "individual"}
                            onChange={(e) => {
                              setValue("profile_type", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                          />
                          <Label
                            className="form-check-label"
                            for={`flexRadioDefault1`}
                            check
                          >
                            Individual
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input
                            type="radio"
                            id="flexRadioDefault2"
                            value="corporate"
                            {...register("profile_type")}
                            checked={profileType === "corporate"}
                            onChange={(e) => {
                              setValue("profile_type", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                          />
                          <Label for="flexRadioDefault2" check>
                            Corporate
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input
                            type="radio"
                            id="flexRadioDefault3"
                            value="practitioner"
                            {...register("profile_type")}
                            checked={profileType === "practitioner"}
                            onChange={(e) => {
                              setValue("profile_type", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                          />
                          <Label for="flexRadioDefault3" check>
                            Practitioner
                          </Label>
                        </FormGroup>
                        {errors.profile_type && (
                          <span className="error-msg">
                            {errors.profile_type.message}
                          </span>
                        )}
                      </div>
                      {/* </div> */}
                    </div>
                  </Col>
                  {/* <Col>
                    <FormGroup className="privacy-policy">
                      <div className="checkbox p-0">
                        <Input
                          id="checkbox1"
                          type="checkbox"
                          checked={true}
                        />
                        <Label htmlFor="checkbox1">
                          By selecting Continue, you agree to our <br />
                          Terms of Service and acknowledge our Privacy Policy
                        </Label>
                      </div>
                    </FormGroup>
                  </Col> */}
                  <Col xs="12">
                    <FormGroup className="privacy-policy mt-3" check>
                      <div className="checkbox-checked">
                        <Input
                          id={"termAndService"}
                          type="checkbox"
                          checked={termAndService}
                          {...register("termAndService", {
                            required:
                              "You must agree to the terms and services",
                            validate: (value) =>
                              value ||
                              "You must agree to the terms and services",
                          })}
                          onChange={(e) => {
                            setValue("termAndService", e.target.checked, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <Label for={"termAndService"} check className="mb-0">
                          By selecting Continue, you agree to our Terms of
                          Service and acknowledge our Privacy Policy
                        </Label>
                        {errors.termAndService && (
                          <span className="error-msg">
                            {errors.termAndService.message}
                          </span>
                        )}
                      </div>
                    </FormGroup>
                  </Col>
                  <FormGroup className="mb-0">
                    <div className="text-end mt-3">
                      <Btn
                        color="secondary"
                        size="lg"
                        block
                        type="submit"
                        className="w-100"
                        onClick={() => handleSubmit(onSubmit)}
                      >
                        Sign Up
                      </Btn>
                    </div>
                  </FormGroup>
                  <div className="divider-container">
                    <span className="divider">or</span>
                  </div>
                  <P className="mt-4 mb-0 text-center">
                    Already have an account?
                    <Link
                      className="ms-2"
                      to={`${process.env.PUBLIC_URL}/login`}
                    >
                      Sign in
                    </Link>
                  </P>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
