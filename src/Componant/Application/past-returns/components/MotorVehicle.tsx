import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { Btn } from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import { pastReturnTotalData, serialPadding } from "../../../../utils/helpers";
import PastReturnTop from "./PastReturnTop";
import { pastReturn } from "../../../../Store/Slices/PastReturnTotalSlice";

interface PropertyItem {
  id: any;
  type_id: string;
  capacity_id: any;
  brand: string;
  registration_no: string;
  cost_with_registration: number | null;
}

interface VehicleType {
  id: any;
  name: string;
}

interface CapacityItem {
  id: any;
  name: string;
}

const MotorVehicle: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const pastReturnData = useSelector((state: any) => state?.pastReturn?.pastReturnData);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [capacities, setCapacities] = useState<CapacityItem[]>([]);
  const [items, setItems] = useState<PropertyItem[]>([
    {
      id: "",
      type_id: "",
      capacity_id: "",
      brand: "",
      registration_no: "",
      cost_with_registration: null,
    },
  ]);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<{ items: PropertyItem[] }>({
    defaultValues: {
      items: [],
    },
  });

  const addMore = () => {
    setItems([
      ...items,
      {
        id: "",
        type_id: "",
        capacity_id: "",
        brand: "",
        registration_no: "",
        cost_with_registration: null,
      },
    ]);
  };

  const deleteAction = async (id: any, index: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmation) {
      const updatedData = [...items];
      if (id) {
        await deleteRequest(`motor-vehicles/${id}`)
          .then((res) => {
            setItems(updatedData.filter((item) => item.id !== id));
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        updatedData.splice(index, 1);
        setItems(updatedData);
      }
    }
  };

  const onSubmit: SubmitHandler<{ items: PropertyItem[] }> = async (data) => {
    setSaveLoading(true);
    const inputArr = data?.items?.map((item) => ({
      ...item,
      user_id: userInfo.id,
      past_return: true,
    }));
    await postRequest(`motor-vehicles`, inputArr)
      .then((res) => {
        setOpen(true);
        setSaveLoading(false);
        setMessage("Successfully Updated");
        const updatedData = res?.data?.map((item: any) => ({
          id: item.id,
          type_id: item.type_id,
          capacity_id: item.capacity_id,
          brand: item.brand,
          registration_no: item.registration_no,
          cost_with_registration: item.cost_with_registration,
        }));
        setItems(updatedData);
        reset({ items: updatedData });
        updateHeadData(updatedData);
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("Error:", error.message);
      });
  };

  const getItems = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`motor-vehicles?past_return=1`);
      const data = res.data?.map((item: any) => ({
        id: item.id,
        type_id: item.type_id,
        capacity_id: item.capacity_id,
        brand: item.brand,
        registration_no: item.registration_no,
        cost_with_registration: item.cost_with_registration,
      }));

      if (data?.length) {
        setItems(data);
        reset({ items: data });
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetching data:", error.message);
    }
  };

  const getTypeOfVehicles = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`settings/common?type=vehicle`);
      const types = res.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      if (types?.length) {
        setVehicleTypes(types);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getCapacities = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`settings/common?type=capacity`);
      const capacities = res.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      if (capacities?.length) {
        setCapacities(capacities);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getTypeOfVehicles();
    getCapacities();
    getItems();
  }, []);

  const updateHeadData = (updatedData: any) => {
    const result = updatedData?.reduce(
      (acc: any, curr: any) => acc + Number(curr.cost_with_registration || 0),
      0
    );
    const updatedState = {
      ...pastReturnData,
      motorVehicle: result,
      total: pastReturnTotalData({ ...pastReturnData, motorVehicle: result })
    };

    dispatch(pastReturn(updatedState));
  }

  return (
    <Col xl="9">
      <PastReturnTop
        title="Total Motor Vehicle"
        itemName={'motorVehicle'}
      />
      <Card className="profile-right">
        <CardHeaderCommon title="Motor Vehicles" tagClass="card-title mb-0" />
        <CardBody>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <>
              {open && message && (
                <ToastCustom message={message} open={open} setOpen={setOpen} />
              )}
              <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                {items.map((item, key) => (
                  <Fragment key={key}>
                    {key > 0 && <div className="dashed-hr"></div>}
                    <Row className="fw-bold">
                      <Col>
                        <b>
                          Vehicle: {serialPadding(key)} (Brand, CC, Type, Cost)
                        </b>
                      </Col>
                      <Col className="text-end">
                        {key > 0 && (
                          <i
                            style={{ fontSize: "17px" }}
                            className="fa fa-times-circle text-danger del-custom"
                            onClick={() => deleteAction(item?.id, key)}
                          ></i>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Type Of Vehicle</Label>
                          <Input
                            style={{ padding: "6px 10px" }}
                            type="select"
                            bsSize="sm"
                            className="form-select select-custom"
                            {...register(`items.${key}.type_id`, {
                              required: "This is required",
                            })}
                            value={items[key].type_id}
                            onChange={(e) => {
                              const value = e.target.value;
                              const updatedLands = [...items];
                              updatedLands[key].type_id = value;
                              setItems(updatedLands);
                              setValue(`items.${key}.type_id`, value); // Update the form value
                            }}
                          >
                            <option value="">Select One</option>
                            {vehicleTypes?.map((data: any, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </Input>
                          {errors.items?.[key]?.type_id && (
                            <span className="error-msg">
                              {errors.items[key]?.type_id?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Capacity (CC/KWh)</Label>
                          <Input
                            style={{ padding: "6px 10px" }}
                            type="select"
                            bsSize="sm"
                            className="form-select select-custom"
                            {...register(`items.${key}.capacity_id`, {
                              required: "This is required",
                            })}
                            value={items[key].capacity_id}
                            onChange={(e) => {
                              const value = e.target.value;
                              const updatedLands = [...items];
                              updatedLands[key].capacity_id = value;
                              setItems(updatedLands);
                              setValue(`items.${key}.capacity_id`, value); // Update the form value
                            }}
                          >
                            <option value="">Select One</option>
                            {capacities?.map((data: any, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </Input>
                          {errors.items?.[key]?.capacity_id && (
                            <span className="error-msg">This is required</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Brand</Label>
                          <Input
                            type="text"
                            placeholder="Brand"
                            {...register(`items.${key}.brand`, {
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].brand = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.brand`, value);
                              },
                            })}
                            defaultValue={item.brand}
                          />
                          {errors.items?.[key]?.brand && (
                            <span className="error-msg">
                              {errors.items[key]?.brand?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Registration No</Label>
                          <Input
                            type="text"
                            placeholder="Registration No"
                            {...register(`items.${key}.registration_no`, {
                              required: "This is required",
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].registration_no = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.registration_no`, value);
                              },
                            })}
                            defaultValue={item.registration_no}
                          />
                          {errors.items?.[key]?.registration_no && (
                            <span className="error-msg">
                              {errors.items[key]?.registration_no?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Cost With Registration</Label>
                          <Input
                            type="number"
                            placeholder="Cost With Registration"
                            {...register(
                              `items.${key}.cost_with_registration`,
                              {
                                required: "Location of Property is required",
                                onChange: (e) => {
                                  const value = e.target.value;
                                  const updatedLands = [...items];
                                  updatedLands[key].cost_with_registration =
                                    value;
                                  setItems(updatedLands);
                                  setValue(
                                    `items.${key}.cost_with_registration`,
                                    value
                                  );
                                },
                              }
                            )}
                            defaultValue={item.cost_with_registration ?? undefined}
                          />
                          {errors.items?.[key]?.cost_with_registration && (
                            <span className="error-msg">
                              {
                                errors.items[key]?.cost_with_registration
                                  ?.message
                              }
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                  </Fragment>
                ))}
                <Row>
                  <Col>
                    <Btn
                      className="btn-full mb-2"
                      color="outline-info"
                      type="button"
                      onClick={() => addMore()}
                    >
                      Add More <i className="fa fa-plus-circle pl-2"></i>
                    </Btn>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <FormGroup className="text-center">
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
                        type={saveLoading ? `button` : `submit`}
                      >
                        {saveLoading ? "Saving..." : "Save"}
                      </Btn>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default MotorVehicle;
