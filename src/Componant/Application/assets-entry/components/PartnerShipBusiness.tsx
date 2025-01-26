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
import { assetEntryTotalData, serialPadding } from "../../../../utils/helpers";
import { assetEntry } from "../../../../Store/Slices/PastReturnTotalSlice";
import AssetEntryTop from "./AssetEntryTop";

interface PropertyItem {
  id: any;
  name_of_business: string;
  address: string;
  closing_capital: number;
  business_etin: string;
}

const PartnerShipBusiness: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const assetEntryData = useSelector((state: any) => state?.pastReturn?.assetEntryData);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<PropertyItem[]>([
    {
      id: "",
      name_of_business: "",
      address: "",
      closing_capital: 0,
      business_etin: '',
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
        name_of_business: "",
        address: "",
        closing_capital: 0,
        business_etin: '',
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
        await deleteRequest(`partnership-business/${id}`)
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
      user_id: userInfo.id
    }));
    await postRequest(`partnership-business`, inputArr)
      .then((res) => {
        setOpen(true);
        setSaveLoading(false);
        setMessage("Successfully Updated");
        const updatedData = res?.data?.map((item: any) => ({
          id: item.id,
          name_of_business: item.name_of_business,
          address: item.address,
          closing_capital: item.closing_capital,
          business_etin: item.business_etin,
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
      const res = await getRequest(`partnership-business`);
      const data = res.data?.map((item: any) => ({
        id: item.id,
        name_of_business: item.name_of_business,
        address: item.address,
        closing_capital: item.closing_capital,
        business_etin: item.business_etin,
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

  useEffect(() => {
    getItems();
  }, []);

  // let totalHeadIncome = null;
  // if (watch("items")) {
  //   totalHeadIncome = items.reduce(
  //       (acc, curr) => acc + Number(curr.closing_capital || 0),
  //       0
  //   );
  // }

  const updateHeadData = (updatedData: any) => {
    const result = updatedData?.reduce(
      (acc: any, curr: any) => acc + Number(curr?.closing_capital || 0),
      0
    );
    const updatedState = {
      ...assetEntryData,
      partnershipBusiness: result,
      total: assetEntryTotalData({ ...assetEntryData, partnershipBusiness: result })
    };
    dispatch(assetEntry(updatedState));
  }

  return (
    <Col xl="9">
      <AssetEntryTop
        title="Total Closing Capital"
        itemName={'partnershipBusiness'}
      />
      <Card className="profile-right">
        <CardHeaderCommon title="Partnership Business" tagClass="card-title mb-0" />
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
                          Business: {serialPadding(key)} (Name, Address, Capital)
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
                            placeholder="Name Of Business"
                            {...register(`items.${key}.name_of_business`, {
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].name_of_business = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.name_of_business`, value);
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
                          <Label>Business ETIN</Label>
                          <Input
                            type="text"
                            placeholder="Business ETIN"
                            {...register(`items.${key}.business_etin`, {
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].business_etin = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.business_etin`, value);
                              },
                            })}
                            defaultValue={item.business_etin}
                          />
                          {errors.items?.[key]?.business_etin && (
                            <span className="error-msg">
                              {errors.items[key]?.business_etin?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>

                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Closing Capital</Label>
                          <Input
                            type="number"
                            placeholder="Closing Capital"
                            {...register(
                              `items.${key}.closing_capital`,
                              {
                                required: "Location of Property is required",
                                onChange: (e) => {
                                  const value = e.target.value;
                                  const updatedLands = [...items];
                                  updatedLands[key].closing_capital =
                                    value;
                                  setItems(updatedLands);
                                  setValue(
                                    `items.${key}.closing_capital`,
                                    value
                                  );
                                },
                              }
                            )}
                            defaultValue={item.closing_capital}
                          />
                          {errors.items?.[key]?.closing_capital && (
                            <span className="error-msg">
                              {
                                errors.items[key]?.closing_capital
                                  ?.message
                              }
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="12">
                        <FormGroup>
                          <Label>Address</Label>
                          <Input
                            type="text"
                            placeholder="Address"
                            {...register(`items.${key}.address`, {
                              required: "This is required",
                              onChange: (e) => {
                                const value = e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].address = value;
                                setItems(updatedLands);
                                setValue(`items.${key}.address`, value);
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

export default PartnerShipBusiness;
