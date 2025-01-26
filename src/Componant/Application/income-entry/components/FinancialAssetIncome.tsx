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
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

interface OtherSourcesIncomeFormData {
  is_other_sources_of_income: boolean;
  interest_savings_account: number | null;
  tax_deduction_on_savings_account: number | null;
  interest_fixed_deposit: number | null;
  tax_deduction_on_fixed_deposit: number | null;
  interest_dps: number | null;
  tax_deduction_on_dps: number | null;
  interest_saving_certificate: number | null;
  tax_deduction_on_saving_certificate: number | null;
  income_govt_treasury_bond_securities: number | null;
  tax_deduction_govt_treasury_bond_securities: number | null;
  interest_other_bond_sukuk: number | null;
  tax_deduction_other_bond_sukuk: number | null;
  dividend_income: number | null;
  tax_deduction_dividend_income: number | null;
  interest_paid_against_loan: number | null;
  tax_deduction_against_loan: number | null;
}

const FinancialAssetIncome = () => {
  let userInfo = useSelector((state: any) => state.auth.data);
  const incomeEntryData = useSelector((state: any) => state?.pastReturn?.incomeEntryData);
  const [isFinancialAssetIncome, setIsFinancialAssetIncome] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [financialAssetsIncome, setFinancialAssetsIncome] = useState<any>({});
  const [id, setId] = useState<any>("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({
    defaultValues: {
      interest_savings_account: null,
      tax_deduction_on_savings_account: null,
      interest_fixed_deposit: null,
      tax_deduction_on_fixed_deposit: null,
      interest_dps: null,
      tax_deduction_on_dps: null,
      interest_saving_certificate: null,
      tax_deduction_on_saving_certificate: null,
      income_govt_treasury_bond_securities: null,
      tax_deduction_govt_treasury_bond_securities: null,
      interest_other_bond_sukuk: null,
      tax_deduction_other_bond_sukuk: null,
      dividend_income: null,
      tax_deduction_dividend_income: null,
      interest_paid_against_loan: null,
      tax_deduction_against_loan: null,
    },
  });

  const getCapitalGain = async () => {
    setLoading(true);
    await getRequest(`income-entries/${userInfo.id}`)
      .then((res) => {
        setLoading(false);
        setId(res?.data?.id);
        setIsFinancialAssetIncome(
          res?.data?.is_financial_assets_income ?? true
        );
        setFinancialAssetsIncome(res?.data?.financial_assets_income);
      })
      .catch((error) => {
        setLoading(false);
        console.log("from react query error: ", error.message);
      });
  };

  useEffect(() => {
    getCapitalGain();
  }, []);

  useEffect(() => {
    if (financialAssetsIncome) {
      // Set the fetched data into the form
      Object.keys(financialAssetsIncome).forEach((key) => {
        setValue(
          key as keyof OtherSourcesIncomeFormData,
          financialAssetsIncome[key]
        );
      });
    }
  }, [financialAssetsIncome, setValue]);

  const interest_savings_account = watch("interest_savings_account") || 0;
  const tax_deduction_on_savings_account =
    watch("tax_deduction_on_savings_account") || 0;
  const interest_fixed_deposit = watch("interest_fixed_deposit") || 0;
  const tax_deduction_on_fixed_deposit =
    watch("tax_deduction_on_fixed_deposit") || 0;
  const interest_dps = watch("interest_dps") || 0;
  const tax_deduction_on_dps = watch("tax_deduction_on_dps") || 0;
  const interest_saving_certificate = watch("interest_saving_certificate") || 0;
  const tax_deduction_on_saving_certificate =
    watch("tax_deduction_on_saving_certificate") || 0;
  const income_govt_treasury_bond_securities =
    watch("income_govt_treasury_bond_securities") || 0;
  const tax_deduction_govt_treasury_bond_securities =
    watch("tax_deduction_govt_treasury_bond_securities") || 0;
  const interest_other_bond_sukuk = watch("interest_other_bond_sukuk") || 0;
  const tax_deduction_other_bond_sukuk =
    watch("tax_deduction_other_bond_sukuk") || 0;
  const dividend_income = watch("dividend_income") || 0;
  const tax_deduction_dividend_income =
    watch("tax_deduction_dividend_income") || 0;
  const interest_paid_against_loan = watch("interest_paid_against_loan") || 0;

  const totalIncome =
    parseInt(interest_savings_account ?? 0) +
    parseInt(interest_fixed_deposit ?? 0) +
    parseInt(interest_dps ?? 0) +
    parseInt(interest_saving_certificate ?? 0) +
    parseInt(income_govt_treasury_bond_securities ?? 0) +
    parseInt(interest_other_bond_sukuk ?? 0) +
    parseInt(dividend_income ?? 0) +
    parseInt(interest_paid_against_loan ?? 0);

  const totalTaxDeduction =
    parseInt(tax_deduction_on_savings_account ?? 0) +
    parseInt(tax_deduction_on_fixed_deposit ?? 0) +
    parseInt(tax_deduction_on_dps ?? 0) +
    parseInt(tax_deduction_on_saving_certificate ?? 0) +
    parseInt(tax_deduction_govt_treasury_bond_securities ?? 0) +
    parseInt(tax_deduction_other_bond_sukuk ?? 0) +
    parseInt(tax_deduction_dividend_income ?? 0);

  const onSubmit: SubmitHandler<any> = async (inputData: any) => {
    try {
      setSaveLoading(true);
      inputData.is_financial_assets_income = isFinancialAssetIncome;
      inputData.total = totalIncome;
      inputData.total_tax_deduction = totalTaxDeduction;

      const res = id
        ? await patchRequest(`income-entries/${id}`, {
          user_id: userInfo.id,
          financial_assets_income: isFinancialAssetIncome ? inputData : null,
        })
        : await postRequest(`income-entries`, {
          user_id: userInfo.id,
          financial_assets_income: inputData,
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

  const topDataUpdate = () => {
    const updatedState = {
      ...incomeEntryData,
      financial_assets_income: totalIncome,
      total: incomeTotalData({ ...incomeEntryData, financial_assets_income: totalIncome })
    };
    dispatch(incomeEntry(updatedState));
  }

  return (
    <Col xl="9">
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <IncomeEntryTop
        title={"Total Financial Assets Income"}
        itemName={'financial_assets_income'}
      />
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Financial Assets Income"}
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
                        Do you have any income from financial assets?
                      </Label>
                      <br />
                      <Input
                        className="radio_animated"
                        id="rental_income-no"
                        type="radio"
                        value="false"
                        checked={isFinancialAssetIncome === false}
                        onChange={() => setIsFinancialAssetIncome(false)}
                      />
                      <span className="radio-right-space">No</span>
                      <Input
                        className="radio_animated pl-5"
                        id="rental_income-yes"
                        type="radio"
                        value="true"
                        checked={isFinancialAssetIncome === true}
                        onChange={() => setIsFinancialAssetIncome(true)}
                      />
                      <span>Yes</span>
                    </FormGroup>
                  </Col>
                </Row>
                {isFinancialAssetIncome && (
                  <>
                    <b> Income Details</b>
                    <Row>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Interest Income on Savings Accounts </Label>
                          <Input
                            type="number"
                            placeholder="Interest Income on Savings Accounts	"
                            {...register("interest_savings_account")}
                            defaultValue={interest_savings_account || undefined}
                            onChange={(e) => {
                              setValue(
                                "interest_savings_account",
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
                            {...register("tax_deduction_on_savings_account")}
                            defaultValue={
                              tax_deduction_on_savings_account || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_on_savings_account",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Interest Income on Fixed Deposit </Label>
                          <Input
                            type="number"
                            placeholder="Interest Income on Fixed Deposit	"
                            {...register("interest_fixed_deposit")}
                            defaultValue={interest_fixed_deposit || undefined}
                            onChange={(e) => {
                              setValue(
                                "interest_fixed_deposit",
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
                            {...register("tax_deduction_on_fixed_deposit")}
                            defaultValue={
                              tax_deduction_on_fixed_deposit || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_on_fixed_deposit",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Interest Income on DPS </Label>
                          <Input
                            type="number"
                            placeholder="Interest Income on DPS	"
                            {...register("interest_dps")}
                            defaultValue={interest_dps || undefined}
                            onChange={(e) => {
                              setValue("interest_dps", +e.target.value);
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
                            {...register("tax_deduction_on_dps")}
                            defaultValue={tax_deduction_on_dps || undefined}
                            onChange={(e) => {
                              setValue("tax_deduction_on_dps", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Interest Income on Saving Certificate</Label>
                          <Input
                            type="number"
                            placeholder="Interest Income on Saving Certificate"
                            {...register("interest_saving_certificate")}
                            defaultValue={
                              interest_saving_certificate || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "interest_saving_certificate",
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
                            {...register("tax_deduction_on_saving_certificate")}
                            defaultValue={
                              tax_deduction_on_saving_certificate || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_on_saving_certificate",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>
                            Income from Govt. Treasury Bond/Securities
                          </Label>
                          <Input
                            type="number"
                            placeholder="Income from Govt. Treasury Bond/Securities"
                            {...register(
                              "income_govt_treasury_bond_securities"
                            )}
                            defaultValue={
                              income_govt_treasury_bond_securities || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "income_govt_treasury_bond_securities",
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
                              "tax_deduction_govt_treasury_bond_securities"
                            )}
                            defaultValue={
                              tax_deduction_govt_treasury_bond_securities ||
                              undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_govt_treasury_bond_securities",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>
                            Interest Income from any other Bond/Sukuk
                          </Label>
                          <Input
                            type="number"
                            placeholder="Interest Income from any other Bond/Sukuk"
                            {...register("interest_other_bond_sukuk")}
                            defaultValue={
                              interest_other_bond_sukuk || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "interest_other_bond_sukuk",
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
                            {...register("tax_deduction_other_bond_sukuk")}
                            defaultValue={
                              tax_deduction_other_bond_sukuk || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_other_bond_sukuk",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Dividend Income</Label>
                          <Input
                            type="number"
                            placeholder="Dividend Income"
                            {...register("dividend_income")}
                            defaultValue={dividend_income || undefined}
                            onChange={(e) => {
                              setValue("dividend_income", +e.target.value);
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
                            {...register("tax_deduction_dividend_income")}
                            defaultValue={
                              tax_deduction_dividend_income || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "tax_deduction_dividend_income",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="12">
                        <FormGroup>
                          <Label>Interest Received Against Personal Loan</Label>
                          <Input
                            type="number"
                            placeholder="Interest Received Against Personal Loan"
                            {...register("interest_paid_against_loan")}
                            defaultValue={
                              interest_paid_against_loan || undefined
                            }
                            onChange={(e) => {
                              setValue(
                                "interest_paid_against_loan",
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
                            placeholder="Total"
                            value={totalIncome}
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
                            value={totalTaxDeduction}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </>
                )}
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

export default FinancialAssetIncome;
