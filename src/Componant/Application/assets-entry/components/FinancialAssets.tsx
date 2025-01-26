import React, {Fragment, useEffect, useState} from "react";
import {Card, CardBody, CardFooter, Col, Form, FormGroup, Input, Label, Row,} from "reactstrap";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {deleteRequest, getRequest, postRequest,} from "../../../../utils/axiosRequests";
import {Btn} from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import {serialPadding} from "../../../../utils/helpers";

interface PropertyItem {
  id: string;
  type: string;
  account_no: string;
  opening_value: string;
  new_purchase: string;
  sale: string;
  gain_or_loss: string;
  new_loan: string;
  recovered_amount: string;
  fdr_no: string;
  new_fdr: string;
  encashment: string;
  net_interest: string;
  new_contribution: string;
  net_income: string;
  closing_amount: string;
  name_of_person?: string;
  etin_no?: string;
  asset_type?: string;
}

const types = [
  "shares",
  "savings",
  "loan_given",
  "fixed_deposit",
  "pf_or_other",
  "other",
];

const SECONDARY_MARKET = [
  {id: "share_from_ipo", name: "Share From IPO"},
  {id: "shares_of_secondary_market", name: "Shares of Secondary Market"},
  {id: "shares_of_systematic_investment_scheme", name: "Shares of Systematic Investment Scheme"},
  {id: "debenture-or_bond", name: "Debenture/Bond"},
  {id: "securities-or_unit_certificate", name: "Securities/Unit Certificate"},
  {id: "erq_account", name: "ERQ Account"},
];

const SAVINGS_CERTIFICATE = [
  {id: "savings_certificate", name: "Savings Certificate (Sanchaypatra)"},
  {id: "mutual_fund", name: "Mutual Fund"},
  {id: "joint_investment_scheme", name: "Joint Investment Scheme"},
];
const FIXED_DEPOSIT = [
  {id: "life_lnsurance", name: "Life Insurance"},
  {id: "dps_mss", name: "DPS/MSS"},
  {id: "fixed_term_deposits", name: "Fixed/Term Deposits"},
];
const PF_OTHERFUND = [
  {id: "contribution_to_pf", name: "Contribution to PF"},
  {id: "self_contribution_to_recognised_pf", name: "Self Contribution to Recognised PF"},
  {id: "employer_contribution_to_recognised_pf", name: "Employer Contribution to Recognised PF"},
  {id: "contribution_to_super_annuation_fund", name: "Contribution to Super Annuation Fund"},
  {id: "contribution_to_benevolent_fund", name: "Contribution to Benevolent Fund"},
  {id: "contribution_to_group_insurance_premium", name: "Contribution to Group Insurance Premium"},
];
const OTHER_INVESTMENT = [
  {id: "contribution_to_approved_zakat_fund", name: "Contribution to Approved Zakat Fund"},
  {id: "contribution_to_any_other_nbr_approved_fund", name: "Contribution to any other NBR Approved Fund"},
  {id: "any_other_investment", name: "Any Other Investment"},
];

