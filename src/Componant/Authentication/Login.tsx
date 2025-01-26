import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H3, H4, Image, P } from "../../AbstractElements";
//import { dynamicImage } from "../../Service";
import {
  CreateAccount,
  DoNotAccount,
  EmailAddress,
  ForgotPassword,
  Href,
  Password,
  RememberPassword,
} from "../../utils/Constant";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postRequest } from "../../utils/axiosRequests";
import { signIn } from "../../Store/Slices/AuthSlice";
import { dynamicImage } from "../../Service";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (inputData) => {
    await postRequest("auth/login", inputData)
      .then((data: any) => {
        sessionStorage.setItem(
          "token",
          JSON.stringify(data?.data?.access_token?.token)
        );
        sessionStorage.setItem(
            "assessmentYear",
            JSON.stringify(data?.data?.assessmentYear)
        );
        dispatch(signIn(data?.data?.user));
        navigate("/dashboard");
      })
      .catch((error) => {
        setError(error.message);
        toast.error("Please Enter valid email or password...!");
      });
  };
  return (
    <Container fluid className="p-0 login-container">
      <Row className="m-0">
        <Col xs="7" className="p-0">
          <div className="left-part">
            <Image
              className="img-fluid for-light easytax-logo"
              src={dynamicImage("logo/logoLogin.png")}
              alt="looginpage"
            />
            <div className="title">
              <div className="sub-title">
                Your Pathway to Financial Independence
              </div>
              <Image
                className="img-fluid for-light learn-more-img"
                src={dynamicImage("logo/learnMore.png")}
                alt="looginpage"
              />
            </div>
            <div className="important-link">
              <div className="title">Important Link</div>
              <div className="icon-area">
                <Image
                  className="for-light"
                  src={dynamicImage("logo/1.png")}
                  alt="looginpage"
                />
                <Image
                  className="for-light"
                  src={dynamicImage("logo/2.png")}
                  alt="looginpage"
                />
                <Image
                  className="for-light"
                  src={dynamicImage("logo/3.png")}
                  alt="looginpage"
                />
                <Image
                  className="for-light"
                  src={dynamicImage("logo/4.png")}
                  alt="looginpage"
                />
                <Image
                  className="for-light"
                  src={dynamicImage("logo/5.png")}
                  alt="looginpage"
                />
                <Image
                  className="for-light"
                  src={dynamicImage("logo/6.png")}
                  alt="looginpage"
                />
                <Image
                  className="for-light"
                  src={dynamicImage("logo/7.png")}
                  alt="looginpage"
                />
                <Image
                  className="for-light"
                  src={dynamicImage("logo/8.png")}
                  alt="looginpage"
                />
                <Image
                  className="for-light"
                  src={dynamicImage("logo/9.png")}
                  alt="looginpage"
                />
              </div>
            </div>
          </div>
        </Col>
        <Col xs="5" className="p-0">
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
              <div className="login-main">
                <div className="logo-image-parent">
                  <Image
                    className="img-fluid for-light easytax-logo"
                    src={dynamicImage("logo/logoTax.png")}
                    alt="looginpage"
                  />
                </div>
                <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <H3 className="fw-bold text-center">Sign In</H3>
                  {error && (
                    <div className="text-danger text-center">{error}</div>
                  )}
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      bsSize="sm"
                      type="email"
                      required
                      placeholder="Enter username"
                      className={`${errors?.email ? "is-invalid" : ""}`}
                      {...register("email", {
                        required: "Username is required",
                        maxLength: {
                          value: 50,
                          message: "Username cannot exceed 50 characters",
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
                  <FormGroup className="password-field">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="form-input position-relative">
                      <Input
                        bsSize="sm"
                        type={show ? "text" : "password"}
                        placeholder="*********"
                        className={`${errors?.password ? "is-invalid" : ""}`}
                        {...register("password", {
                          required: "Password is required",
                          maxLength: {
                            value: 30,
                            message: "Password cannot exceed 30 characters",
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
                  <FormGroup className="forgot-pass-field">
                    <Link
                      to={`${process.env.PUBLIC_URL}/authentication/forget_password`}
                    >
                      {ForgotPassword}
                    </Link>
                  </FormGroup>
                  <FormGroup className="mb-0">
                    <div className="text-end mt-3">
                      <Btn
                        color="secondary"
                        size="lg"
                        block
                        className="w-100"
                        type="submit"
                        onClick={() => handleSubmit(onSubmit)}
                      >
                        Sign In
                      </Btn>
                    </div>
                  </FormGroup>
                  <div className="divider-container">
                    <span className="divider">or</span>
                  </div>
                  <P className="mt-4 mb-0 text-center">
                    New to EasyTax?
                    <Link
                      className="ms-2"
                      to={`${process.env.PUBLIC_URL}/signup`}
                    >
                      Sign up
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

export default Login;
