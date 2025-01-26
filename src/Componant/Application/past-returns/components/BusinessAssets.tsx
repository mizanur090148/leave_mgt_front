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
  name_of_business: string;
  type_of_business: string;
  address: string;
  total_assets: number | null;
  closing_liabilities: number | null;
}

const BusinessAssets: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const pastReturnData = useSelector((state: any) => state?.pastReturn?.pastReturnData);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<PropertyItem[]>([
    {
      id: "",
      name_of_business: "",
      type_of_business: "",
      address: "",
      total_assets: null,
      closing_liabilities: null,
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
      const res = await getRequest(`business-assets?past_return=1`);
      const data = res?.data?.map((item: any) => ({
        id: item.id,
        name_of_business: item.name_of_business,
        type_of_business: item.type_of_business,
        address: item.address,
        total_assets: item.total_assets,
        closing_liabilities: item.closing_liabilities,
      }));

      if (data?.length) {
        setItems(data);
        reset({ items: data });
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetching data:", error?.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const addMore = () => {
    setItems([
      ...items,
      {
        id: "",
        name_of_business: "",
        type_of_business: "",
        address: "",
        total_assets: null,
        closing_liabilities: null,
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
        await deleteRequest(`business-assets/${id}`)
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
      user_id: userInfo?.id,
      past_return: true,
    }));
    await postRequest(`business-assets`, inputArr)
      .then((res) => {
        setOpen(true);
        setSaveLoading(false);
        setMessage("Successfully Updated");
        const updatedData = res?.data?.map((item: any) => ({
          id: item.id,
          name_of_business: item.name_of_business,
          type_of_business: item.type_of_business,
          address: item.address,
          total_assets: item.total_assets,
          closing_liabilities: item.closing_liabilities,
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
      (acc: any, curr: any) => acc + Number(curr?.total_assets || 0) - Number(curr?.closing_liabilities || 0),
      0
    );
    const updatedState = {
      ...pastReturnData,
      businessAsset: result,
      total: pastReturnTotalData({ ...pastReturnData, businessAsset: result })
    };
    dispatch(pastReturn(updatedState));
  }

  return (
    <Col xl="9">
      <PastReturnTop
        title={"Business Assets"}
        itemName={'businessAsset'}
      />
      <Card className="profile-right">
        <CardHeaderCommon title="Business Assets" tagClass="card-title mb-0" />
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
                          Business: {serialPadding(key)} (Name, Address,
                          Capital)
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
                          <Label>Name Of Business</Label>
                          <Input
                            type="text"
                            placeholder="Name of business"
                            {...register(`items.${key}.name_of_business`, {
                              required: "This is required",
                              onChange: (e) => {
                                setValue(
                                  `items.${key}.name_of_business`,
                                  e.target.value
                                );
                              },
                            })}
                            defaultValue={item.name_of_business}
                          />
                          {errors.items?.[key]?.name_of_business && (
                            <span className="error-msg">
                              {errors.items[key]?.name_of_business?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Type Of Business</Label>
                          <Input
                            type="text"
                            placeholder="Name of business"
                            {...register(`items.${key}.type_of_business`, {
                              required: "This is required",
                              onChange: (e) => {
                                setValue(
                                  `items.${key}.type_of_business`,
                                  e.target.value
                                );
                              },
                            })}
                            defaultValue={item.type_of_business}
                          />
                          {errors.items?.[key]?.type_of_business && (
                            <span className="error-msg">
                              {errors.items[key]?.type_of_business?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="12">
                        <FormGroup>
                          <Label>Address</Label>
                          <Input
                            type="text"
                            placeholder="Address"
                            {...register(`items.${key}.address`, {
                              required: "This is required",
                              onChange: (e) => {
                                setValue(
                                  `items.${key}.address`,
                                  e.target.value
                                );
                              },
                            })}
                            defaultValue={item.address}
                          />
                          {errors.items?.[key]?.address && (
                            <span className="error-msg">
                              {errors.items[key]?.address?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Total Assets</Label>
                          <Input
                            type="number"
                            placeholder="Name of business"
                            {...register(`items.${key}.total_assets`, {
                              required: "This is required",
                              onChange: (e) => {
                                const value = +e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].total_assets = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.total_assets`,
                                  value
                                );
                              },
                            })}
                            defaultValue={item.total_assets ?? ""}
                          />
                          {errors.items?.[key]?.total_assets && (
                            <span className="error-msg">
                              {errors.items[key]?.total_assets?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Closing Liabilities</Label>
                          <Input
                            type="number"
                            placeholder="Closing liabilities"
                            {...register(`items.${key}.closing_liabilities`, {
                              required: "This is required",
                              onChange: (e) => {
                                const value = +e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].closing_liabilities = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.closing_liabilities`,
                                  value
                                );
                              },
                              validate: (value) => {
                                const numericValue = value ?? 0;
                                const totalAssets = watch(`items.${key}.total_assets`) ?? 0;
                                return (
                                  numericValue <= totalAssets ||
                                  "Value must be less than or equal to total assets"
                                );
                              },
                            })}
                            defaultValue={item.closing_liabilities ?? ""}
                          />
                          {errors.items?.[key]?.closing_liabilities && (
                            <span className="error-msg">
                              {errors.items[key]?.closing_liabilities?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Closing Capital</Label>
                          <Input
                            type="text"
                            placeholder="Closing capital"
                            // {...register(`items.${key}.closing_capital`, {
                            //   required: "This is required",
                            //   onChange: (e) => {
                            //     const value = +e.target.value;
                            //     const updatedLands = [...items];
                            //     updatedLands[key].closing_capital = value;
                            //     setItems(updatedLands);
                            //     setValue(
                            //       `items.${key}.closing_capital`,
                            //       value
                            //     );
                            //   },
                            // })}
                            disabled
                            value={Number(item?.total_assets || 0) - Number(item?.closing_liabilities || 0)}
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

export default BusinessAssets;
