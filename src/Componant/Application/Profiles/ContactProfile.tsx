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
import { Btn } from "../../../AbstractElements";
import CardHeaderCommon from "../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { getRequest, patchRequest } from "../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../Store/Slices/AuthSlice";
import React, { useEffect, useState } from "react";
import ToastCustom from "../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";

interface Country {
  id: any;
  name: string;
}
const ContactProfile = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [country, setCountry] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false); // Checkbox state


  const dispatch = useDispatch();

  let userInfo = useSelector((state: any) => state.auth.data);

  const defaultValues = {
    phone_no: userInfo?.user_detail?.phone_no ?? "",
    mobile: userInfo?.user_detail?.mobile ?? "",
    email: userInfo?.email ?? "",
    present_address: userInfo?.user_detail?.present_address ?? "male",
    present_city: userInfo?.user_detail?.present_city ?? "",
    present_post_code: userInfo?.user_detail?.present_post_code ?? "",
    present_country: userInfo?.user_detail?.present_country ?? "",
    permanent_address: userInfo?.user_detail?.permanent_address ?? "",
    permanent_city: userInfo?.user_detail?.permanent_city ?? "",
    permanent_post_code: userInfo?.user_detail?.permanent_post_code ?? "",
    permanent_country: userInfo?.user_detail?.permanent_country ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactProfile>({ defaultValues });

  const phone_no = watch("phone_no");
  const mobile = watch("mobile");
  const email = watch("email");
  const present_address = watch("present_address");
  const present_city = watch("present_city");
  const present_post_code = watch("present_post_code");
  const present_country = watch("present_country");
  const permanent_address = watch("permanent_address");
  const permanent_city = watch("permanent_city");
  const permanent_post_code = watch("permanent_post_code");
  const permanent_country = watch("permanent_country");

  const handleSameAddressToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsSameAddress(checked);

    if (checked) {
      // If checkbox is checked, copy present address fields to permanent address
      setValue("permanent_address", present_address);
      setValue("permanent_city", present_city);
      setValue("permanent_post_code", present_post_code);
      setValue("permanent_country", present_country);
    } else {
      // If checkbox is unchecked, clear permanent address fields
      setValue("permanent_address", "");
      setValue("permanent_city", "");
      setValue("permanent_post_code", "");
      setValue("permanent_country", "");
    }
  };

  const onSubmit: SubmitHandler<ContactProfile> = async (inputData) => {
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
        // toast.success("Successfully updated", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
        setMessage("Successfully Updated");
        setOpen(true);
      })
      .catch((error) => {
        setSaveLoading(false);
        console.log("from react query error: ", error.message);
      });
  };
  const getCountry = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`settings/common?type=country`);
      const names = res.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      if (names?.length) {
        setCountry(names);
        console.log("country name", names);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    getCountry();
  }, []);

  return (
    <Col xl="9" className="contact-address">
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Contact Profile"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Phone No </Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter phone no"
                    className={`${errors?.phone_no ? "is-invalid" : ""}`}
                    {...register("phone_no", {
                      maxLength: {
                        value: 11,
                        message: "Phone no exceed 50 characters",
                      },
                      pattern: {
                        value: /^[0-9]{11,11}$/,
                        message: "Phone no exceed 11 characters ",
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
              <Col md="4">
                <FormGroup>
                  <Label>Mobile No </Label>
                  <Input
                      type="text"
                      bsSize="sm"
                      placeholder="Enter mobile no"
                      className={`${errors?.mobile ? "is-invalid" : ""}`}
                      {...register("mobile", {
                        maxLength: {
                          value: 11,
                          message: "Mobile no exceed 50 characters",
                        },
                        pattern: {
                          value: /^[0-9]{11,11}$/,
                          message: "Mobile no exceed 11 characters ",
                        },
                      })}
                      value={mobile}
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
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter email"
                    className={`${errors?.email ? "is-invalid" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      maxLength: {
                        value: 50,
                        message: "Email exceed 50 characters",
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
              <Col sm="12" md="12">
                <FormGroup>
                  <Label>Present Address</Label>
                  <div>Address (House/Street/Block details)</div>
                  <Input
                    type="text"
                    placeholder="Enter present address"
                    {...register("present_address", {
                      required: "present address is required",
                      maxLength: {
                        value: 50,
                        message: "present_address exceed 50 characters",
                      },
                    })}
                    value={present_address}
                    onChange={(e) => {
                      setValue("present_address", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.present_address && (
                    <span className="error-msg">
                      {errors?.present_address?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>City/Village</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter city"
                    {...register("present_city", {
                      required: "present city is required",
                      maxLength: {
                        value: 150,
                        message: "present city exceed 150 characters",
                      },
                    })}
                    value={present_city}
                    onChange={(e) => {
                      setValue("present_city", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.present_city && (
                    <span className="error-msg">
                      {errors?.present_city?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Postcode</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter postcode"
                    {...register("present_post_code", {
                      maxLength: {
                        value: 150,
                        message: "Email exceed 150 characters",
                      },
                    })}
                    value={present_post_code}
                    onChange={(e) => {
                      setValue("present_post_code", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.present_post_code && (
                    <span className="error-msg">
                      {errors?.present_post_code?.message}
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
                    {...register("present_country", {
                      required: "Country is required",
                    })}
                    value={present_country}
                    onChange={(e) => {
                      setValue("present_country", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="">Select One</option>
                    {country?.map((data: any, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </Input>
                  {errors?.present_country && (
                    <span className="error-msg">
                      {errors?.present_country?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="12" md="12">
                <FormGroup>
                  <Label>Permanent Address</Label>
                  <div className="same-as-address">
                    <span>Address (House/Street/Block details)</span>
                    <span>
                      <Input
                        id={"termAndService"}
                        type="checkbox"
                        checked={true}
                        // {...register("termAndService", {
                        //   required: "You must agree to the terms and services",
                        //   validate: (value) =>
                        //     value || "You must agree to the terms and services",
                        // })}
                        // onChange={(e) => {
                        //   setValue("termAndService", e.target.checked, {
                        //     shouldValidate: true,
                        //   });
                        // }}
                      />
                       <Input
                           id={"isSameAddress"}
                           type="checkbox"
                           checked={isSameAddress}
                           onChange={handleSameAddressToggle}
                           style={{
                             cursor: "pointer",
                             backgroundColor: isSameAddress ? "#7a70ba" : "lightgray",
                           }}
                       />
                      <Label for={"isSameAddress"} check>
                        Same as present address
                      </Label>
                    </span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter permanent address"
                    {...register("permanent_address", {
                      maxLength: {
                        value: 150,
                        message: "Email exceed 150 characters",
                      },
                    })}
                    value={permanent_address}
                    disabled={isSameAddress}
                    onChange={(e) => {
                      setValue("permanent_address", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.permanent_address && (
                    <span className="error-msg">
                      {errors?.permanent_address?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>City/Village {permanent_city}</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter city"
                    {...register("permanent_city", {
                      maxLength: {
                        value: 150,
                        message: "Email exceed 150 characters",
                      },
                    })}
                    value={permanent_city}
                    disabled={isSameAddress}
                    onChange={(e) => {
                      setValue("permanent_city", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.permanent_city && (
                    <span className="error-msg">
                      {errors?.permanent_city?.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Postcode</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter postcode"
                    {...register("permanent_post_code", {
                      maxLength: {
                        value: 150,
                        message: "Email exceed 150 characters",
                      },
                    })}
                    value={permanent_post_code}
                    disabled={isSameAddress}
                    onChange={(e) => {
                      setValue("permanent_post_code", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors?.permanent_post_code && (
                    <span className="error-msg">
                      {errors?.permanent_post_code?.message}
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
                    {...register("permanent_country")}
                    value={permanent_country}
                    disabled={isSameAddress}
                    onChange={(e) => {
                      setValue("permanent_country", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="">Select One</option>
                    {country?.map((data: any, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </Input>
                  {/* <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter country"
                    {...register("permanent_country", {
                      maxLength: {
                        value: 150,
                        message: "Email exceed 150 characters",
                      },
                    })}
                    value={permanent_country}
                    onChange={(e) => {
                      setValue("permanent_country", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  /> */}
                  {errors?.permanent_country && (
                    <span className="error-msg">
                      {errors?.permanent_country?.message}
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

export default ContactProfile;
