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
import { Btn, Image, P } from "../../../AbstractElements";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { dynamicImage } from "../../../Service";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { patchRequest, postRequest } from "../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { signIn } from "../../../Store/Slices/AuthSlice";
import ToastCustom from "../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";

const PersonalProfile = () => {
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState("");
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
  } = useForm<PersonalProfile>({ defaultValues });

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

  let formData = new FormData();
  const onSubmit: SubmitHandler<PersonalProfile> = async (inputData) => {
    console.log(inputData, "inputData");
    //formData.append("disabilities", disabilities);
    formData.append("full_name", inputData.full_name);
    formData.append("dob", inputData.dob);
    //formData.append("freedom_fighter", inputData.freedom_fighter);
    formData.append("gender", inputData.gender);
    formData.append("nid", inputData.nid);
    formData.append("passport_no", inputData.passport_no);
    formData.append("disability_details", inputData.disability_details);
    formData.append(
      "freedom_fighter_details",
      inputData.freedom_fighter_details
    );
    formData.append("picture", picture);
    console.log("formData", formData);

    setSaveLoading(true);
    await patchRequest(`auth/profile-update/${userInfo.id}`, inputData)
      .then((data: any) => {
        const updatedUserInfo = {
          ...userInfo,
          user_detail: {
            ...userInfo.user_detail,
            ...data?.data,
          },
        };
        dispatch(signIn(updatedUserInfo));
        // toast.success("Successfully updated", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
        setSaveLoading(false);
        setMessage("Successfully Updated");
        setOpen(true);
      })
      .catch((error) => {
        setSaveLoading(false);
        console.log("from react query error: ", error.message);
      });
  };

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture(e.target.files[0]);
    }
  };

  return (
    <Col xl="9">
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Personal Profile"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row className="mb-3">
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
                  <div style={{ marginLeft: "15px", width: "65%" }}>
                    {/* <Btn size="sm" color="primary" type="button">
                      Upload Photo
                    </Btn> */}
                    <Input
                      type="file"
                      name="signature"
                      accept="image/*"
                      onChange={(e) => imageChange(e)}
                    />
                    <span className="mb-1 d-block" style={{ fontSize: "11px" }}>
                      {"Allowed JPG, GIF or PNG. Max size of 800K"}
                    </span>
                  </div>
                </div>
                <div></div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    className="img-70 rounded-circle"
                    alt="edit-user"
                    src={dynamicImage("user/7.jpg")}
                  />
                  <div style={{ marginLeft: "15px" }}>
                    <Btn size="sm" color="primary" type="button">
                      Upload Signature
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
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter full name"
                    className={`${errors?.full_name ? "is-invalid" : ""}`}
                    {...register("full_name", {
                      required: "Full name is required",
                      maxLength: {
                        value: 50,
                        message: "Name cannot exceed 50 characters",
                      },
                    })}
                    value={full_name}
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
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Gender</Label>
                  <Input
                    style={{ padding: "6px 10px" }}
                    type="select"
                    bsSize="sm"
                    className="form-select select-custom"
                    defaultValue={gender}
                    value={gender}
                    {...register("gender")}
                    onChange={(e) => {
                      setValue("gender", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="third">Third Gender</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Date of Birth</Label>
                  <Input
                    bsSize="sm"
                    type="date"
                    placeholder="Enter date of birth"
                    className={`${errors?.dob ? "is-invalid" : ""}`}
                    {...register("dob", {
                      required: "Date of birth is required",
                    })}
                    dateFormat="dd-MM-yyyy"
                    defaultValue={dob}
                    onChange={(e) => {
                      setValue("dob", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.dob && (
                    <span className="error-msg">{errors?.dob?.message}</span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Age</Label>
                  <Input
                    readOnly
                    type="text"
                    placeholder="Enter age"
                    value={age && age > 0 ? age : ""}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>NID</Label>
                  <Input
                    type="text"
                    placeholder="Enter NID"
                    className={`${errors?.nid ? "is-invalid" : ""}`}
                    {...register("nid", {
                      required: "NID is required",
                      maxLength: {
                        value: 20,
                        message: "NID cannot exceed 20 characters",
                      },
                    })}
                    defaultValue={nid}
                    onChange={(e) => {
                      setValue("nid", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.nid && (
                    <span className="error-msg">{errors?.nid?.message}</span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Passport No</Label>
                  <Input
                    type="text"
                    placeholder="Enter passport no"
                    className={`${errors?.passport_no ? "is-invalid" : ""}`}
                    {...register("passport_no")}
                    defaultValue={passport_no}
                    onChange={(e) => {
                      setValue("passport_no", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.passport_no && (
                    <span className="error-msg">
                      {errors?.passport_no?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label className="d-block" check htmlFor="disabilities-no">
                    Do you have any disabilities?
                  </Label>
                  <Input
                    className="radio_animated"
                    id="disabilities-no"
                    type="radio"
                    value="false"
                    {...register("disabilities")}
                    checked={disabilities === false}
                    onChange={() =>
                      setValue("disabilities", false, { shouldValidate: true })
                    }
                  />
                  <span className="radio-right-space">No</span>
                  <Input
                    className="radio_animated pl-5"
                    id="disabilities-yes"
                    type="radio"
                    value="true"
                    {...register("disabilities")}
                    checked={disabilities === true}
                    onChange={() =>
                      setValue("disabilities", true, { shouldValidate: true })
                    }
                  />
                  <span>Yes</span>
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label className="d-block" check htmlFor="freedom-no">
                    Are you a gazetted freedom fighter?
                  </Label>
                  <Input
                    className="radio_animated"
                    id="freedom-no"
                    type="radio"
                    value="false"
                    {...register("freedom_fighter")}
                    checked={freedom_fighter === false}
                    onChange={() =>
                      setValue("freedom_fighter", false, {
                        shouldValidate: true,
                      })
                    }
                  />
                  <span className="radio-right-space">No</span>
                  <Input
                    className="radio_animated pl-5"
                    id="freedom-yes"
                    type="radio"
                    value="true"
                    {...register("freedom_fighter")}
                    checked={freedom_fighter === true}
                    onChange={() =>
                      setValue("freedom_fighter", true, {
                        shouldValidate: true,
                      })
                    }
                  />
                  <span>Yes</span>
                </FormGroup>
              </Col>
              <Col md="6">
                {disabilities && (
                  <FormGroup>
                    <Label>Please provide details (ID Number):</Label>
                    <Input
                      type="text"
                      placeholder=""
                      {...register("disability_details", {
                        maxLength: {
                          value: 100,
                          message: "This field cannot exceed 100 characters",
                        },
                      })}
                      defaultValue={disability_details}
                      onChange={(e) => {
                        setValue("disability_details", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormGroup>
                )}
              </Col>
              <Col md="6">
                {freedom_fighter && (
                  <FormGroup>
                    <Label>Please provide details (ID Number):</Label>
                    <Input
                      type="text"
                      placeholder=""
                      {...register("freedom_fighter_details", {
                        maxLength: {
                          value: 100,
                          message: "This field cannot exceed 100 characters",
                        },
                      })}
                      defaultValue={freedom_fighter_details}
                      onChange={(e) => {
                        setValue("freedom_fighter_details", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormGroup>
                )}
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

export default PersonalProfile;
