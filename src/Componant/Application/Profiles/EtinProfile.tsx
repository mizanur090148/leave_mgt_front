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
import { getRequest, patchRequest, postRequest } from "../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../Store/Slices/AuthSlice";
import React, { useEffect, useState } from "react";
import ToastCustom from "../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";


interface Circle {
  id: any;
  name: string;
}
interface Zone {
  id: any;
  name: string;
}
interface Location {
  id: any;
  name: string;
}
const EtinProfile = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);
  const [loading, setLoading] = useState(false);
  const [isOldTinEnabled, setIsOldTinEnabled] = useState(false); // Checkbox state


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
    has_old_tin: false,
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
  const has_old_tin = watch("has_old_tin");


  const onSubmit: SubmitHandler<EtinProfile> = async (inputData) => {
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
        setMessage("Successfully Updated");
        setOpen(true);
        setSaveLoading(false);
      })
      .catch((error) => {
        setSaveLoading(false);
        console.log("from react query error: ", error.message);
      });
  };
  const getCircles = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`settings/common?type=circle`);
      const names = res.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      if (names?.length) {
        setCircles(names);
        console.log("circle name", names)
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };
  const getZones = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`settings/common?type=zone`);
      const names = res.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      if (names?.length) {
        setZones(names);
        console.log("zone name", names)
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getLocation = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`settings/common?type=tax-payer-location`);
      const names = res?.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      if (names?.length) {
        setLocations(names);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getoldTin = async () => {
    if (old_tin) {
      setIsOldTinEnabled(true);
      setValue("has_old_tin", true);
    }
  };

  useEffect(() => {
    getCircles();
    getZones();
    getLocation();
    getoldTin();
  }, []);

  const handleCheckboxToggle = () => {
    setIsOldTinEnabled(!isOldTinEnabled);
    setValue("has_old_tin", !isOldTinEnabled); // Set the checkbox value
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
                    className="form-select form-select-sm select-custom"
                    {...register("circle_id")}
                    value={circle_id}
                    onChange={(e) => {
                      setValue("circle_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="">Select One</option>
                    {circles?.map((data: any, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
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
                    className="form-select select-custom"
                    {...register("zone_id")}
                    value={zone_id}
                    onChange={(e) => {
                      setValue("zone_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="">Select One</option>
                    {zones?.map((data: any, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Tax Payer Status</Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="form-select select-custom"
                    {...register("tax_payer_status")}
                    value={tax_payer_status}
                    onChange={(e) => {
                      setValue("tax_payer_status", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="">Select One</option>
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
                    className="form-select select-custom"
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
                    className="form-select select-custom"
                    {...register("tax_payer_location_id")}
                    value={tax_payer_location_id}
                    onChange={(e) => {
                      setValue("tax_payer_location_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <option value="">Select One</option>
                    {locations?.map((data: any, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Input
                    type="checkbox"
                    onChange={(e) => {
                      handleCheckboxToggle(); // Toggle checkbox state
                      setValue("has_old_tin", e.target.checked);  // Save the checked value in the form data
                    }}

                    style={{
                      cursor: "pointer",
                      backgroundColor: isOldTinEnabled ? "#7a70ba" : "lightgray",
                    }}
                    checked={isOldTinEnabled}
                  />
                  <Label style={{ marginLeft: "10px" }}> Old TIN</Label>

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
                    disabled={!isOldTinEnabled}
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
                  <Label> Circle</Label>
                  <Input
                    type="text"
                    placeholder="Enter old Circle"
                    {...register("old_circle_id", {
                      maxLength: {
                        value: 12,
                        message: "This cannot exceed 12 characters",
                      },
                    })}
                    value={old_circle_id}
                    disabled={!isOldTinEnabled}
                    onChange={(e) => {
                      setValue("old_circle_id", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label> Zone</Label>
                  <Input
                    type="text"
                    placeholder="Enter old zone"
                    {...register("old_zone_id", {
                      maxLength: {
                        value: 12,
                        message: "This cannot exceed 12 characters",
                      },
                    })}
                    value={old_zone_id}
                    disabled={!isOldTinEnabled}
                    onChange={(e) => {
                      setValue("old_zone_id", e.target.value, {
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

export default EtinProfile;
