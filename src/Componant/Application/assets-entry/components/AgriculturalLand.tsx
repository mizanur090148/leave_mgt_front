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
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { Btn } from "../../../../AbstractElements";
import { assetEntryTotalData, serialPadding } from "../../../../utils/helpers";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import { assetEntry } from "../../../../Store/Slices/PastReturnTotalSlice";
import AssetEntryTop from "./AssetEntryTop";
import { pastReturn } from "../../../../Store/Slices/PastReturnTotalSlice";

interface PropertyItem {
  id: any;
  property_type_id: string;
  location_of_property: string;
  date_of_purchase: any;
  size_of_property: string;
  net_value_of_property: any;
  renovation_deployment: number;
  sale_of_portion: number;
  cost_of_sale_portion: number;
  past_return?: boolean;
}

const AgriculturalLand: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const assetEntryData = useSelector((state: any) => state?.pastReturn?.assetEntryData);
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
      net_value_of_property: "",
      renovation_deployment: 0,
      sale_of_portion: 0,
      cost_of_sale_portion: 0,
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
      const res = await getRequest(`agri-non-agri-lands?type=agri`);
      const data = res.data?.map((item: any) => ({
        id: item.id,
        property_type_id: item.property_type_id,
        location_of_property: item.location_of_property,
        date_of_purchase: item.date_of_purchase,
        size_of_property: item.size_of_property,
        net_value_of_property: item.net_value_of_property,
        renovation_deployment: item.renovation_deployment,
        sale_of_portion: item?.sale_of_portion,
        cost_of_sale_portion: item?.cost_of_sale_portion,
        past_return: item?.past_return,
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
      const res = await getRequest(`settings/common?type=agriculture-property`);
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

  const addMore = () => {
    setItems([
      ...items,
      {
        id: "",
        property_type_id: "",
        location_of_property: "",
        date_of_purchase: null,
        size_of_property: "",
        net_value_of_property: "",
        renovation_deployment: 0,
        sale_of_portion: 0,
        cost_of_sale_portion: 0,
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
      type: "agri",
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
          renovation_deployment: item.renovation_deployment,
          sale_of_portion: item?.sale_of_portion,
          cost_of_sale_portion: item?.cost_of_sale_portion,
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
      (acc: any, curr: any) =>
        acc +
        (Number(curr.net_value_of_property || 0) +
          Number(curr.renovation_deployment || 0) -
          Number(curr.cost_of_sale_portion || 0)),
      0
    );
    const updatedState = {
      ...assetEntryData,
      agriLand: result,
      total: assetEntryTotalData({ ...assetEntryData, agriLand: result })
    };

    dispatch(assetEntry(updatedState));
  }

  return (
    <Col xl="9">
      <AssetEntryTop
        title={"Total Agricultural Land"}
        itemName={'agriLand'}
      />
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <Card className="profile-right">
        <CardHeaderCommon
          title={"Agricultural Land"}
          tagClass={"card-title mb-0"}
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
                            disabled={items[key].past_return}
                            className="form-select select-custom"
                            {...register(`items.${key}.property_type_id`)}
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
                          {item?.past_return ? (
                            <Input
                              type="text"
                              disabled
                              defaultValue={item.location_of_property}
                            />
                          ) : (
                            <Fragment>
                              <Input
                                type="text"
                                placeholder="Location of Property"
                                {...register(
                                  `items.${key}.location_of_property`,
                                  {
                                    //required: "Location of Property is required",
                                    onChange: (e) => {
                                      const value = e.target.value;
                                      const updatedLands = [...items];
                                      updatedLands[key].location_of_property =
                                        value;
                                      setItems(updatedLands);
                                      setValue(
                                        `items.${key}.location_of_property`,
                                        value
                                      );
                                    },
                                  }
                                )}
                                defaultValue={item.location_of_property}
                              />
                              {errors.items?.[key]?.location_of_property && (
                                <span className="error-msg">
                                  {
                                    errors.items[key]?.location_of_property
                                      ?.message
                                  }
                                </span>
                              )}
                            </Fragment>
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
                          <Label>Size of Property (Decimal)</Label>
                          {item?.past_return ? (
                            <Input
                              type="text"
                              disabled
                              defaultValue={item.size_of_property}
                            />
                          ) : (
                            <Fragment>
                              <Input
                                type="text"
                                placeholder="Size of Property (Decimal)"
                                {...register(`items.${key}.size_of_property`, {
                                  //required: "Location of Property is required",
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
                            </Fragment>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Total Cost</Label>
                          {item?.past_return ? (
                            <Input
                              type="number"
                              placeholder="Total cost"
                              disabled
                              defaultValue={item?.net_value_of_property}
                            />
                          ) : (
                            <Fragment>
                              <Input
                                type="number"
                                placeholder="Net Cost of the Property"
                                {...register(
                                  `items.${key}.net_value_of_property`,
                                  {
                                    required:
                                      "Location of Property is required",
                                    onChange: (e) => {
                                      const value = e.target.value;
                                      const updatedLands = [...items];
                                      updatedLands[key].net_value_of_property =
                                        value;
                                      setItems(updatedLands);
                                      setValue(
                                        `items.${key}.net_value_of_property`,
                                        value
                                      );
                                    },
                                  }
                                )}
                                defaultValue={item.net_value_of_property}
                              />
                              {errors.items?.[key]?.net_value_of_property && (
                                <span className="error-msg">
                                  This is required
                                </span>
                              )}
                            </Fragment>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Development</Label>
                          <Input
                            type="number"
                            placeholder="Development"
                            {...register(`items.${key}.renovation_deployment`, {
                              //required: "Location of Property is required",
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].renovation_deployment = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.renovation_deployment`,
                                  value
                                );
                              },
                            })}
                            defaultValue={item.renovation_deployment}
                          />
                          {errors.items?.[key]?.renovation_deployment && (
                            <span className="error-msg">
                              {
                                errors.items[key]?.renovation_deployment
                                  ?.message
                              }
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Sale of Portion (Decimal)</Label>
                          <Input
                            type="text"
                            placeholder="Sale of Portion (Decimal)"
                            {...register(`items.${key}.sale_of_portion`, {
                              //required: "Location of Property is required",
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].sale_of_portion = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.sale_of_portion`, value);
                              },
                            })}
                            defaultValue={item.sale_of_portion}
                          />
                          {errors.items?.[key]?.sale_of_portion && (
                            <span className="error-msg">
                              {errors.items[key]?.sale_of_portion?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Cost of Sale Portion</Label>
                          {/* {item?.past_return ? (
                            <Input
                              type="text"
                              disabled
                              defaultValue={item?.cost_of_sale_portion}
                            />
                          ) : ( */}
                          <Fragment>
                            <Input
                              type="text"
                              placeholder="Cost of Sale Portion"
                              {...register(
                                `items.${key}.cost_of_sale_portion`,
                                {
                                  //required: "Location of Property is required",
                                  onChange: (e) => {
                                    const value = e.target.value;
                                    const updatedLands = [...items];
                                    updatedLands[key].cost_of_sale_portion =
                                      value;
                                    setItems(updatedLands);
                                    setValue(
                                      `items.${key}.cost_of_sale_portion`,
                                      value
                                    );
                                  },
                                }
                              )}
                              defaultValue={item.cost_of_sale_portion}
                            />
                            {errors.items?.[key]?.cost_of_sale_portion && (
                              <span className="error-msg">
                                {
                                  errors.items[key]?.cost_of_sale_portion
                                    ?.message
                                }
                              </span>
                            )}
                          </Fragment>
                          {/* )} */}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Net Cost of the Property</Label>
                          <Input
                            type="number"
                            disabled
                            value={
                              Number(item.net_value_of_property || 0) +
                              Number(item.renovation_deployment || 0) -
                              Number(item.cost_of_sale_portion || 0)
                            }
                          />
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
                        type={saveLoading ? `button` : `submit`}
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
        <CardFooter className="text-end"></CardFooter>
      </Card>
    </Col>
  );
};

export default AgriculturalLand;