const FinancialAssets = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<PropertyItem[]>(
      types.map((type) => ({
        id: "",
        type,
        account_no: "",
        closing_amount: "",
        opening_value: "",
        new_purchase: "",
        sale: "",
        gain_or_loss: "",
        new_loan: "",
        recovered_amount: "",
        fdr_no: "",
        new_fdr: "",
        encashment: "",
        net_interest: "",
        new_contribution: "",
        net_income: "",
        name_of_person: "",
        etin_no: "",
        asset_type: "",
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
    await getRequest(`financial-assets?past_return=1`)
        .then((res: any) => {
          const data = res.data?.map((item: any) => ({
            id: item.id,
            type: item.type,
            account_no: item.account_no,
            closing_amount: item.closing_amount,
            opening_value: item.opening_value,
            new_purchase: item.new_purchase,
            sale: item.sale,
            gain_or_loss: item.gain_or_loss,
            new_loan: item.new_loan,
            recovered_amount: item.recovered_amount,
            fdr_no: item.fdr_no,
            new_fdr: item.new_fdr,
            encashment: item.encashment,
            net_interest: item.net_interest,
            new_contribution: item.new_contribution,
            net_income: item.net_income,
            name_of_person: item.name_of_person,
            etin_no: item.etin_no,
            asset_type: item.asset_type,
          }));
          if (data?.length) {
            setItems(data);
            reset({items: data});
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
      past_return: true,
    }));
    try {
      const res = await postRequest(`financial-assets`, inputArr);
      setOpen(true);
      setSaveLoading(false);
      setMessage("Successfully Updated");
      const updatedData = res.data?.map((item: any) => ({
        id: item.id,
        type: item.type,
        account_no: item.account_no,
        closing_amount: item.closing_amount,
        opening_value: item.opening_value,
        new_purchase: item.new_purchase,
        sale: item.sale,
        gain_or_loss: item.gain_or_loss,
        new_loan: item.new_loan,
        recovered_amount: item.recovered_amount,
        fdr_no: item.fdr_no,
        new_fdr: item.new_fdr,
        encashment: item.encashment,
        net_interest: item.net_interest,
        new_contribution: item.new_contribution,
        net_income: item.net_income,
        name_of_person: item.name_of_person,
        etin_no: item.etin_no,
        asset_type: item.asset_type,
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
      account_no: "",
      closing_amount: "",
      opening_value: "",
      new_purchase: "",
      sale: "",
      gain_or_loss: "",
      new_loan: "",
      recovered_amount: "",
      fdr_no: "",
      new_fdr: "",
      encashment: "",
      net_interest: "",
      new_contribution: "",
      net_income: "",
      name_of_person: "",
      etin_no: "",
      asset_type: "",
    };
    const updatedData = [...items, newItem];
    setItems(updatedData);
    // Register the new item dynamically
    const newIndex = updatedData.length - 1;
    setValue(`items.${newIndex}.id`, "");
    setValue(`items.${newIndex}.type`, type);
    setValue(`items.${newIndex}.account_no`, "");
    setValue(`items.${newIndex}.closing_amount`, "");
    setValue(`items.${newIndex}.new_purchase`, "");
    setValue(`items.${newIndex}.sale`, "");
    setValue(`items.${newIndex}.gain_or_loss`, "");
    setValue(`items.${newIndex}.new_loan`, "");
    setValue(`items.${newIndex}.recovered_amount`, "");
    setValue(`items.${newIndex}.fdr_no`, "");
    setValue(`items.${newIndex}.new_fdr`, "");
    setValue(`items.${newIndex}.encashment`, "");
    setValue(`items.${newIndex}.net_interest`, "");
    setValue(`items.${newIndex}.new_contribution`, "");
    setValue(`items.${newIndex}.net_income`, "");
    setValue(`items.${newIndex}.name_of_person`, "");
    setValue(`items.${newIndex}.etin_no`, "");
    setValue(`items.${newIndex}.asset_type`, "");
  };

  const deleteAction = async (id: any, type: string, index: any) => {
    const confirmation = window.confirm(
        "Are you sure you want to delete this item?"
    );
    if (confirmation) {
      const updatedData = [...items];
      if (id) {
        await deleteRequest(`financial-assets/${id}`)
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
      case "shares":
        return `Shares from Capital Market: ${serialPadding(key)} (Value)`;
      case "savings":
        return `Investment in Govt. Securities: ${serialPadding(key)} (Amount)`;
      case "loan_given":
        return `Loan Given:  ${serialPadding(key)} (Amount)`;
      case "fixed_deposit":
        return `Investment in Savings Scheme: ${serialPadding(key)} (Amount)`;
      case "pf_or_other":
        return `Investment in Retirement Plan: ${serialPadding(key)} (Amount)`;
      case "other":
        return `Other Investment: ${serialPadding(key)} (Amount)`;
      default:
        return "";
    }
  };

  let totalHeadIncome = null;
  if (watch("items")) {
    totalHeadIncome = items.reduce(
        (acc, curr) => acc + Number(curr.closing_amount || 0),
        0
    );
  }

  return (
      <Col xl="9">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <UserDetailsInformation
              title="Financial Assets"
              totalHeadIncome={totalHeadIncome}
          />
          <Card className="profile-right">
            <CardHeaderCommon
                title={"Financial Assets"}
                tagClass={"card-title mb-0"}
            />
            <CardBody>
              {loading ? (
                  <Loader loading={loading}/>
              ) : (
                  <>
                    {open && message && (
                        <ToastCustom
                            message={message}
                            open={open}
                            setOpen={setOpen}
                        />
                    )}
                    {types.map((type) => (
                        <div key={type}>
                          {items
                              .map((item, index) => ({...item, index}))
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
                                      {type === "shares" && (
                                          <>
                                            <Col sm="12" md="12">
                                              <FormGroup>
                                                <Input
                                                    style={{padding: "6px 10px"}}
                                                    type="select"
                                                    bsSize="sm"
                                                    className="form-select select-custom"
                                                    {...register(
                                                        `items.${item.index}.asset_type`
                                                    )}
                                                    value={items[item.index].asset_type}
                                                    onChange={(e) => {
                                                      const value = e.target.value;
                                                      const updatedLands = [...items];
                                                      updatedLands[item.index].asset_type =
                                                          value;
                                                      setItems(updatedLands);
                                                      setValue(
                                                          `items.${item.index}.asset_type`,
                                                          value
                                                      ); // Update the form value
                                                    }}
                                                >
                                                  <option value="">Select One</option>
                                                  {SECONDARY_MARKET.map((data: any, key) => (
                                                      <option key={key} value={data.id}>
                                                        {data.name}
                                                      </option>
                                                  ))}
                                                </Input>
                                                {errors.items?.[item.index]?.asset_type && (
                                                    <span className="error-msg">
                                        {
                                          errors.items[item.index]?.asset_type
                                              ?.message
                                        }
                                      </span>
                                                )}
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>BO/Account ID</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.account_no`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.account_no`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.account_no}
                                                    disabled={!!item.account_no}

                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Opening Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.opening_value`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.opening_value`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.opening_value}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>New Purchase</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.new_purchase`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.new_purchase`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.new_purchase}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Sale</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.sale`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.sale`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.sale}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Gain/Loss</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.gain_or_loss`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.gain_or_loss`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.gain_or_loss}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Closing Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    //placeholder="Closing Amount"
                                                    {...register(
                                                        `items.${item.index}.closing_amount`,
                                                        {
                                                          //required: "Closing Amount is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.closing_amount`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.closing_amount}
                                                    disabled={!!item.closing_amount}

                                                />
                                              </FormGroup>
                                            </Col>
                                          </>
                                      )}
                                      {type === "savings" && (
                                          <>
                                            <Col sm="12" md="12">
                                              <FormGroup>
                                                <Input
                                                    style={{padding: "6px 10px"}}
                                                    type="select"
                                                    bsSize="sm"
                                                    className="form-select select-custom"

                                                    {...register(
                                                        `items.${item.index}.asset_type`
                                                    )}
                                                    value={items[item.index].asset_type}
                                                    onChange={(e) => {
                                                      const value = e.target.value;
                                                      const updatedLands = [...items];
                                                      updatedLands[item.index].asset_type =
                                                          value;
                                                      setItems(updatedLands);
                                                      setValue(
                                                          `items.${item.index}.asset_type`,
                                                          value
                                                      ); // Update the form value
                                                    }}
                                                >
                                                  <option value="">Select One</option>
                                                  {SAVINGS_CERTIFICATE.map((data: any, index) => (
                                                      <option key={index} value={data.id}>
                                                        {data.name}
                                                      </option>
                                                  ))}
                                                </Input>
                                                {errors.items?.[item.index]?.asset_type && (
                                                    <span className="error-msg">
                                      {
                                        errors.items[item.index]?.asset_type
                                            ?.message
                                      }
                                    </span>
                                                )}
                                              </FormGroup>
                                            </Col>

                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>A/C</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.account_no`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.account_no`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.account_no}
                                                    disabled={!!item.account_no}

                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Opening Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.opening_value`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.opening_value`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.opening_value}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>New Purchase</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.new_purchase`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.new_purchase`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.new_purchase}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Sale</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.sale`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.sale`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.sale}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Gain/Loss</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.gain_or_loss`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.gain_or_loss`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.gain_or_loss}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Closing Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    //placeholder="Closing Amount"
                                                    {...register(
                                                        `items.${item.index}.closing_amount`,
                                                        {
                                                          //required: "Closing Amount is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.closing_amount`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.closing_amount}
                                                    disabled={!!item.closing_amount}
                                                />
                                              </FormGroup>
                                            </Col>
                                          </>

                                      )}
                                      {type === "loan_given" && (
                                          <>

                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Name Of Person</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.name_of_person`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.name_of_person`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.name_of_person}
                                                    disabled={!!item.name_of_person}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>ETIN NO</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.etin_no`,
                                                        {
                                                          //required: "Closing Amount is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.etin_no`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.etin_no}
                                                    disabled={!!item.etin_no}
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Opening Amount</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.opening_value`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.opening_value`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.opening_value}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>New Loan</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.new_loan`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.new_loan`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.new_loan}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Recovered Amount</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.recovered_amount`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.recovered_amount`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.recovered_amount}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Closing Amount</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.closing_amount`,
                                                        {
                                                          //required: "Closing Amount is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.closing_amount`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.closing_amount}
                                                    disabled={!!item.closing_amount}

                                                />
                                              </FormGroup>
                                            </Col>
                                          </>
                                      )}

                                      {type === "fixed_deposit" && (
                                          <>
                                            <Col sm="12" md="12">
                                              <FormGroup>
                                                <Input
                                                    style={{padding: "6px 10px"}}
                                                    type="select"
                                                    bsSize="sm"
                                                    className="form-select select-custom"

                                                    {...register(
                                                        `items.${item.index}.asset_type`
                                                    )}
                                                    value={items[item.index].asset_type}
                                                    onChange={(e) => {
                                                      const value = e.target.value;
                                                      const updatedLands = [...items];
                                                      updatedLands[item.index].asset_type =
                                                          value;
                                                      setItems(updatedLands);
                                                      setValue(
                                                          `items.${item.index}.asset_type`,
                                                          value
                                                      ); // Update the form value
                                                    }}
                                                >
                                                  <option value="">Select One</option>
                                                  {FIXED_DEPOSIT.map((data: any, index) => (
                                                      <option key={index} value={data.id}>
                                                        {data.name}
                                                      </option>
                                                  ))}
                                                </Input>
                                                {errors.items?.[item.index]?.asset_type && (
                                                    <span className="error-msg">
                                      {
                                        errors.items[item.index]?.asset_type
                                            ?.message
                                      }
                                    </span>
                                                )}
                                              </FormGroup>
                                            </Col>

                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>FDR No</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.fdr_no`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.fdr_no`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.fdr_no}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Opening Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.opening_value`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.opening_value`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.opening_value}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>New FDR</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.new_fdr`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.new_fdr`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.new_fdr}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Encashment</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.encashment`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.encashment`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.encashment}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Net Interest</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.net_interest`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.net_interest`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.net_interest}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Closing Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    //placeholder="Closing Amount"
                                                    {...register(
                                                        `items.${item.index}.closing_amount`,
                                                        {
                                                          //required: "Closing Amount is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.closing_amount`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.closing_amount}
                                                    disabled={!!item.closing_amount}

                                                />
                                              </FormGroup>
                                            </Col>
                                          </>

                                      )}

                                      {type === "pf_or_other" && (
                                          <>
                                            <Col sm="12" md="12">
                                              <FormGroup>
                                                <Input
                                                    style={{padding: "6px 10px"}}
                                                    type="select"
                                                    bsSize="sm"
                                                    className="form-select select-custom"

                                                    {...register(
                                                        `items.${item.index}.asset_type`
                                                    )}
                                                    value={items[item.index].asset_type}
                                                    onChange={(e) => {
                                                      const value = e.target.value;
                                                      const updatedLands = [...items];
                                                      updatedLands[item.index].asset_type =
                                                          value;
                                                      setItems(updatedLands);
                                                      setValue(
                                                          `items.${item.index}.asset_type`,
                                                          value
                                                      ); // Update the form value
                                                    }}
                                                >
                                                  <option value="">Select One</option>
                                                  {PF_OTHERFUND.map((data: any, index) => (
                                                      <option key={index} value={data.id}>
                                                        {data.name}
                                                      </option>
                                                  ))}
                                                </Input>
                                                {errors.items?.[item.index]?.asset_type && (
                                                    <span className="error-msg">
                                      {
                                        errors.items[item.index]?.asset_type
                                            ?.message
                                      }
                                    </span>
                                                )}
                                              </FormGroup>
                                            </Col>

                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>A/C</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.account_no`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.account_no`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.account_no}
                                                    disabled={!!item.account_no}

                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Opening Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.opening_value`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.opening_value`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.opening_value}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>New Contribution</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.new_contribution`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.new_contribution`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.new_contribution}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Encashment</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.encashment`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.encashment`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.encashment}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Net Income</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.net_income`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.net_income`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.net_income}
                                                    disabled={!!item.net_income}

                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Closing Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    //placeholder="Closing Amount"
                                                    {...register(
                                                        `items.${item.index}.closing_amount`,
                                                        {
                                                          //required: "Closing Amount is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.closing_amount`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.closing_amount}
                                                    disabled={!!item.closing_amount}

                                                />
                                              </FormGroup>
                                            </Col>
                                          </>
                                      )}
                                      {type === "other" && (
                                          <>
                                            <Col sm="12" md="12">
                                              <FormGroup>
                                                <Input
                                                    style={{padding: "6px 10px"}}
                                                    type="select"
                                                    bsSize="sm"
                                                    className="form-select select-custom"

                                                    {...register(
                                                        `items.${item.index}.asset_type`
                                                    )}
                                                    value={items[item.index].asset_type}
                                                    onChange={(e) => {
                                                      const value = e.target.value;
                                                      const updatedLands = [...items];
                                                      updatedLands[item.index].asset_type =
                                                          value;
                                                      setItems(updatedLands);
                                                      setValue(
                                                          `items.${item.index}.asset_type`,
                                                          value
                                                      ); // Update the form value
                                                    }}
                                                >
                                                  <option value="">Select One</option>
                                                  {OTHER_INVESTMENT.map((data: any, index) => (
                                                      <option key={index} value={data.id}>
                                                        {data.name}
                                                      </option>
                                                  ))}
                                                </Input>
                                                {errors.items?.[item.index]?.asset_type && (
                                                    <span className="error-msg">
                                      {
                                        errors.items[item.index]?.asset_type
                                            ?.message
                                      }
                                    </span>
                                                )}
                                              </FormGroup>
                                            </Col>

                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>A/C / Policy No</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.account_no`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.account_no`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.account_no}
                                                    disabled={!!item.account_no}

                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Opening Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.opening_value`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.opening_value`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.opening_value}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>New Contribution</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.new_contribution`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.new_contribution`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.new_contribution}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Encashment</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.encashment`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.encashment`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.encashment}


                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Net Income</Label>
                                                <Input
                                                    bsSize="sm"
                                                    {...register(
                                                        `items.${item.index}.net_income`,
                                                        {
                                                          //required: "Account No is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.net_income`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.net_income}

                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                              <FormGroup>
                                                <Label>Closing Value</Label>
                                                <Input
                                                    bsSize="sm"
                                                    //placeholder="Closing Amount"
                                                    {...register(
                                                        `items.${item.index}.closing_amount`,
                                                        {
                                                          //required: "Closing Amount is required",
                                                          onChange: (e) => {
                                                            setValue(
                                                                `items.${item.index}.closing_amount`,
                                                                e.target.value
                                                            );
                                                          },
                                                        }
                                                    )}
                                                    defaultValue={item.closing_amount}
                                                    disabled={!!item.closing_amount}

                                                />
                                              </FormGroup>
                                            </Col>
                                          </>
                                      )}

                                    </Row>
                                  </Fragment>
                              ))}
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

export default FinancialAssets;
