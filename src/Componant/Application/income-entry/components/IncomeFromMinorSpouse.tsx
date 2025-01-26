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

interface MinorSpouseFormData {
  is_income_from_minor_spouse: boolean;
  savings_accounts: number | null;
  tax_deduction_savings_accounts: number | null;
  fixed_deposit: number | null;
  tax_deduction_fixed_deposit: number | null;
  dps: number | null;
  tax_deduction_dps: number | null;
  saving_certificate: number | null;
  tax_deduction_saving_certificate: number | null;
  dividend_income: number | null;
  tax_deduction_dividend_income: number | null;
  agricultural_income: number | null;
  tax_deduction_agricultural_income: number | null;
  any_other_income: number | null;
  tax_deduction_any_other_income: number | null;
  total: number | null;
  total_tax_deduction: number | null;
}

const IncomeFromMinorSpouse = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const incomeEntryData = useSelector((state: any) => state?.pastReturn?.incomeEntryData);
  const [isIncomeFromMinorSpouse, setIsIncomeFromMinorSpouse] = useState(false);
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
  } = useForm<MinorSpouseFormData>({
    defaultValues: {
      savings_accounts: null,
      tax_deduction_savings_accounts: null,
      fixed_deposit: null,
      tax_deduction_fixed_deposit: null,
      dps: null,
      tax_deduction_dps: null,
      saving_certificate: null,
      tax_deduction_saving_certificate: null,
      dividend_income: null,
      tax_deduction_dividend_income: null,
      agricultural_income: null,
      tax_deduction_agricultural_income: null,
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
      setIsIncomeFromMinorSpouse(res?.data?.is_income_from_minor_spouse ?? true);
      setOtherSourcesOfIncome(res?.data?.income_from_minor_spouse);
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
          key as keyof MinorSpouseFormData,
          otherSourcesOfIncome[key]
        );
      });
    }
  }, [otherSourcesOfIncome, setValue]);

  const totalIncome =
    (watch("savings_accounts") ?? 0) +
    (watch("fixed_deposit") ?? 0) +
    (watch("dps") ?? 0) +
    (watch("saving_certificate") ?? 0) +
    (watch("dividend_income") ?? 0) +
    (watch("agricultural_income") ?? 0) +
    (watch("any_other_income") ?? 0);

  const totalTaxDeduction =
    (watch("tax_deduction_savings_accounts") ?? 0) +
    (watch("tax_deduction_fixed_deposit") ?? 0) +
    (watch("tax_deduction_dps") ?? 0) +
    (watch("tax_deduction_saving_certificate") ?? 0) +
    (watch("tax_deduction_dividend_income") ?? 0) +
    (watch("tax_deduction_agricultural_income") ?? 0) +
    (watch("tax_deduction_any_other_income") ?? 0);

  const onSubmit: SubmitHandler<MinorSpouseFormData> = async (
    inputData
  ) => {
    try {
      setSaveLoading(true);
      inputData.is_income_from_minor_spouse = isIncomeFromMinorSpouse;
      inputData.total = totalIncome;
      inputData.total_tax_deduction = totalTaxDeduction;

      const res = id
        ? await patchRequest(`income-entries/${id}`, {
          user_id: userInfo.id,
          income_from_minor_spouse: isIncomeFromMinorSpouse ? inputData : null,
        })
        : await postRequest(`income-entries`, {
          user_id: userInfo.id,
          income_from_minor_spouse: inputData,
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

  const savings_accounts = watch("savings_accounts") || 0;
  const fixed_deposit = watch("fixed_deposit") || 0;
  const dps = watch("dps") || 0;
  const saving_certificate = watch("saving_certificate") || 0;
  const dividend_income = watch("dividend_income") || 0;
  const agricultural_income = watch("agricultural_income") || 0;
  const any_other_income = watch("any_other_income") || 0;

  const tax_deduction_savings_accounts =
    watch("tax_deduction_savings_accounts") || 0;
  const tax_deduction_fixed_deposit =
    watch("tax_deduction_fixed_deposit") || 0;
  const tax_deduction_dps =
    watch("tax_deduction_dps") || 0;
  const tax_deduction_saving_certificate =
    watch("tax_deduction_saving_certificate") || 0;
  const tax_deduction_dividend_income =
    watch("tax_deduction_dividend_income") || 0;
  const tax_deduction_agricultural_income =
    watch("tax_deduction_agricultural_income") || 0;
  const tax_deduction_any_other_income =
    watch("tax_deduction_any_other_income") || 0;

  const topDataUpdate = () => {
    const updatedState = {
      ...incomeEntryData,
      income_from_minor_spouse: totalIncome,
      total: incomeTotalData({ ...incomeEntryData, income_from_minor_spouse: totalIncome })
    };
    dispatch(incomeEntry(updatedState));
  }

  return (
    <Col xl="9">
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <IncomeEntryTop
        title={"Total Income From Minor Income"}
        itemName={'income_from_minor_spouse'}
      />
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Income From Minor Spouse"}
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
                      <Label>Have you earned any income through your minor or spouse?</Label>
                      <br />
                      <Input
                        className="radio_animated"
                        id="rental_income_no"
                        type="radio"
                        value="false"
                        checked={isIncomeFromMinorSpouse === false}
                        onChange={(e) => setIsIncomeFromMinorSpouse(false)}
                      />
                      <span className="radio-right-space">No</span>
                      <Input
                        className="radio_animated pl-5"
                        id="rental_income_yes"
                        type="radio"
                        value="true"
                        checked={isIncomeFromMinorSpouse === true}
                        onChange={(e) => setIsIncomeFromMinorSpouse(true)}
                      />
                      <span>Yes</span>
                    </FormGroup>
                  </Col>
                  <br />
                  <h3> Income Details</h3>
                  <br />
                  <br />
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label>Interest Income on Savings Accounts</Label>
                      <Input
                        type="number"
                        placeholder="Interest Income on Savings Accounts"
                        {...register("savings_accounts")}
                        defaultValue={
                          savings_accounts || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "savings_accounts",
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
                        {...register("tax_deduction_savings_accounts")}
                        defaultValue={
                          tax_deduction_savings_accounts || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "tax_deduction_savings_accounts",
                            +e.target.value
                          );
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label>Interest Income on Fixed Deposit</Label>
                      <Input
                        type="number"
                        placeholder="Interest Income on Fixed Deposit"
                        {...register("fixed_deposit")}
                        defaultValue={
                          fixed_deposit || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "fixed_deposit",
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
                        {...register("tax_deduction_fixed_deposit")}
                        defaultValue={
                          tax_deduction_fixed_deposit || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "tax_deduction_fixed_deposit",
                            +e.target.value
                          );
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label>Interest Income on DPS</Label>
                      <Input
                        type="number"
                        placeholder="Interest Income on DPS"
                        {...register("dps")}
                        defaultValue={
                          dps || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "dps",
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
                        {...register("tax_deduction_dps")}
                        defaultValue={
                          tax_deduction_dps || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "tax_deduction_dps",
                            +e.target.value
                          );
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
                        {...register("saving_certificate")}
                        defaultValue={
                          saving_certificate || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "saving_certificate",
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
                        {...register("tax_deduction_saving_certificate")}
                        defaultValue={
                          tax_deduction_saving_certificate || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "tax_deduction_saving_certificate",
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
                        defaultValue={
                          dividend_income || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "dividend_income",
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
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label>Agricultural Income</Label>
                      <Input
                        type="number"
                        placeholder="Agricultural Income"
                        {...register("agricultural_income")}
                        defaultValue={
                          agricultural_income || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "agricultural_income",
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
                        {...register("tax_deduction_agricultural_income")}
                        defaultValue={
                          tax_deduction_agricultural_income || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "tax_deduction_agricultural_income",
                            +e.target.value
                          );
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label>Any Other Income</Label>
                      <Input
                        type="number"
                        placeholder="Any Other Income"
                        {...register("any_other_income")}
                        defaultValue={
                          any_other_income || undefined
                        }
                        onChange={(e) => {
                          setValue(
                            "any_other_income",
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
                  <br />
                  <hr />
                  <br />
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label>Total</Label>
                      <Input
                        type="number"
                        placeholder="Any Other Income"
                        value={totalIncome}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="6">
                    <FormGroup>
                      <Label>Total Tax Deduction at Source (TDS)</Label>
                      <Input
                        type="number"
                        placeholder="Total Tax Deduction at Source (TDS)"
                        value={totalTaxDeduction}
                      />
                    </FormGroup>
                  </Col>
                </Row>
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

export default IncomeFromMinorSpouse;
