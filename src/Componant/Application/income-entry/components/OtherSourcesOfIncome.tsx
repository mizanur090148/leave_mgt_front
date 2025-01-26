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
import { SubmitHandler, useForm } from "react-hook-form";
import { Fragment, useEffect, useState } from "react";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { Btn } from "../../../../AbstractElements";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import IncomeEntryTop from "./IncomeEntryTop";
import { incomeTotalData } from "../../../../utils/helpers";
import { incomeEntry } from "../../../../Store/Slices/PastReturnTotalSlice";

// Define a proper interface for form data
interface OtherSourcesIncomeFormData {
  is_other_sources_of_income: boolean;
  prize_from_win_of_lottery: number | null;
  tax_deduction_prize_from_win_of_lottery: number | null;
  royalty_income: number | null;
  tax_deduction_royalty_income: number | null;
  technical_fees: number | null;
  tax_deduction_technical_fees: number | null;
  iboard_meeting_fees: number | null;
  tax_deduction_iboard_meeting_fees: number | null;
  cash_incentive: number | null;
  tax_deduction_cash_incentive: number | null;
  any_other_income: number | null;
  tax_deduction_any_other_income: number | null;
  total: number | null
  total_tax_deduction: number | null;
}

const OtherSourcesOfIncome = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const incomeEntryData = useSelector((state: any) => state?.pastReturn?.incomeEntryData);
  const [isOtherSource, setIsOtherSource] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otherSourcesOfIncome, setOtherSourcesOfIncome] = useState<any>({});
  const [id, setId] = useState<string>("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OtherSourcesIncomeFormData>({
    defaultValues: {
      prize_from_win_of_lottery: null,
      tax_deduction_prize_from_win_of_lottery: null,
      royalty_income: null,
      tax_deduction_royalty_income: null,
      technical_fees: null,
      tax_deduction_technical_fees: null,
      iboard_meeting_fees: null,
      tax_deduction_iboard_meeting_fees: null,
      cash_incentive: null,
      tax_deduction_cash_incentive: null,
      any_other_income: null,
      tax_deduction_any_other_income: null,
    },
  });

  const getOtherSourcesIncome = async () => {
    setLoading(true);
    try {
      const res = await getRequest(`income-entries/${userInfo.id}`);
      setLoading(false);
      setId(res?.data?.id);
      setIsOtherSource(res?.data?.is_other_sources_of_income ?? true);
      setOtherSourcesOfIncome(res?.data?.other_sources_of_income);
    } catch (error: any) {
      setLoading(false);
      console.log("Error fetching other sources of income:", error.message);
    }
  };

  useEffect(() => {
    getOtherSourcesIncome();
  }, []);

  useEffect(() => {
    if (otherSourcesOfIncome) {
      // Set the fetched data into the form
      Object.keys(otherSourcesOfIncome).forEach((key) => {
        setValue(
          key as keyof OtherSourcesIncomeFormData,
          otherSourcesOfIncome[key]
        );
      });
    }
  }, [otherSourcesOfIncome, setValue]);

  const totalIncome =
    (watch("prize_from_win_of_lottery") ?? 0) +
    (watch("royalty_income") ?? 0) +
    (watch("technical_fees") ?? 0) +
    (watch("iboard_meeting_fees") ?? 0) +
    (watch("cash_incentive") ?? 0) +
    (watch("any_other_income") ?? 0);

  const totalTaxDeduction =
    (watch("tax_deduction_prize_from_win_of_lottery") ?? 0) +
    (watch("tax_deduction_royalty_income") ?? 0) +
    (watch("tax_deduction_technical_fees") ?? 0) +
    (watch("tax_deduction_iboard_meeting_fees") ?? 0) +
    (watch("tax_deduction_cash_incentive") ?? 0) +
    (watch("tax_deduction_any_other_income") ?? 0);

  const onSubmit: SubmitHandler<OtherSourcesIncomeFormData> = async (
    inputData
  ) => {
    try {
      setSaveLoading(true);
      inputData.is_other_sources_of_income = isOtherSource;
      inputData.total = totalIncome;
      inputData.total_tax_deduction = totalTaxDeduction;
      const res = id
        ? await patchRequest(`income-entries/${id}`, {
          user_id: userInfo.id,
          other_sources_of_income: isOtherSource ? inputData : null,
        })
        : await postRequest(`income-entries`, {
          user_id: userInfo.id,
          other_sources_of_income: inputData,
        });

      setId(res?.data?.id);
      topDataUpdate();
      setMessage("Successfully Updated");
      setOpen(true);
    } catch (error: any) {
      console.log("Error updating income entries:", error?.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const prize_from_win_of_lottery = watch("prize_from_win_of_lottery") || 0;
  const royalty_income = watch("royalty_income") || 0;
  const technical_fees = watch("technical_fees") || 0;
  const iboard_meeting_fees = watch("iboard_meeting_fees") || 0;
  const cash_incentive = watch("cash_incentive") || 0;
  const any_other_income = watch("any_other_income") || 0;

  const tax_deduction_prize_from_win_of_lottery =
    watch("tax_deduction_prize_from_win_of_lottery") || 0;
  const tax_deduction_royalty_income =
    watch("tax_deduction_royalty_income") || 0;
  const tax_deduction_technical_fees =
    watch("tax_deduction_technical_fees") || 0;
  const tax_deduction_iboard_meeting_fees =
    watch("tax_deduction_iboard_meeting_fees") || 0;
  const tax_deduction_cash_incentive =
    watch("tax_deduction_cash_incentive") || 0;
  const tax_deduction_any_other_income =
    watch("tax_deduction_any_other_income") || 0;

  const topDataUpdate = () => {
    const updatedState = {
      ...incomeEntryData,
      other_sources_of_income: totalIncome,
      total: incomeTotalData({ ...incomeEntryData, other_sources_of_income: totalIncome })
    };
    dispatch(incomeEntry(updatedState));
  }

  return (
    <Col xl="9">
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <IncomeEntryTop
        title={"Total Other Source Of Income"}
        itemName={'other_sources_of_income'}
      />
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={" Other Sources Of Income"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            {loading ? (
              <Loader loading={loading} />
            ) : (
              <Fragment>
                <Row>
                  <Col sm="6" md="12">
                    <FormGroup>
                      <Label>
                        Do you have any income that is not mentioned above?
                      </Label>
                      <br />
                      <Input
                        className="radio_animated"
                        id="rental_income-no"
                        type="radio"
                        value="false"
                        checked={isOtherSource === false}
                        onChange={(e) => setIsOtherSource(false)}
                      />
                      <span className="radio-right-space">No</span>
                      <Input
                        className="radio_animated pl-5"
                        id="rental_income-yes"
                        type="radio"
                        value="true"
                        checked={isOtherSource === true}
                        onChange={(e) => setIsOtherSource(true)}
                      />
                      <span>Yes</span>
                    </FormGroup>
                  </Col>
                </Row>
                {isOtherSource && (
                  <>
                    <Row>
                      <h3> Income Details</h3>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Prize from win of Lottery</Label>
                          <Input
                            type="number"
                            placeholder="Prize from win of Lottery"
                            {...register("prize_from_win_of_lottery")}
                            defaultValue={
                              prize_from_win_of_lottery || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "prize_from_win_of_lottery",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            placeholder="Tax Deduction at Source (TDS)"
                            {...register(
                              "tax_deduction_prize_from_win_of_lottery"
                            )}
                            defaultValue={
                              tax_deduction_prize_from_win_of_lottery ||
                              undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_prize_from_win_of_lottery",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Royalty Income</Label>
                          <Input
                            type="number"
                            placeholder="Royalty Income"
                            {...register("royalty_income")}
                            defaultValue={royalty_income || undefined}
                            onChange={(e) => {
                              setValue("royalty_income", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            placeholder="Tax Deduction at Source (TDS)"
                            {...register("tax_deduction_royalty_income")}
                            defaultValue={
                              tax_deduction_royalty_income || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_royalty_income",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Technical Knowhow Fees</Label>
                          <Input
                            type="number"
                            placeholder="Technical Knowhow Fees"
                            {...register("technical_fees")}
                            defaultValue={technical_fees || undefined}
                            onChange={(e) => {
                              setValue("technical_fees", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            placeholder="Tax Deduction at Source (TDS)"
                            {...register("technical_fees")}
                            defaultValue={
                              tax_deduction_technical_fees || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_technical_fees",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>IBoard Meeting Fees</Label>
                          <Input
                            type="number"
                            placeholder="IBoard Meeting Fees"
                            {...register("technical_fees")}
                            defaultValue={iboard_meeting_fees || undefined}
                            onChange={(e) => {
                              setValue("iboard_meeting_fees", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            placeholder="Tax Deduction at Source (TDS)"
                            {...register("technical_fees")}
                            defaultValue={
                              tax_deduction_iboard_meeting_fees || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_iboard_meeting_fees",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Cash Incentive</Label>
                          <Input
                            type="number"
                            placeholder="Cash Incentive"
                            {...register("technical_fees")}
                            defaultValue={cash_incentive || undefined}
                            onChange={(e) => {
                              setValue("cash_incentive", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            placeholder="Tax Deduction at Source (TDS)"
                            {...register("tax_deduction_cash_incentive")}
                            defaultValue={
                              tax_deduction_cash_incentive || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_cash_incentive",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Any Other Income not mentioned here</Label>
                          <Input
                            type="number"
                            placeholder="Any Other Income not mentioned here"
                            {...register("any_other_income")}
                            defaultValue={any_other_income || undefined}
                            onChange={(e) => {
                              setValue("any_other_income", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            placeholder="Tax Deduction at Source (TDS)"
                            {...register("tax_deduction_any_other_income")}
                            defaultValue={
                              tax_deduction_any_other_income || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_any_other_income",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="dashed-hr"></div>
                    <Row>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Total</Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Any Other Income"
                            value={totalIncome || undefined}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Total Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Total Tax Deduction at Source (TDS)"
                            value={totalTaxDeduction || undefined}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </>
                )}
                <Btn
                  className="pull-right save-and-continue"
                  color="primary"
                  disabled={saveLoading ? true : false}
                  type={saveLoading ? `button` : `submit`}
                  onClick={() => handleSubmit(onSubmit)}
                >
                  Save & Continue
                </Btn>
                <Btn
                  className="pull-right"
                  color="primary"
                  disabled={saveLoading ? true : false}
                  type={saveLoading ? `button` : `submit`}
                  onClick={() => handleSubmit(onSubmit)}
                >
                  {saveLoading ? "Saving..." : "Save"}
                </Btn>
              </Fragment>
            )}
          </CardBody>
          <CardFooter className="text-end"></CardFooter>
        </Card>
      </Form>
    </Col>
  );
};

export default OtherSourcesOfIncome;
