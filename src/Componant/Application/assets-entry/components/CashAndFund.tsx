import React, { Fragment, useEffect, useState } from "react";
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
import { propertyTypes, serialPadding } from "../../../../utils/helpers";

interface PropertyItem {
  id: string;
  type: string;
  ac_type: string;
  account_no: string;
  bank_name?: string;
  opening_balance: string;
  deposit: string;
  withdraw: string;
  type_of_fund: string;
  closing_balance?: string;
}

const CASH_FUND_TYPES = ["cash_at_bank", "other_cash", "cash_in_hand"];
const AC_TYPES = [
  { id: "current_account", name: "Current Account" },
  { id: "snd_account", name: "SND Account" },
  { id: "savings_account", name: "Savings Account" },
  { id: "joint_account", name: "Joint Account" },
  { id: "rfcd_account", name: "RFCD Account" },
  { id: "erq_account", name: "ERQ Account" },
];

const FUND_TYPES = [
  { id: "foreign_currency", name: "Foreign Currency" },
  { id: "prize_bond", name: "Prize Bond" },
  { id: "others", name: "Others" },
];

const CashAndFund = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<PropertyItem[]>(
    CASH_FUND_TYPES.map((type) => ({
      id: "",
      type,
      ac_type: "",
      type_of_fund: "",
      account_no: "",
      bank_name: "",
      opening_balance: "",
      deposit: "",
      withdraw: "",
      closing_balance: "",
    }))
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<{ items: PropertyItem[] }>({
    defaultValues: { items },
  });

  console.log(errors, "errors");

  const getData = async () => {
    setLoading(true);
    await getRequest(`cash-and-funds`)
      .then((res: any) => {
        const data = res.data?.map((item: any) => ({
          id: item.id,
          type: item.type,
          ac_type: item.ac_type,
          type_of_fund: item.type_of_fund,
          account_no: item.account_no,
          bank_name: item.bank_name,
          opening_balance: item.opening_balance,
          deposit: item.deposit,
          withdraw: item.withdraw,
          closing_balance: item.closing_balance,
        }));
        if (data?.length) {
          setItems(data);
          reset({ items: data });
        }
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        console.error("Error fetching data:", error.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit: SubmitHandler<{ items: PropertyItem[] }> = async (data) => {
    setSaveLoading(true);
    const inputArr = data.items.map((item) => ({
      ...item,
      user_id: userInfo.id,
    }));
    try {
      const res = await postRequest(`cash-and-funds`, inputArr);
      setOpen(true);
      setSaveLoading(false);
      setMessage("Successfully Updated");
      const updatedData = res.data?.map((item: any) => ({
        id: item.id,
        type: item.type,
        ac_type: item.ac_type,
        type_of_fund: item.type_of_fund,
        account_no: item.account_no,
        bank_name: item.bank_name,
        opening_balance: item.opening_balance,
        deposit: item.deposit,
        withdraw: item.withdraw,
        closing_balance: item.closing_balance,
      }));
      setItems(updatedData);
      reset({ items: updatedData });
    } catch (error: any) {
      setSaveLoading(false);
      console.error("Error:", error.message);
    }
  };

  const addMore = (type: string) => {
    const newItem = {
      id: "",
      type: type,
      ac_type: "",
      type_of_fund: "",
      account_no: "",
      bank_name: "",
      opening_balance: "",
      deposit: "",
      withdraw: "",
      closing_balance: "",
    };
    const updatedData = [...items, newItem];
    setItems(updatedData);
    // Register the new item dynamically
    const newIndex = updatedData.length - 1;
    setValue(`items.${newIndex}.id`, "");
    setValue(`items.${newIndex}.type`, type);
    setValue(`items.${newIndex}.ac_type`, "");
    setValue(`items.${newIndex}.type_of_fund`, "");
    setValue(`items.${newIndex}.account_no`, "");
    setValue(`items.${newIndex}.bank_name`, "");
    setValue(`items.${newIndex}.opening_balance`, "");
    setValue(`items.${newIndex}.deposit`, "");
    setValue(`items.${newIndex}.withdraw`, "");
    setValue(`items.${newIndex}.closing_balance`, "");
  };

  const deleteAction = async (id: any, type: string, index: any) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmation) {
      const updatedData = [...items];
      if (id) {
        await deleteRequest(`cash-and-funds/${id}`)
          .then((res) => {
            const newItems = updatedData.filter((item) => item.id !== id);
            setItems([...newItems]);
            if (newItems.length === 0) {
              getData();
            }
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

  const getTitle = (type: string, key: number) => {
    switch (type) {
      case "cash_at_bank":
        return `Cash At Bank: ${serialPadding(key)} (A/C Type, Balance)`;
      case "other_cash":
        return `Other Cash: ${serialPadding(key)} (Type, Balance)`;
      case "cash_in_hand":
        return `Cash In Hand`;
      default:
        return "";
    }
  };

  let totalHeadIncome = null;
  if (watch("items")) {
    totalHeadIncome = items.reduce(
      (acc, curr) => acc + Number(curr.closing_balance || 0),
      0
    );
  }

  return (
    <Col xl="9">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <UserDetailsInformation
          title="Total Cash and Fund"
          totalHeadIncome={totalHeadIncome}
        />
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Cash & Fund"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            {loading ? (
              <Loader loading={loading} />
            ) : (
              <>
                {open && message && (
                  <ToastCustom
                    message={message}
                    open={open}
                    setOpen={setOpen}
                  />
                )}
                {CASH_FUND_TYPES.map((type) => (
                  <div key={type}>
                    {items
                      .map((item, index) => ({ ...item, index }))
                      .filter((item) => item.type === type)
                      .map((item, key) => (
                        <Fragment key={item.index}>
                          <Row>
                            <Col>
                              <b>{getTitle(type, key)}</b>
                            </Col>
                            <Col className="text-end">
                              {((item.id && key > 0) || key > 0) && (
                                <i
                                  className="fa fa-times-circle text-danger pointer"
                                  onClick={() =>
                                    deleteAction(item?.id, type, item.index)
                                  }
                                />
                              )}
                            </Col>
                          </Row>
                          <Row>
                            {type === "cash_at_bank" && (
                              <>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>A/C Type</Label>
                                    <Input
                                      style={{ padding: "6px 10px" }}
                                      type="select"
                                      bsSize="sm"
                                      className="form-select select-custom"
                                      {...register(
                                        `items.${item.index}.ac_type`
                                      )}
                                      value={items[item.index].ac_type}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        const updatedLands = [...items];
                                        updatedLands[item.index].ac_type =
                                          value;
                                        setItems(updatedLands);
                                        setValue(
                                          `items.${item.index}.ac_type`,
                                          value
                                        ); // Update the form value
                                      }}
                                    >
                                      <option value="">Select One</option>
                                      {AC_TYPES.map((data: any, key) => (
                                        <option key={key} value={data.id}>
                                          {data.name}
                                        </option>
                                      ))}
                                    </Input>
                                    {errors.items?.[item.index]?.ac_type && (
                                      <span className="error-msg">
                                        {
                                          errors.items[item.index]?.ac_type
                                            ?.message
                                        }
                                      </span>
                                    )}
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>A/C No</Label>
                                    <Input
                                      bsSize="sm"
                                      {...register(
                                        `items.${item.index}.account_no`,
                                        {
                                          required: "Account No is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.account_no`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.account_no}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Bank Name</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.bank_name`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.bank_name`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.bank_name}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Opening Balance</Label>
                                    {item?.id && item?.opening_balance ? (
                                      <Input
                                        bsSize="sm"
                                        defaultValue={item?.opening_balance}
                                        disabled
                                      />
                                    ) : (
                                      <Input
                                        bsSize="sm"
                                        placeholder="Opening Balance"
                                        {...register(
                                          `items.${item.index}.opening_balance`,
                                          {
                                            //required: "Opening Balance is required",
                                            onChange: (e) => {
                                              setValue(
                                                `items.${item.index}.opening_balance`,
                                                e.target.value
                                              );
                                            },
                                          }
                                        )}
                                        defaultValue={item.opening_balance}
                                      />
                                    )}
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Deposit</Label>
                                    {item?.id && item?.deposit ? (
                                      <Input
                                        bsSize="sm"
                                        defaultValue={item?.deposit}
                                        disabled
                                      />
                                    ) : (
                                      <Input
                                        bsSize="sm"
                                        placeholder="Deposit"
                                        {...register(
                                          `items.${item.index}.deposit`,
                                          {
                                            //required: "Opening Balance is required",
                                            onChange: (e) => {
                                              setValue(
                                                `items.${item.index}.deposit`,
                                                e.target.value
                                              );
                                            },
                                          }
                                        )}
                                        defaultValue={item.opening_balance}
                                      />
                                    )}
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Withdraw</Label>
                                    <Input
                                      bsSize="sm"
                                      placeholder="Withdraw"
                                      {...register(
                                        `items.${item.index}.withdraw`,
                                        {
                                          //required: "Opening Balance is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.withdraw`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.withdraw}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Closing Balance</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.closing_balance`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.closing_balance`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.closing_balance}
                                    />
                                  </FormGroup>
                                </Col>
                              </>
                            )}
                            {type === "other_cash" && (
                              <Fragment>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Type of Fund</Label>
                                    <Input
                                      style={{ padding: "6px 10px" }}
                                      type="select"
                                      bsSize="sm"
                                      className="form-select select-custom"
                                      {...register(
                                        `items.${item.index}.type_of_fund`
                                      )}
                                      value={items[item.index].type_of_fund}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        const updatedLands = [...items];
                                        updatedLands[item.index].type_of_fund =
                                          value;
                                        setItems(updatedLands);
                                        setValue(
                                          `items.${item.index}.type_of_fund`,
                                          value
                                        ); // Update the form value
                                      }}
                                    >
                                      <option value="">Select One</option>
                                      {FUND_TYPES.map((data: any, index) => (
                                        <option key={index} value={data.id}>
                                          {data.name}
                                        </option>
                                      ))}
                                    </Input>
                                    {errors.items?.[item.index]
                                      ?.type_of_fund && (
                                      <span className="error-msg">
                                        {
                                          errors.items[item.index]?.type_of_fund
                                            ?.message
                                        }
                                      </span>
                                    )}
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Opening Balance</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.closing_balance`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.closing_balance`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.closing_balance}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Addition</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.closing_balance`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.closing_balance`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.closing_balance}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Sale/Liquidation</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.closing_balance`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.closing_balance`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.closing_balance}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Closing Balance</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.closing_balance`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.closing_balance`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.closing_balance}
                                    />
                                  </FormGroup>
                                </Col>
                              </Fragment>
                            )}
                            {type === "cash_in_hand" && (
                              <Fragment>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Opening Balance</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.closing_balance`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.closing_balance`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.closing_balance}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Addition</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.closing_balance`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.closing_balance`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.closing_balance}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Withdrawal/Adjustment</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.closing_balance`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.closing_balance`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.closing_balance}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm="4" md="4">
                                  <FormGroup>
                                    <Label>Closing Balance</Label>
                                    <Input
                                      bsSize="sm"
                                      //placeholder="Closing Amount"
                                      {...register(
                                        `items.${item.index}.closing_balance`,
                                        {
                                          //required: "Closing Amount is required",
                                          onChange: (e) => {
                                            setValue(
                                              `items.${item.index}.closing_balance`,
                                              e.target.value
                                            );
                                          },
                                        }
                                      )}
                                      defaultValue={item.closing_balance}
                                    />
                                  </FormGroup>
                                </Col>
                              </Fragment>
                            )}
                          </Row>
                        </Fragment>
                      ))}
                    {type !== "cash_in_hand" && (
                      <Row>
                        <Col>
                          <Btn
                            className="btn-full mb-2"
                            color="outline-info"
                            type="button"
                            onClick={() => addMore(type)}
                          >
                            Add More <i className="fa fa-plus-circle pl-2"></i>
                          </Btn>
                        </Col>
                      </Row>
                    )}
                  </div>
                ))}
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
              </>
            )}
          </CardBody>
          <CardFooter className="text-end"></CardFooter>
        </Card>
      </Form>
    </Col>
  );
};

export default CashAndFund;
