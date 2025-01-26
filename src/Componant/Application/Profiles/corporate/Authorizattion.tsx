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
import { Btn } from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { dynamicImage } from "../../../../Service";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { patchRequest, postRequest } from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../../Store/Slices/AuthSlice";

const Authorizattion = () => {
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);

  const defaultValues = {
    authorization_name: userInfo?.user_detail?.authorization_name ?? "",
    authorization_designation:
      userInfo?.user_detail?.authorization_designation ?? "",
    authorization_phone_no: userInfo?.user_detail?.authorization_phone_no ?? "",
    authorization_email: userInfo?.user_detail?.authorization_email ?? "",
    authorization_authority:
      userInfo?.user_detail?.authorization_authority ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({ defaultValues });

  const authorization_name = watch("authorization_name");
  const authorization_phone_no = watch("authorization_phone_no");
  const authorization_designation = watch("authorization_designation");
  const authorization_email = watch("authorization_email");
  const authorization_authority = watch("authorization_authority");

  useEffect(() => {
    //setValue("profile_type", "individual");
  }, [setValue]);

  const onSubmit: SubmitHandler<any> = (inputData) => {
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
            title={"Authorization"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            {/* <Row>
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
                <div style={{ display: "flex", alignItems: "center" }}>
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
            </Row>*/}
            <Row>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Person Name</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter Person Name"
                    className={`${
                      errors?.authorization_name ? "is-invalid" : ""
                    }`}
                    {...register("authorization_name", {
                      maxLength: {
                        value: 50,
                        message: "post code cannot exceed 50 characters",
                      },
                    })}
                    value={authorization_name}
                    onChange={(e) => {
                      setValue("authorization_name", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Designation </Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter Designation"
                    className={`${
                      errors?.authorization_designation ? "is-invalid" : ""
                    }`}
                    {...register("authorization_designation", {
                      maxLength: {
                        value: 50,
                        message: "post code cannot exceed 50 characters",
                      },
                    })}
                    value={authorization_designation}
                    onChange={(e) => {
                      setValue("authorization_designation", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Phone No</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter Phone No"
                    className={`${
                      errors?.authorization_phone_no ? "is-invalid" : ""
                    }`}
                    {...register("authorization_phone_no", {
                      maxLength: {
                        value: 30,
                        message: "post code cannot exceed 30 characters",
                      },
                    })}
                    value={authorization_phone_no}
                    onChange={(e) => {
                      setValue("authorization_phone_no", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter emain"
                    className={`${
                      errors?.authorization_email ? "is-invalid" : ""
                    }`}
                    {...register("authorization_email", {
                      required: "post code is required",
                      maxLength: {
                        value: 50,
                        message: "post code cannot exceed 50 characters",
                      },
                    })}
                    value={authorization_email}
                    onChange={(e) => {
                      setValue("authorization_email", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Authority</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className={`form-select select-custom ${
                      errors?.authorization_authority ? "is-invalid" : ""
                    }`}
                    {...register("authorization_authority", {
                      required: "post code is required",
                      maxLength: {
                        value: 50,
                        message: "post code cannot exceed 50 characters",
                      },
                    })}
                    value={authorization_authority}
                    onChange={(e) => {
                      setValue("authorization_authority", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="authority1">Authority 1</option>
                    <option value="authority2">Authority 2</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Authorization Letter</Label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* <Image
                        className="img-70 rounded-circle"
                        alt="edit-user"
                        src={dynamicImage("user/7.jpg")}
                    />*/}
                    <div style={{ marginLeft: "15px" }}>
                      <Btn size="sm" color="primary" type="submit">
                        Upload File / Photo
                      </Btn>
                      <span className="mb-1" style={{ fontSize: "11px" }}>
                        {"Allowed JPG, File, GIF or PNG. Max size of 800K"}
                      </span>
                    </div>
                  </div>
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

export default Authorizattion;
