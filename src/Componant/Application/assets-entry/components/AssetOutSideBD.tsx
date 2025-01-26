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
import { useSelector } from "react-redux";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { Btn } from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import { serialPadding } from "../../../../utils/helpers";

interface PropertyItem {
  id: any;
  type: string;
  opening_balance: number;
  new_investment: number;
  withdrawal: number;
  closing_balance: number;
}

const AssetOutSideBD: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<PropertyItem[]>([
    {
      id: "",
      type: "",
      opening_balance: 0,
      new_investment: 0,
      withdrawal: 0,
      closing_balance: 0,
    },
  ]);

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

  const getchitems = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`asset-outside-bd?past_return=1`);
      const data = res.data?.map((item: any) => ({
        id: item.id,
        type: item.type,
        opening_balance: item.opening_balance,
        new_investment: item.new_investment,
        withdrawal: item.withdrawal,
        closing_balance: item.closing_balance,
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
    getchitems();
  }, []);

  const addMore = () => {
    setItems([
      ...items,
      {
        id: "",
        type: "",
        opening_balance: 0,
        new_investment: 0,
        withdrawal: 0,
        closing_balance: 0,
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
        await deleteRequest(`asset-outside-bd/${id}`)
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
    await postRequest(`asset-outside-bd`, inputArr)
        .then((res) => {
          setOpen(true);
          setSaveLoading(false);
          setMessage("Successfully Updated");
          const updatedData = res?.data?.map((item: any) => ({
            id: item.id,
            type: item.type,
            opening_balance: item.opening_balance,
            new_investment: item.new_investment,
            withdrawal: item.withdrawal,
            closing_balance: item.closing_balance,
          }));
          setItems(updatedData);
          reset({ items: updatedData });
        })
        .catch((error) => {
          setSaveLoading(false);
          console.error("Error:", error.message);
        });
  };

  let totalHeadIncome = null;
  if (watch("items")) {
    totalHeadIncome = items.reduce(
        (acc, curr) => acc + Number(curr.new_investment || 0),
        0
    );
  }

  return (
      <Col xl="9">
        <UserDetailsInformation
            title="Total AssetOutSideBD"
            totalHeadIncome={totalHeadIncome}
        />
        <Card className="profile-right">
          <CardHeaderCommon title="Assets OutSide BD" tagClass="card-title mb-0" />
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
                          {/*<Row className="fw-bold">
                                            <Col>
                                                <b>AssetOutSideBD: {serialPadding(key)} (Type, Value)</b>
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
                                        </Row>*/}
                          <Row>
                            <Col sm="4" md="4">
                              <FormGroup>
                                <Label>Type</Label>
                                <Input
                                    type="text"
                                    placeholder="Type"
                                    {...register(`items.${key}.type`, {
                                      required: "This is required",
                                      onChange: (e) => {
                                        const value = e.target.value;
                                        const updatedLands = [...items];
                                        updatedLands[key].type = value;
                                        setItems(updatedLands);
                                        setValue(`items.${key}.type`, value);
                                      },
                                    })}
                                    defaultValue={item.type}
                                />

                              </FormGroup>
                            </Col>
                            <Col sm="4" md="4">
                              <FormGroup>
                                <Label>Opening Balance</Label>
                                <Input
                                    type="number"
                                    placeholder="Opening Balance"
                                    {...register(`items.${key}.opening_balance`, {
                                      required: "This is required",
                                      onChange: (e) => {
                                        const value = e.target.value;
                                        const updatedLands = [...items];
                                        updatedLands[key].opening_balance = value;
                                        setItems(updatedLands);
                                        setValue(`items.${key}.opening_balance`, value);
                                      },
                                    })}
                                    defaultValue={item.opening_balance}
                                />
                                {errors.items?.[key]?.opening_balance && (
                                    <span className="error-msg">
                              {errors.items[key]?.opening_balance?.message}
                            </span>
                                )}
                              </FormGroup>
                            </Col>
                            <Col sm="4" md="4">
                              <FormGroup>
                                <Label>New Investment</Label>
                                <Input
                                    type="number"
                                    placeholder="New Investment"
                                    {...register(`items.${key}.new_investment`, {
                                      required: "This is required",
                                      onChange: (e) => {
                                        const value = e.target.value;
                                        const updatedLands = [...items];
                                        updatedLands[key].new_investment = value;
                                        setItems(updatedLands);
                                        setValue(`items.${key}.new_investment`, value);
                                      },
                                    })}
                                    defaultValue={item.new_investment}
                                />
                                {errors.items?.[key]?.new_investment && (
                                    <span className="error-msg">
                              {errors.items[key]?.new_investment?.message}
                            </span>
                                )}
                              </FormGroup>
                            </Col>
                            <Col sm="4" md="4">
                              <FormGroup>
                                <Label>Withdrawal/Adjustment</Label>
                                <Input
                                    type="number"
                                    placeholder="Withdrawal/Adjustment"
                                    {...register(`items.${key}.withdrawal`, {
                                      required: "This is required",
                                      onChange: (e) => {
                                        const value = e.target.value;
                                        const updatedLands = [...items];
                                        updatedLands[key].withdrawal = value;
                                        setItems(updatedLands);
                                        setValue(`items.${key}.withdrawal`, value);
                                      },
                                    })}
                                    defaultValue={item.withdrawal}
                                />
                                {errors.items?.[key]?.withdrawal && (
                                    <span className="error-msg">
                              {errors.items[key]?.withdrawal?.message}
                            </span>
                                )}
                              </FormGroup>
                            </Col>
                            <Col sm="4" md="4">
                              <FormGroup>
                                <Label>Closing Balance</Label>
                                <Input
                                    type="number"
                                    placeholder="Closing Balance"
                                    {...register(`items.${key}.closing_balance`, {
                                      required: "This is required",
                                      onChange: (e) => {
                                        const value = e.target.value;
                                        const updatedLands = [...items];
                                        updatedLands[key].closing_balance = value;
                                        setItems(updatedLands);
                                        setValue(`items.${key}.closing_balance`, value);
                                      },
                                    })}
                                    defaultValue={item.closing_balance}
                                />
                                {errors.items?.[key]?.closing_balance && (
                                    <span className="error-msg">
                              {errors.items[key]?.closing_balance?.message}
                            </span>
                                )}
                              </FormGroup>
                            </Col>
                          </Row>
                        </Fragment>
                    ))}
                    {/*<Row>
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
                                </Row>*/}
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

export default AssetOutSideBD;
