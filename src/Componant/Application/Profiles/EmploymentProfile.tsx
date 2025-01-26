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
import React, { Fragment, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signIn } from "../../../Store/Slices/AuthSlice";
import { getRequest, patchRequest } from "../../../utils/axiosRequests";
import ToastCustom from "../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";

interface Country {
  id: any;
  name: string;
}
const EmploymentProfile = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);

  const defaultValues = {
    profession: userInfo?.user_detail?.profession ?? "",
    type_of_profession: userInfo?.user_detail?.type_of_profession ?? "",
    employee_id: userInfo?.user_detail?.employee_id ?? "",
    name_of_employer: userInfo?.user_detail?.name_of_employer ?? "",
    bin: userInfo?.user_detail?.bin ?? "",
    etin_business: userInfo?.user_detail?.etin_business ?? "",
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
  } = useForm<any>({ defaultValues });

  const profession = watch("profession");
  const type_of_profession = watch("type_of_profession");
  const employee_id = watch("employee_id");
  const name_of_employer = watch("name_of_employer");
  const bin = watch("bin");
  const etin_business = watch("etin_business");
  const office_address = watch("office_address");
  const office_city = watch("office_city");
  const office_post_code = watch("office_post_code");
  const office_country = watch("office_country");

  const onSubmit: SubmitHandler<any> = async (inputData) => {
    setSaveLoading(true);
    if (inputData['profession'] !== 'service') {
      inputData['type_of_profession'] = "";
    }
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
        toast.success("Successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setMessage("Successfully Updated");
        setOpen(true);
        setSaveLoading(false);
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
        console.log("country name", names)
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    getCountry();
  }, []);

  console.log(errors, "errorserrors");
  return (
    <Col xl="9">
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Employment Profile"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Profession</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select select-custom"
                    {...register("profession", { required: 'This field is required' })}
                    value={profession}
                    onChange={(e) => {
                      setValue("profession", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="">Select One</option>
                    <option value="business">Business</option>
                    <option value="service">Service</option>
                    <option value="professional">Professional</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="self_Employed">Self Employed</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="partnership">Partnership</option>
                  </Input>
                  {errors?.profession && (
                    <span className="error-msg">
                      This is required
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Type of Service</Label>
                  {profession !== 'service' ? (<Input
                    type="select"
                    bsSize="sm"
                    disabled={true}
                    className="form-select select-custom"
                  >
                    <option value="">Select One</option>
                  </Input>) :
                    (<Fragment>
                      <Input
                        type="select"
                        bsSize="sm"
                        className="form-select select-custom"
                        {...register("type_of_profession", { required: 'This field is required' })}
                        value={type_of_profession}
                        onChange={(e) => {
                          setValue("type_of_profession", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <option value="">Select One</option>
                        <option value="government">Government</option>
                        <option value="private">Private</option>
                        <option value="autonomous">Autonomous</option>
                        <option value="smi_autonomous">Smi Autonomous</option>
                        <option value="self_employed">Self Employed</option>
                        <option value="freelancer">Freelancer</option>
                      </Input>
                      {errors?.type_of_profession && (
                        <span className="error-msg">
                          This is required
                        </span>
                      )}</Fragment>
                    )
                  }
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Employment ID</Label>
                  <Input
                    type="text"
                    disabled={profession !== 'service'}
                    bsSize="sm"
                    placeholder="Enter employee ID"
                    {...register("employee_id")}
                    value={employee_id}
                    onChange={(e) => {
                      setValue("employee_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Name of Employer/Business/Profession</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter name"
                    {...register("name_of_employer")}
                    value={name_of_employer}
                    onChange={(e) => {
                      setValue("name_of_employer", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>BIN of Business (Optional)</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter old TIN"
                    {...register("bin")}
                    value={bin}
                    onChange={(e) => {
                      setValue("bin", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>ETIN of Business (Optional)</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter old TIN"
                    {...register("etin_business")}
                    value={etin_business}
                    onChange={(e) => {
                      setValue("etin_business", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="12">
                <FormGroup>
                  <Label>Address (House/Street/Block details)</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter address"
                    {...register("office_address")}
                    value={office_address}
                    onChange={(e) => {
                      setValue("office_address", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>City</Label>
                  <Input
                    type="text"
                    bsSize="sm"
                    placeholder="Enter City"
                    {...register("office_city")}
                    value={office_city}
                    onChange={(e) => {
                      setValue("office_city", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Postcode</Label>
                  <Input
                    type="number"
                    placeholder="Enter postcode"
                    {...register("office_post_code")}
                    value={office_post_code}
                    onChange={(e) => {
                      setValue("office_post_code", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
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
                    <option value="">Select One</option>
                    {country?.map((data: any, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Btn
              className="pull-right save-and-continue"
              color="primary"
              type={saveLoading ? `button` : `submit`}
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

export default EmploymentProfile;
