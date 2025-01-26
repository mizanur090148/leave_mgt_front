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
import { pastReturn } from "../../../../Store/Slices/PastReturnTotalSlice";
import PastReturnTop from "./PastReturnTop";

interface PropertyItem {
  id: any;
  property_type_id: string;
  location_of_property: string;
  date_of_purchase: any;
  size_of_property: string;
  net_value_of_property: number | null;
}

const NonAgricultureLand: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const pastReturnData = useSelector((state: any) => state?.pastReturn?.pastReturnData);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [types, setTypes] = useState<any>([]);
  const [items, setItems] = useState<PropertyItem[]>([
    {
      id: "",
      property_type_id: "",
      location_of_property: "",
      date_of_purchase: null,
      size_of_property: "",
      net_value_of_property: null,
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

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getRequest(
        `agri-non-agri-lands?type=non-agri&past_return=1`
      );
      const data = res.data?.map((item: any) => ({
        id: item.id,
        property_type_id: item.property_type_id,
        location_of_property: item.location_of_property,
        date_of_purchase: item.date_of_purchase,
        size_of_property: item.size_of_property,
        net_value_of_property: item.net_value_of_property,
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

  const getTypes = async () => {
    try {
      setLoading(true);
      const res = await getRequest(
        `settings/common?type=non-agriculture-property`
      );
      const types = res.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      if (types?.length) {
        setTypes(types);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getTypes();
    getData();
  }, []);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedLands = [...items];
    updatedLands[index] = { ...updatedLands[index], [name]: value };
    setItems(updatedLands);
    setValue(`items.${index}.location_of_property`, value);
  };

  const addMore = () => {
    setItems([
      ...items,
      {
        id: "",
        property_type_id: "",
        location_of_property: "",
        date_of_purchase: null,
        size_of_property: "",
        net_value_of_property: null,
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
        await deleteRequest(`agri-non-agri-lands/${id}`)
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
    const inputArr = data.items.map((item) => ({
      ...item,
      user_id: userInfo.id,
      type: "non-agri",
      past_return: true,
    }));
    await postRequest(`agri-non-agri-lands`, inputArr)
      .then((res) => {
        setOpen(true);
        setSaveLoading(false);
        setMessage("Successfully Updated");
        const updatedData = res.data?.map((item: any) => ({
          id: item.id,
          property_type_id: item.property_type_id,
          location_of_property: item.location_of_property,
          date_of_purchase: item.date_of_purchase,
          size_of_property: item.size_of_property,
          net_value_of_property: item.net_value_of_property,
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

  const updateHeadData = (updatedData: any) => {
    const result = updatedData?.reduce(
      (acc: any, curr: any) => acc + Number(curr.net_value_of_property || 0), 0
    );
    const updatedState = {
      ...pastReturnData,
      nonAgriLand: result,
      total: pastReturnTotalData({ ...pastReturnData, nonAgriLand: result })
    };
    dispatch(pastReturn(updatedState));
  }

  return (
    <Col xl="9">
      <PastReturnTop
        title={"Total Non-Agri Land"}
        itemName={'nonAgriLand'}
      />
      <Card className="profile-right">
        <CardHeaderCommon
          title="Non Agriculture Land"
          tagClass="card-title mb-0"
        />
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
                          Property: {serialPadding(key)} (Type, Location, Value)
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
                          <Label>Type Of Property</Label>
                          <Input
                            style={{ padding: "6px 10px" }}
                            type="select"
                            bsSize="sm"
                            className="form-select select-custom"
                            {...register(`items.${key}.property_type_id`, {
                              required: "This is required",
                            })}
                            value={items[key].property_type_id}
                            onChange={(e) => {
                              const value = e.target.value;
                              const updatedLands = [...items];
                              updatedLands[key].property_type_id = value;
                              setItems(updatedLands);
                              setValue(`items.${key}.property_type_id`, value); // Update the form value
                            }}
                          >
                            <option value="">Select One</option>
                            {types?.map((data: any, index: any) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </Input>
                          {errors.items?.[key]?.property_type_id && (
                            <span className="error-msg">
                              {errors.items[key]?.property_type_id?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Location of Property</Label>
                          <Input
                            type="text"
                            placeholder="Location of Property"
                            {...register(`items.${key}.location_of_property`, {
                              //required: "Location of Property is required",
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].location_of_property = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.location_of_property`,
                                  value
                                );
                              },
                            })}
                            defaultValue={item.location_of_property}
                          />
                          {errors.items?.[key]?.location_of_property && (
                            <span className="error-msg">
                              {errors.items[key]?.location_of_property?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Date of Purchase</Label>
                          <Input
                            type="date"
                            placeholder="Date of Purchase"
                            {...register(`items.${key}.date_of_purchase`, {
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].date_of_purchase = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.date_of_purchase`,
                                  value
                                );
                              },
                            })}
                            defaultValue={item.date_of_purchase}
                          />
                          {errors.items?.[key]?.date_of_purchase && (
                            <span className="error-msg">
                              {/* {errors.items[key]?.date_of_purchase?.message} */}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Size of Property (SFT/Decimal)</Label>
                          <Input
                            type="text"
                            placeholder="Location of Property"
                            {...register(`items.${key}.size_of_property`, {
                              required: "Location of Property is required",
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].size_of_property = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.size_of_property`,
                                  value
                                );
                              },
                            })}
                            defaultValue={item.size_of_property}
                          />
                          {errors.items?.[key]?.size_of_property && (
                            <span className="error-msg">
                              {errors.items[key]?.size_of_property?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Net Cost of the Property</Label>
                          <Input
                            type="number"
                            placeholder="Net Cost of the Property"
                            {...register(`items.${key}.net_value_of_property`, {
                              required: "Location of Property is required",
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].net_value_of_property = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.net_value_of_property`,
                                  value
                                );
                              },
                            })}
                            defaultValue={item.net_value_of_property ?? undefined}
                          />
                          {errors.items?.[key]?.net_value_of_property && (
                            <span className="error-msg">
                              {
                                errors.items[key]?.net_value_of_property
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

export default NonAgricultureLand;
