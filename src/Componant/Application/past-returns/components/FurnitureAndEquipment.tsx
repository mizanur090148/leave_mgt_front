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
import { useDispatch, useSelector } from "react-redux";
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
  closing_qty: number | null;
  closing_value: number | null;
}

const FurnitureAndEquipment: React.FC = () => {
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
      type_id: "",
      closing_qty: null,
      closing_value: null,
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

  const getchItems = async () => {
    setLoading(true);
    try {
      const res = await getRequest(`furniture-equipments?past_return=1`);
      const data = res.data?.map((item: any) => ({
        id: item.id,
        type_id: item.type_id,
        closing_qty: item.closing_qty,
        closing_value: item.closing_value,
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
      const res = await getRequest(`settings/common?type=furniture`);
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
    getchItems();
  }, []);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedLands = [...items];
    updatedLands[index] = { ...updatedLands[index], [name]: value };
    setItems(updatedLands);
    setValue(`items.${index}.closing_qty`, Number(value));
  };

  const addMore = () => {
    setItems([
      ...items,
      {
        id: "",
        type_id: "",
        closing_qty: null,
        closing_value: null,
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
        await deleteRequest(`furniture-equipments/${id}`)
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
    await postRequest(`furniture-equipments`, inputArr)
      .then((res) => {
        setOpen(true);
        setSaveLoading(false);
        setMessage("Successfully Updated");
        const updatedData = res?.data?.map((item: any) => ({
          id: item.id,
          type_id: item.type_id,
          closing_qty: item.closing_qty,
          closing_value: item.closing_value,
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
      (acc: any, curr: any) => acc + Number(curr.closing_value || 0),
      0
    );
    const updatedState = {
      ...pastReturnData,
      furniture: result,
      total: pastReturnTotalData({ ...pastReturnData, furniture: result })
    };

    dispatch(pastReturn(updatedState));
  }

  return (
    <Col xl="9">
      <PastReturnTop
        title="Total Furniture"
        itemName={'furniture'}
      />
      <Card className="profile-right">
        <CardHeaderCommon
          title="Furniture & Equipment"
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
                          Furniture & Equipment: {serialPadding(key)} (Type,
                          Value)
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
                          <Label>Type</Label>
                          <Input
                            style={{ padding: "6px 10px" }}
                            type="select"
                            bsSize="sm"
                            className="form-select select-custom"
                            {...register(`items.${key}.type_id`)}
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
                            {types?.map((data: any, index: any) => (
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
                          <Label>Closing Qty</Label>
                          <Input
                            type="text"
                            placeholder="Closing Qty"
                            {...register(`items.${key}.closing_qty`, {
                              required: "This is required",
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].closing_qty = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.closing_qty`, value);
                              },
                            })}
                            defaultValue={item.closing_qty ?? undefined}
                          />
                          {errors.items?.[key]?.closing_qty && (
                            <span className="error-msg">
                              {errors.items[key]?.closing_qty?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Closing Value</Label>
                          <Input
                            type="text"
                            placeholder="Closing Value"
                            {...register(`items.${key}.closing_value`, {
                              required: "This is required",
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].closing_value = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.closing_value`, value);
                              },
                            })}
                            defaultValue={item.closing_value ?? undefined}
                          />
                          {errors.items?.[key]?.closing_value && (
                            <span className="error-msg">
                              {errors.items[key]?.closing_value?.message}
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

export default FurnitureAndEquipment;
