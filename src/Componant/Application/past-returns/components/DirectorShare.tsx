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
  name_of_company: string;
  incorporation_no: string;
  incorporation_date: string | null;
  closing_no_of_shares: number | null;
  cost_per_share: number | null;
}

const DirectorShare: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const pastReturnData = useSelector((state: any) => state?.pastReturn?.pastReturnData);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<PropertyItem[]>([
    {
      id: "",
      name_of_company: "",
      incorporation_no: "",
      incorporation_date: null,
      closing_no_of_shares: null,
      cost_per_share: null,
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
      const res = await getRequest(`directory-shares?past_return=1`);
      const data = res?.data?.map((item: any) => ({
        id: item.id,
        name_of_company: item.name_of_company,
        incorporation_no: item.incorporation_no,
        incorporation_date: item.incorporation_date,
        closing_no_of_shares: item.closing_no_of_shares,
        cost_per_share: item.cost_per_share,
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
        name_of_company: "",
        incorporation_no: "",
        incorporation_date: "",
        closing_no_of_shares: null,
        cost_per_share: null,
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
        await deleteRequest(`directory-shares/${id}`)
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
    await postRequest(`directory-shares`, inputArr)
      .then((res) => {
        setOpen(true);
        setSaveLoading(false);
        setMessage("Successfully Updated");
        const updatedData = res?.data?.map((item: any) => ({
          id: item.id,
          name_of_company: item.name_of_company,
          incorporation_no: item.incorporation_no,
          incorporation_date: item.incorporation_date,
          closing_no_of_shares: item.closing_no_of_shares,
          cost_per_share: item.cost_per_share,
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

  let totalHeadIncome = 0;
  if (watch("items")) {
    totalHeadIncome = items.reduce(
      (acc, curr) => acc + Number(curr.closing_no_of_shares || 0) * Number(curr.cost_per_share || 0),
      0
    );
  }

  const updateHeadData = (updatedData: any) => {
    const result = updatedData?.reduce(
      (acc: any, curr: any) => acc + Number(curr.closing_no_of_shares || 0) * Number(curr.cost_per_share || 0),
      0
    );
    const updatedState = {
      ...pastReturnData,
      directoryShare: result,
      total: pastReturnTotalData({ ...pastReturnData, directoryShare: result })
    };
    dispatch(pastReturn(updatedState));
  }

  return (
    <Col xl="9">
      <PastReturnTop
        title={"Director Share In Limited Company"}
        itemName={'directoryShare'}
      />
      <Card className="profile-right">
        <CardHeaderCommon
          title="Director Share In Limited Company"
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
                          Company: {serialPadding(key)} (Name, No of Share,
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
                          <Label>Name Of Company</Label>
                          <Input
                            type="text"
                            placeholder="Name of company"
                            {...register(`items.${key}.name_of_company`, {
                              required: "This is required",
                              onChange: (e) => {
                                setValue(
                                  `items.${key}.name_of_company`,
                                  e.target.value
                                );
                              },
                            })}
                            defaultValue={item.name_of_company}
                          />
                          {errors.items?.[key]?.name_of_company && (
                            <span className="error-msg">
                              {errors.items[key]?.name_of_company?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Incorporation No</Label>
                          <Input
                            type="text"
                            placeholder="Incorporation No"
                            {...register(`items.${key}.incorporation_no`, {
                              required: "This is required",
                              onChange: (e) => {
                                setValue(
                                  `items.${key}.incorporation_no`,
                                  e.target.value
                                );
                              },
                            })}
                            defaultValue={item.incorporation_no}
                          />
                          {errors.items?.[key]?.incorporation_no && (
                            <span className="error-msg">
                              {errors.items[key]?.incorporation_no?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Incorporation date</Label>
                          <Input
                            type="date"
                            {...register(`items.${key}.incorporation_date`, {
                              onChange: (e) => {
                                setValue(`items.${key}.incorporation_date`, e.target.value);
                              },
                            })}
                            defaultValue={item?.incorporation_date || ""}
                          />
                          {/* {errors.items?.[key]?.incorporation_date && (
                            <span className="error-msg">
                              {errors.items[key].incorporation_date.message}
                            </span>
                          )} */}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Closing no of Shares</Label>
                          <Input
                            type="number"
                            placeholder="Closing no of shares"
                            {...register(`items.${key}.closing_no_of_shares`, {
                              required: "This is required",
                              onChange: (e) => {
                                const value = +e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].closing_no_of_shares = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.closing_no_of_shares`,
                                  value
                                );
                              },
                            })}
                            defaultValue={
                              item.closing_no_of_shares ?? undefined
                            }
                          />
                          {errors.items?.[key]?.closing_no_of_shares && (
                            <span className="error-msg">
                              {errors.items[key]?.closing_no_of_shares?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Cost per Share</Label>
                          <Input
                            type="number"
                            placeholder="Cost per Share"
                            {...register(`items.${key}.cost_per_share`, {
                              required: "This is required",
                              onChange: (e) => {
                                const value = +e.target.value;
                                const updatedLands = [...items];
                                updatedLands[key].cost_per_share = value;
                                setItems(updatedLands);
                                setValue(
                                  `items.${key}.cost_per_share`,
                                  value
                                );
                              },
                            })}
                            defaultValue={item.cost_per_share ?? undefined}
                          />
                          {errors.items?.[key]?.cost_per_share && (
                            <span className="error-msg">
                              {errors.items[key]?.cost_per_share?.message}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Total Closing Value</Label>
                          <Input
                            type="text"
                            disabled
                            placeholder="Total Closing Value"
                            value={Number(item?.closing_no_of_shares || 0) * Number(item?.cost_per_share || 0)}
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

export default DirectorShare;
