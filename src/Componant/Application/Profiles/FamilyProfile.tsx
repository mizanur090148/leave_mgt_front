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
import { Btn, P } from "../../../AbstractElements";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { patchRequest, postRequest } from "../../../utils/axiosRequests";
import { signIn } from "../../../Store/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import ToastCustom from "../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";

const FamilyProfile = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);
  console.log(userInfo, "userInfo");

  const defaultValues = {
    marital_status: userInfo?.user_detail?.marital_status ?? "unmarried",
    spouse_name: userInfo?.user_detail?.spouse_name ?? "",
    etin_spouse: userInfo?.user_detail?.etin_spouse ?? "",
    nid_spouse: userInfo?.user_detail?.nid_spouse ?? "",
    children_disabled: userInfo?.user_detail?.children_disabled ?? false,
    no_dependent_children: userInfo?.user_detail?.no_dependent_children ?? "",
    children_disable_details:
      userInfo?.user_detail?.children_disable_details ?? "",
    fathers_name: userInfo?.user_detail?.fathers_name ?? "",
    fathers_etin: userInfo?.user_detail?.fathers_etin ?? "",
    mothers_name: userInfo?.user_detail?.mothers_name ?? "",
    mothers_etin: userInfo?.user_detail?.mothers_etin ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({ defaultValues });

  useEffect(() => {
    // setValue("profile_type", "individual");
  }, [setValue]);

  const marital_status = watch("marital_status");
  const spouse_name = watch("spouse_name");
  const etin_spouse = watch("etin_spouse");
  const nid_spouse = watch("nid_spouse");
  const children_disabled = watch("children_disabled");
  const no_dependent_children = watch("no_dependent_children");
  const children_disable_details = watch("children_disable_details");
  const fathers_name = watch("fathers_name");
  const fathers_etin = watch("fathers_etin");
  const mothers_name = watch("mothers_name");
  const mothers_etin = watch("mothers_etin");

  const onSubmit: SubmitHandler<any> = async (inputData) => {
    setSaveLoading(true)
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
        setMessage("Successfully Updated");
        setOpen(true);
        setSaveLoading(false)
      })
      .catch((error) => {
        setSaveLoading(false)
        console.log("from react query error: ", error.message);
      });
  };

  console.log(errors, "errorserrors");

  return (
    <Col xl="9">
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Family Profile"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label>Marital Status</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select select-custom"
                    {...register("marital_status")}
                    value={marital_status ? marital_status : "unmarried"}
                    onChange={(e) => {
                      setValue("marital_status", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="married">Married</option>
                    <option value="unmarried">Unmarried</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {marital_status === "married" && (
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Label>Full Name of Spouse</Label>
                    <Input
                      type="text"
                      bsSize="sm"
                      placeholder="Enter spouse full name"
                      {...register("spouse_name")}
                      value={spouse_name}
                      onChange={(e) => {
                        setValue("spouse_name", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>ETIN of Spouse</Label>
                    <Input
                        type="text"
                        bsSize="sm"
                        placeholder="Enter ETIN of spouse"
                        {...register("etin_spouse", {
                          maxLength: {
                            value: 12,
                            message: "ETIN must not exceed 13 digits",
                          },
                          pattern: {
                            value: /^[0-9]{12,12}$/,
                            message: "ETIN should contain only 12 digits ",
                          },
                        })}
                        value={etin_spouse}
                        onChange={(e) => {
                          setValue("etin_spouse", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                    />
                    {errors.etin_spouse && (
                        <P className="text-danger">{String(errors.etin_spouse.message)}</P>
                    )}
                  </FormGroup>
                </Col>

                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>NID of Spouse</Label>
                    <Input
                      type="text"
                      bsSize="sm"
                      placeholder="Enter spouse full name"
                      {...register("nid_spouse")}
                      value={nid_spouse}
                      onChange={(e) => {
                        setValue("nid_spouse", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>No. of Dependent Children</Label>
                    <Input
                      type="select"
                      bsSize="sm"
                      className="form-select select-custom"
                      {...register("no_dependent_children")}
                      value={no_dependent_children}
                      onChange={(e) => {
                        setValue("no_dependent_children", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label
                      className="d-block"
                      check
                      htmlFor={"children-disabilities"}
                    >
                      Is any children disabled?
                    </Label>
                    <Input
                      className="radio_animated"
                      id="children-disabled-no"
                      type="radio"
                      value="false"
                      {...register("children_disabled")}
                      checked={children_disabled === false}
                      onChange={() =>
                        setValue("children_disabled", false, {
                          shouldValidate: true,
                        })
                      }
                    />
                    <span className="radio-right-space">No</span>
                    <Input
                      className="radio_animated pl-5"
                      id="children-disabled-yes"
                      type="radio"
                      value="true"
                      {...register("children_disabled")}
                      checked={children_disabled === true}
                      onChange={() =>
                        setValue("children_disabled", true, {
                          shouldValidate: true,
                        })
                      }
                    />
                    <span>Yes</span>
                  </FormGroup>
                </Col>
                {children_disabled && (
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Please provide details (optional):</Label>
                      <Input
                        type="text"
                        bsSize="sm"
                        placeholder="Enter"
                        {...register("children_disable_details")}
                        value={children_disable_details}
                        onChange={(e) => {
                          setValue("children_disable_details", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                )}
              </Row>
            )}
            <Row>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Father’s Name</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter fathers Name"
                    {...register("fathers_name")}
                    value={fathers_name}
                    onChange={(e) => {
                      setValue("fathers_name", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Father’s ETIN (Optional)</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter fathers Name"
                    {...register("fathers_etin", {
                      maxLength: {
                      value: 12,
                      message: "ETIN must not exceed 13 digits",
                    },
                      pattern: {
                      value: /^[0-9]{12,12}$/,
                      message: "ETIN should contain only 12 digits ",
                    },
                    })}
                    value={fathers_etin}
                    onChange={(e) => {
                      setValue("fathers_etin", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors.fathers_etin && (
                      <P className="text-danger">{String(errors.fathers_etin.message)}</P>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Mother’s Name</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter Mother’s Name"
                    {...register("mothers_name")}
                    value={mothers_name}
                    onChange={(e) => {
                      setValue("mothers_name", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup>
                  <Label>Mother’s ETIN (Optional)</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter fathers Name"
                    {...register("mothers_etin")}
                    value={mothers_etin}
                    onChange={(e) => {
                      setValue("mothers_etin", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
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

export default FamilyProfile;
