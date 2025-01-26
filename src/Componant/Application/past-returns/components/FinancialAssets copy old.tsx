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
  account_no: string;
  closing_amount: string;
  name_of_person?: string;
  etin_no?: string;
}

interface ShareItem {
  id: any;
  type: string;
  share_type_id: string;
  account_no: string;
  closing_amount: number | null;
};

interface FinancialAssets {
  shares: ShareItem[]
}

export const SHARE_TYPES = [
  { id: 1, name: "Share From IPO" },
  { id: 2, name: "Shares of Secondary Market" },
  { id: 3, name: "Shares of Systematic Investment Scheme" },
];

const FinancialAssets = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [shares, setShares] = useState<ShareItem[]>([
    {
      id: "",
      type: "shares",
      share_type_id: "",
      account_no: "",
      closing_amount: null
    }
  ]);

  const [savingCertificates, setSavingCertificates] = useState<ShareItem[]>([
    {
      id: "",
      type: "savings",
      share_type_id: "",
      account_no: "",
      closing_amount: null
    }
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<FinancialAssets>({
    defaultValues: {},
  });

  // const getData = async () => {
  //   setLoading(true);
  //   await getRequest(`financial-assets`)
  //     .then((res: any) => {
  //       setLoading(false);
  //       const data = res.data?.map((item: any) => ({
  //         id: item.id,
  //         type: item.type,
  //         property_type: item.property_type,
  //         account_no: item.account_no,
  //         closing_amount: item.closing_amount,
  //         name_of_person: item.name_of_person,
  //         etin_no: item.etin_no,
  //       }));
  //       if (data?.length) {
  //         setItems(data);
  //         reset({ items: data });
  //       }
  //     })
  //     .catch((error: any) => {
  //       setLoading(false);
  //       console.error("Error fetching data:", error.message);
  //     });
  // };

  useEffect(() => {
    //getData();
  }, []);

  const onSubmit: SubmitHandler<any> = async (data) => {
    // setSaveLoading(true);

    console.log(data, "items");

    // const inputArr = data.items.map((item) => ({
    //   ...item,
    //   user_id: userInfo.id,
    //   past_return: true,
    // }));
    try {
      // const res = await postRequest(`financial-assets`, inputArr);
      // const updatedData = res.data?.map((item: any) => ({
      //   id: item.id,
      //   type: item.type,
      //   account_no: item.account_no,
      //   closing_amount: item.closing_amount,
      // }));
      // setOpen(true);
      // setSaveLoading(false);
      // setMessage("Successfully Updated");
      // const updatedData = res.data?.map((item: any) => ({
      //   id: item?.id,
      //   type: item?.type,
      //   account_no: item?.account_no,
      //   closing_amount: item?.closing_amount,
      //   name_of_person: item?.name_of_person,
      //   etin_no: item?.etin_no,
      // }));
      // setItems(updatedData);
      // reset({ items: updatedData });
    } catch (error: any) {
      setSaveLoading(false);
      console.error("Error:", error.message);
    }
  };

  const addMore = (type: string) => {
    let existingData = shares;
    if (type === 'savings') {
      existingData = savingCertificates;
    }
    const newItem = {
      id: "",
      type: type,
      share_type_id: "",
      account_no: "",
      closing_amount: null,
    };
    const updatedData = [...existingData, newItem];
    setShares(updatedData);

    // Register the new item dynamically
    const newIndex = updatedData.length - 1;
    setValue(`shares.${newIndex}.id`, "");
    setValue(`shares.${newIndex}.type`, type);
    setValue(`shares.${newIndex}.share_type_id`, "");
    setValue(`shares.${newIndex}.account_no`, "");
    setValue(`shares.${newIndex}.closing_amount`, null);
    // setValue(`shares.${newIndex}.name_of_person`, "");
    // setValue(`shares.${newIndex}.etin_no`, "");
  };

  const deleteAction = async (id: any, type: string, index: any) => {
    // const confirmation = window.confirm(
    //   "Are you sure you want to delete this item?"
    // );
    // if (confirmation) {
    //   const updatedData = [...items];
    //   if (id) {
    //     await deleteRequest(`financial-assets/${id}`)
    //       .then((res) => {
    //         const newItems = updatedData.filter((item) => item.id !== id);
    //         setItems([...newItems]);
    //         if (newItems.length === 0) {
    //           getData();
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } else {
    //     updatedData.splice(index, 1);
    //     setItems(updatedData);
    //   }
    // }
  };

  const getTitle = (type: string, key: number) => {
    switch (type) {
      case "shares":
        return `Shares from Capital Market: ${serialPadding(key)} (Value)`;
      case "savings":
        return `Savings Certificate: ${serialPadding(key)} (Amount)`;
      case "loan_given":
        return `Loan Given: ${serialPadding(key)} (Amount)`;
      case "fixed_deposit":
        return `Fixed Deposit: ${serialPadding(key)} (Amount)`;
      case "pf_or_other":
        return `PF or Other Fund: ${serialPadding(key)} (Amount)`;
      case "other":
        return `Other Investment: ${serialPadding(key)} (Amount)`;
      default:
        return "";
    }
  };

  const getFieldLabel = (type: string) => {
    switch (type) {
      case "shares":
        return {
          firstLabel: "BO/Account ID",
          secondLabel: "Closing Value",
        };
      case "savings":
      case "fixed_deposit":
      case "pf_or_other":
        return {
          firstLabel: "A/C No",
          secondLabel: "Closing Amount",
        };
      case "loan_given":
        return {
          firstLabel: "Name of Person",
          secondLabel: "Closing Amount",
        };
      case "other":
        return {
          firstLabel: "A/C No/Policy No",
          secondLabel: "Closing Amount",
        };
      default:
        return {
          firstLabel: "",
          secondLabel: "",
        };
    }
  };

  let totalHeadIncome = null;
  // if (watch("items")) {
  //   totalHeadIncome = items.reduce(
  //     (acc, curr) => acc + Number(curr.closing_amount || 0),
  //     0
  //   );
  // }

  return (
    <Col xl="9">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <UserDetailsInformation
          title="Total Financial Assets"
          totalHeadIncome={totalHeadIncome}
        />
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Financial Assets"}
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
                <div>
                  {shares?.map((share, index) => (
                    <Fragment key={index}>
                      <Row>
                        <Col sm="4" md="4">
                          <FormGroup>
                            <Label>{getTitle('shares', index)}</Label>
                            <Input
                              style={{ padding: "6px 10px" }}
                              type="select"
                              bsSize="sm"
                              className="form-select select-custom"
                              {...register(`shares.${index}.share_type_id`, {
                                required: "This is required",
                              })}
                              value={share?.share_type_id}
                              defaultValue={share?.share_type_id}
                              onChange={(e) => {
                                const value = e.target.value;
                                const updatedShares = [...shares];
                                updatedShares[index].share_type_id = value;
                                setShares(updatedShares);
                                setValue(`shares.${index}.share_type_id`, value);
                              }}
                            >
                              <option value="">Select One</option>
                              {SHARE_TYPES?.map(
                                (data: any, index: any) => (
                                  <option key={index} value={data.id}>
                                    {data.name}
                                  </option>
                                )
                              )}
                            </Input>
                            {errors.shares?.[index]?.share_type_id && (
                              <span className="error-msg">
                                {errors.shares[index]?.share_type_id?.message}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>BO/Account ID</Label>
                            <Input
                              bsSize="sm"
                              placeholder=""
                              type="text"
                              // {...register(`shares.${key}.account_no`, saleLand?.asset_id ? {
                              //   required: "This is required",
                              //   valueAsNumber: true,
                              // } : {})}
                              {...register(`shares.${index}.account_no`, {
                                required: "This is required"
                              })}
                              onChange={(e) => {
                                const value = e.target.value;
                                const updatedShares = [...shares];
                                updatedShares[index].account_no = value;
                                setShares(updatedShares);
                                setValue(`shares.${index}.account_no`, value);
                              }}
                              defaultValue={share?.account_no ?? ""}
                              value={share?.account_no ?? ""}
                            />
                            {errors.shares?.[index]?.account_no && (
                              <span className="error-msg">
                                {errors.shares[index]?.account_no?.message}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Closing Value</Label>
                            <Input
                              bsSize="sm"
                              placeholder=""
                              type="number"
                              {...register(`shares.${index}.closing_amount`, {
                                required: "This is required",
                                valueAsNumber: true,
                              })}
                              onChange={(e) => {
                                const value = +e.target.value;
                                const updatedShares = [...shares];
                                updatedShares[index].closing_amount = value;
                                setShares(updatedShares);
                                setValue(`shares.${index}.closing_amount`, value);
                              }}
                              defaultValue={share?.closing_amount ?? ""}
                              value={share?.closing_amount ?? ""}
                            />
                            {errors.shares?.[index]?.closing_amount && (
                              <span className="error-msg">
                                {errors.shares[index]?.closing_amount?.message}
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
                        onClick={() => addMore('shares')}
                      >
                        Add More <i className="fa fa-plus-circle pl-2"></i>
                      </Btn>
                    </Col>
                  </Row>
                </div>
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
