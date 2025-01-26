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
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import { assetEntryTotalData, serialPadding } from "../../../../utils/helpers";
import { assetEntry } from "../../../../Store/Slices/PastReturnTotalSlice";
import AssetEntryTop from "./AssetEntryTop";

interface PropertyItem {
  id: any;
  type_id: string;
  closing_qty: number;
  closing_value: number;
  opening_qty: number;
  opening_value: number;
  new_purchase_qty: number;
  purchase_value: number;
  sale_qty: number;
  sale_value: number;
  past_return?: boolean;
}

const Jewellery: React.FC = () => {
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
      type_id: "",
      closing_qty: 0,
      closing_value: 0,
      opening_qty: 0,
      opening_value: 0,
      new_purchase_qty: 0,
      purchase_value: 0,
      sale_qty: 0,
      sale_value: 0,
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

  const getItems = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`jewelleries`);
      const data = res.data?.map((item: any) => ({
        id: item.id,
        type_id: item.type_id,
        closing_qty: item.closing_qty,
        closing_value: item.closing_value,
        opening_qty: item.opening_qty,
        opening_value: item.opening_value,
        new_purchase_qty: item.new_purchase_qty,
        purchase_value: item.purchase_value,
        sale_qty: item.sale_qty,
        sale_value: item.sale_value,
        past_return: item.past_return,
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
      const res = await getRequest(`settings/common?type=jewellery`);
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
    getItems();
  }, []);

  const addMore = () => {
    setItems([
      ...items,
      {
        id: "",
        type_id: "",
        closing_qty: 0,
        closing_value: 0,
        opening_qty: 0,
        opening_value: 0,
        new_purchase_qty: 0,
        purchase_value: 0,
        sale_qty: 0,
        sale_value: 0,
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
        await deleteRequest(`jewelleries/${id}`)
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
    }));
    await postRequest(`jewelleries`, inputArr)
      .then((res) => {
        setOpen(true);
        setSaveLoading(false);
        setMessage("Successfully Updated");
        const updatedData = res?.data?.map((item: any) => ({
          id: item.id,
          type_id: item.type_id,
          closing_qty: item.closing_qty,
          closing_value: item.closing_value,
          opening_qty: item.opening_qty,
          opening_value: item.opening_value,
          new_purchase_qty: item.new_purchase_qty,
          purchase_value: item.purchase_value,
          sale_qty: item.sale_qty,
          sale_value: item.sale_value,
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
        Number(
          curr.closing_value || 0
        ) +
        Number(curr.purchase_value || 0) -
        Number(curr.sale_value || 0),
      0
    );
    const updatedState = {
      ...assetEntryData,
      jewellery: result,
      total: assetEntryTotalData({ ...assetEntryData, jewellery: result })
    };
    dispatch(assetEntry(updatedState));
  }

  return (
    <Col xl="9">
      <AssetEntryTop
        title={"Total Jewellery"}
        itemName={'jewellery'}
      />
      <Card className="profile-right">
        <CardHeaderCommon title="Jewellery" tagClass="card-title mb-0" />
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
                        <b>Jewellery: {serialPadding(key)} (Type, Value)</b>
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
                          <Label>Type</Label>
                          {item?.past_return ? (
                            <Fragment>
                              <Input
                                style={{ padding: "6px 10px" }}
                                type="select"
                                bsSize="sm"
                                className="form-select select-custom"
                                value={item.type_id}
                                disabled
                              >
                                {types
                                  ?.filter(
                                    (data: any) => data.id === item.type_id
                                  )
                                  ?.map((data: any, index: any) => (
                                    <option key={index} value={data.id}>
                                      {data.name}
                                    </option>
                                  ))}
                              </Input>
                            </Fragment>
                          ) : (
                            <Fragment>
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
                                  setValue(`items.${key}.type_id`, value);
                                }}
                              >
                                <option value="">Select One</option>
                                {types?.map((data: any, index: any) => (
                                  <option key={index} value={data.id}>
                                    {data.name}
                                  </option>
                                ))}
                              </Input>
                              {errors.items?.[key]?.type_id && (
                                <span className="error-msg">
                                  {"This field is required"}
                                </span>
                              )}
                            </Fragment>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Opening Qty</Label>
                          {item?.past_return ? (
                            <Input
                              type="number"
                              defaultValue={
                                item.opening_qty
                                  ? item.opening_qty
                                  : item.closing_qty
                              }
                              disabled
                            />
                          ) : (
                            <Fragment>
                              <Input
                                type="text"
                                placeholder="Opening Qty"
                                {...register(`items.${key}.opening_qty`, {
                                  required: "This is required",
                                  onChange: (e) => {
                                    const value = e.target.value;
                                    const updatedLands = [...items];
                                    updatedLands[key].opening_qty = value;
                                    setItems(updatedLands);
                                    setValue(`items.${key}.opening_qty`, value);
                                  },
                                })}
                                defaultValue={
                                  item.opening_qty
                                    ? item.opening_qty
                                    : item.closing_qty
                                }
                              />
                              {errors.items?.[key]?.opening_qty && (
                                <span className="error-msg">
                                  {errors.items[key]?.opening_qty?.message}
                                </span>
                              )}
                            </Fragment>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Opening Value</Label>
                          {item?.past_return ? (
                            <Input
                              type="number"
                              defaultValue={
                                item.opening_value
                                  ? item.opening_value
                                  : item.closing_value
                              }
                              disabled
                            />
                          ) : (
                            <Fragment>
                              <Input
                                type="text"
                                placeholder="Opening value"
                                {...register(`items.${key}.opening_value`, {
                                  required: "This is required",
                                  onChange: (e) => {
                                    const value = e.target.value;
                                    const updatedLands = [...items];
                                    updatedLands[key].opening_value = value;
                                    setItems(updatedLands);
                                    setValue(
                                      `items.${key}.opening_value`,
                                      value
                                    );
                                  },
                                })}
                                defaultValue={
                                  item.opening_value
                                    ? item.opening_value
                                    : item.closing_value
                                }
                              />
                              {errors.items?.[key]?.opening_value && (
                                <span className="error-msg">
                                  {errors.items[key]?.opening_value?.message}
                                </span>
                              )}
                            </Fragment>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>New Purchase Qty</Label>
                          <Input
                            type="text"
                            placeholder="New Purchase Qty"
                            {...register(`items.${key}.new_purchase_qty`, {
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].new_purchase_qty = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.new_purchase_qty`,
                                  value
                                );
                              },
                            })}
                            defaultValue={item.new_purchase_qty}
                          />
                          {errors.items?.[key]?.new_purchase_qty && (
                            <span className="error-msg">
                              {errors.items[key]?.new_purchase_qty?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Purchase Value</Label>
                          <Input
                            type="text"
                            placeholder="New Purchase Value"
                            {...register(`items.${key}.purchase_value`, {
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].purchase_value = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.purchase_value`, value);
                              },
                            })}
                            defaultValue={item.purchase_value}
                          />
                          {errors.items?.[key]?.purchase_value && (
                            <span className="error-msg">
                              {errors.items[key]?.purchase_value?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Sale Qty</Label>
                          <Input
                            type="text"
                            placeholder="Sale Qty"
                            {...register(`items.${key}.sale_qty`, {
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].sale_qty = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.sale_qty`, value);
                              },
                            })}
                            defaultValue={item.sale_qty}
                          />
                          {errors.items?.[key]?.sale_qty && (
                            <span className="error-msg">
                              {errors.items[key]?.sale_qty?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Sale Value</Label>
                          <Input
                            type="text"
                            placeholder="Sale Value"
                            {...register(`items.${key}.sale_value`, {
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].sale_value = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.sale_value`, value);
                              },
                            })}
                            defaultValue={item.sale_value}
                          />
                          {errors.items?.[key]?.sale_value && (
                            <span className="error-msg">
                              {errors.items[key]?.sale_value?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Closing Qty</Label>
                          <Input
                            type="number"
                            value={
                              Number(
                                item.opening_qty
                                  ? item.opening_qty
                                  : item.closing_qty || 0
                              ) +
                              Number(item.new_purchase_qty || 0) -
                              Number(item.sale_qty || 0)
                            }
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Closing Value</Label>
                          <Input
                            type="number"
                            value={
                              Number(
                                item.opening_value
                                  ? item.opening_value
                                  : item.closing_value || 0
                              ) +
                              Number(item.purchase_value || 0) -
                              Number(item.sale_value || 0)
                            }
                            disabled
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

export default Jewellery;
