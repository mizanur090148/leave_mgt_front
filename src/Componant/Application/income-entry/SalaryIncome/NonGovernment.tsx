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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { useSelector } from "react-redux";
import { Btn } from "../../../../AbstractElements";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";

type NonGovernmentProps = {
  id: any;
  isSalaryIncome: boolean;
  salaryIncome: any;
  setId: React.Dispatch<React.SetStateAction<string>>;
  topDataUpdate: (totalSalaryIncome: number) => void;
};

const NonGovernment = ({
  id,
  setId,
  salaryIncome,
  isSalaryIncome,
  topDataUpdate
}: NonGovernmentProps) => {
  let userInfo = useSelector((state: any) => state.auth.data);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isGross, setIsGross] = useState(salaryIncome?.is_gross ?? true);
  const [anyPaymentExpand, setAnyPaymentExpand] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({
    defaultValues: {
      gross_salary: salaryIncome?.gross_salary || null,
      gross_allowable_exmeption:
        salaryIncome?.gross_allowable_exmeption || null,
      gross_taxable_amount: salaryIncome?.gross_taxable_amount || null,
      basic_salary: salaryIncome?.basic_salary || null,
      house_rent_allowance: salaryIncome?.house_rent_allowance || null,
      medical_allowance: salaryIncome?.medical_allowance || null,
      conveyance_allowance: salaryIncome?.conveyance_allowance || null,
      festival_boishakhi_bonus: salaryIncome?.festival_boishakhi_bonus || null,
      advance_due_salary: salaryIncome?.advance_due_salary || null,
      gratuity: salaryIncome?.gratuity || null,
      perquisites: salaryIncome?.perquisites || null,
      any_other_benefit: salaryIncome?.any_other_benefit || null,
      any_payment_addition_salary_wages:
        salaryIncome?.any_payment_addition_salary_wages || null,
      employee_share_scheme: salaryIncome?.employee_share_scheme || null,
      accomodation_facility: salaryIncome?.accomodation_facility || null,
      transport_facility: salaryIncome?.transport_facility || null,
      company_provided_any_facility:
        salaryIncome?.company_provided_any_facility || null,
      employer_contribution_to_provident_fund:
        salaryIncome?.employer_contribution_to_provident_fund || null,
      other_cash_non_cash_facility:
        salaryIncome?.other_cash_non_cash_facility || null,
    },
  });

  const onSubmit: SubmitHandler<GovernmentIncome> = (inputData: any) => {
    setSaveLoading(true);
    inputData["employee_type"] = "nongovernment";
    inputData["user_id"] = userInfo.id;
    inputData["is_gross"] = isGross;
    inputData["is_salary_income"] = isSalaryIncome;

    const actionType = id
      ? patchRequest(`income-entries/${id}`, {
          user_id: userInfo.id,
          salary_income: inputData,
        })
      : postRequest(`income-entries`, {
          user_id: userInfo.id,
          salary_income: inputData,
        });
    actionType
      .then((res) => {
        setId(res?.data?.id);
        setSaveLoading(false);
        setMessage("Successfully Updated");
        setOpen(true);
      })
      .catch((error) => {
        setMessage("Something went wrong");
        setOpen(true);
        setSaveLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (salaryIncome) {
      // Update form values with fetched data
      setValue(
        "basic_salary",
        parseInt(salaryIncome?.basic_salary, 10) || null
      );
      setValue(
        "house_rent_allowance",
        parseInt(salaryIncome?.house_rent_allowance, 10) || null
      );
      setValue(
        "medical_allowance",
        parseInt(salaryIncome?.medical_allowance, 10) || null
      );
      setValue(
        "conveyance_allowance",
        parseInt(salaryIncome?.conveyance_allowance, 10) || null
      );
      setValue(
        "festival_boishakhi_bonus",
        parseInt(salaryIncome?.festival_boishakhi_bonus, 10) || null
      );
      setValue(
        "advance_due_salary",
        parseInt(salaryIncome?.advance_due_salary, 10) || null
      );
      setValue("gratuity", parseInt(salaryIncome?.gratuity, 10) || null);
      setValue("perquisites", parseInt(salaryIncome?.perquisites, 10) || null);
      setValue(
        "any_other_benefit",
        parseInt(salaryIncome?.any_other_benefit, 10) || null
      );
      setValue(
        "any_payment_addition_salary_wages",
        parseInt(salaryIncome?.any_payment_addition_salary_wages, 10) || null
      );
      setValue(
        "any_payment_addition_salary_wages",
        parseInt(salaryIncome?.any_payment_addition_salary_wages, 10) || null
      );
      setValue(
        "employee_share_scheme",
        parseInt(salaryIncome?.employee_share_scheme, 10) || null
      );
      setValue(
        "accomodation_facility",
        parseInt(salaryIncome?.accomodation_facility, 10) || null
      );
      setValue(
        "transport_facility",
        parseInt(salaryIncome?.transport_facility, 10) || null
      );
      setValue(
        "company_provided_any_facility",
        parseInt(salaryIncome?.company_provided_any_facility, 10) || null
      );
      setValue(
        "employer_contribution_to_provident_fund",
        parseInt(salaryIncome?.employer_contribution_to_provident_fund, 10) ||
          null
      );
      setValue(
        "other_cash_non_cash_facility",
        parseInt(salaryIncome?.other_cash_non_cash_facility, 10) || null
      );
    }
  }, [salaryIncome]);

  let gross_salary = watch("gross_salary");
  let gross_allowable_exmeption = watch("gross_allowable_exmeption");
  let gross_taxable_amount = watch("gross_taxable_amount");
  const basic_salary = watch("basic_salary");
  const house_rent_allowance = watch("house_rent_allowance");
  const medical_allowance = watch("medical_allowance");
  const conveyance_allowance = watch("conveyance_allowance");
  const festival_boishakhi_bonus = watch("festival_boishakhi_bonus");
  const advance_due_salary = watch("advance_due_salary");
  const gratuity = watch("gratuity");
  const perquisites = watch("perquisites");
  const any_other_benefit = watch("any_other_benefit");
  const any_payment_addition_salary_wages = watch(
    "any_payment_addition_salary_wages"
  );
  const employee_share_scheme = watch("employee_share_scheme");
  const accomodation_facility = watch("accomodation_facility");
  const transport_facility = watch("transport_facility");
  const company_provided_any_facility = watch("company_provided_any_facility");
  const employer_contribution_to_provident_fund = watch(
    "employer_contribution_to_provident_fund"
  );
  const other_cash_non_cash_facility = watch("other_cash_non_cash_facility");

  const totalNonGovSalary =
    (basic_salary ?? 0) +
    (house_rent_allowance ?? 0) +
    (medical_allowance ?? 0) +
    (conveyance_allowance ?? 0) +
    (festival_boishakhi_bonus ?? 0) +
    (advance_due_salary ?? 0) +
    (gratuity ?? 0) +
    (perquisites ?? 0) +
    (any_other_benefit ?? 0) +
    (any_payment_addition_salary_wages ?? 0) +
    (employee_share_scheme ?? 0) +
    (accomodation_facility ?? 0) +
    (transport_facility ?? 0) +
    (company_provided_any_facility ?? 0) +
    (employer_contribution_to_provident_fund ?? 0) +
    (other_cash_non_cash_facility ?? 0);

  const totalNonGovExemp =
    (house_rent_allowance ?? 0) +
    (medical_allowance ?? 0) +
    (conveyance_allowance ?? 0) +
    (advance_due_salary ?? 0) +
    (gratuity ?? 0);

  const totalNonGovTaxable =
    (basic_salary ?? 0) + (festival_boishakhi_bonus ?? 0);

  if (!isGross) {
    gross_salary =
      (basic_salary ?? 0) +
      (medical_allowance ?? 0) +
      (house_rent_allowance ?? 0) +
      (conveyance_allowance ?? 0);

    //gross_allowable_exmeption = (basic_salary ?? 0) + (medical_allowance ?? 0);
    gross_allowable_exmeption = (totalNonGovSalary > 0) ? Math.floor(totalNonGovSalary / 3) : 0;
    // gross_taxable_amount =
    //   (medical_allowance ?? 0) +
    //   (house_rent_allowance ?? 0) +
    //   (conveyance_allowance ?? 0);
    gross_taxable_amount =
      (totalNonGovSalary > 0) ? (totalNonGovSalary - gross_allowable_exmeption) : null;
  }

  const handleGross = () => {
    setIsGross(!isGross);
    if (isGross) {
      setValue("gross_salary", null);
      setValue("gross_allowable_exmeption", null);
      setValue("gross_taxable_amount", null);
    }
  };

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          {open && message && (
            <ToastCustom message={message} open={open} setOpen={setOpen} />
          )}
          <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <b>Salary BreakDown:</b>
              <Col sm="4" md="4">
                <FormGroup>
                  <Label>Gross Salary</Label>
                  <Input
                    type="number"
                    readOnly={!isGross}
                    className={`${errors?.gross_salary ? "is-invalid" : ""}
                            ${!isGross ? "field-disabled" : ""}
                          `}
                    {...register("gross_salary")}
                    defaultValue={gross_salary}
                    value={gross_salary}
                    onChange={(e) => {
                      setValue("gross_salary", parseFloat(e.target.value));
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="4" md="4">
                <FormGroup>
                  <Label>Allowable Exmeption</Label>
                  <Input
                    type="number"
                    className={`${
                      errors?.gross_allowable_exmeption ? "is-invalid" : ""
                    }
                            ${!isGross ? "field-disabled" : ""}
                          `}
                    {...register("gross_allowable_exmeption")}
                    defaultValue={gross_allowable_exmeption}
                    value={gross_allowable_exmeption}
                    onChange={(e) => {
                      setValue(
                        "gross_allowable_exmeption",
                        parseFloat(e.target.value)
                      );
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="4" md="4">
                <FormGroup>
                  <Label>Taxable Amount</Label>
                  <Input
                    type="number"
                    className={`${
                      errors?.gross_taxable_amount ? "is-invalid" : ""
                    }
                            ${!isGross ? "field-disabled" : ""}
                          `}
                    {...register("gross_taxable_amount")}
                    defaultValue={gross_taxable_amount}
                    value={gross_taxable_amount}
                    onChange={(e) => {
                      setValue(
                        "gross_taxable_amount",
                        parseFloat(e.target.value)
                      );
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="separator-with-expand">
              <span onClick={() => handleGross()}>
                {isGross ? "Expand" : "Collapse"}
                <i
                  className={`icofont icofont-simple-${
                    !isGross ? "up" : "down"
                  }`}
                ></i>
              </span>
            </div>
            {!isGross && (
              <>
                <Row>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Basic Salary</Label>
                      <Input
                        type="number"
                        placeholder="Enter basic salary"
                        className={`${
                          errors?.basic_salary ? "is-invalid" : ""
                        }`}
                        {...register("basic_salary")}
                        defaultValue={basic_salary}
                        onChange={(e) => {
                          setValue("basic_salary", parseFloat(e.target.value));
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder="Enter Allowable Exemption"
                        defaultValue={0}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Taxable Amount</Label>
                      <Input
                        type="number"
                        placeholder="Enter Taxable Amount"
                        defaultValue={basic_salary}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>House Rent Allowance</Label>
                      <Input
                        type="number"
                        placeholder="Enter House Rent Allowance"
                        className={`${
                          errors?.house_rent_allowance ? "is-invalid" : ""
                        }`}
                        {...register("house_rent_allowance")}
                        defaultValue={house_rent_allowance}
                        onChange={(e) => {
                          setValue(
                            "house_rent_allowance",
                            parseFloat(e.target.value)
                          );
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder="Enter Allowable Exemption"
                        defaultValue={house_rent_allowance}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Taxable Income</Label>
                      <Input
                        type="number"
                        placeholder="Enter Taxable Income"
                        defaultValue={0}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Medical Allowance</Label>
                      <Input
                        type="number"
                        placeholder="Enter Medical Allowance"
                        className={`${
                          errors?.medical_allowance ? "is-invalid" : ""
                        }`}
                        {...register("medical_allowance")}
                        defaultValue={medical_allowance}
                        onChange={(e) => {
                          setValue(
                            "medical_allowance",
                            parseFloat(e.target.value)
                          );
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder="Enter Allowable Exemption"
                        defaultValue={medical_allowance}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Taxable Income</Label>
                      <Input
                        type="number"
                        placeholder="Enter Taxable Income"
                        defaultValue={0}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Conveyance Allowance</Label>
                      <Input
                        type="number"
                        placeholder="Enter Conveyance Allowance"
                        className={`${
                          errors?.conveyance_allowance ? "is-invalid" : ""
                        }`}
                        {...register("conveyance_allowance")}
                        defaultValue={conveyance_allowance}
                        onChange={(e) => {
                          setValue(
                            "conveyance_allowance",
                            parseFloat(e.target.value)
                          );
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder="Enter Allowable Exemption"
                        defaultValue={conveyance_allowance}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Taxable Income</Label>
                      <Input
                        type="number"
                        placeholder="Enter Taxable Income"
                        defaultValue={0}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Festival/Boishakhi Bonus</Label>
                      <Input
                        type="number"
                        placeholder="Enter Festival Bonus"
                        className={`${
                          errors?.festival_boishakhi_bonus ? "is-invalid" : ""
                        }`}
                        {...register("festival_boishakhi_bonus")}
                        defaultValue={festival_boishakhi_bonus}
                        onChange={(e) => {
                          setValue(
                            "festival_boishakhi_bonus",
                            parseFloat(e.target.value)
                          );
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder="Enter Allowable Exemption"
                        defaultValue={0}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Taxable Income</Label>
                      <Input
                        type="number"
                        placeholder="Enter Taxable Income"
                        defaultValue={festival_boishakhi_bonus}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <div className="dashed-hr"></div>
                <Row>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Advance/Due Salary</Label>
                      <Input
                        type="number"
                        placeholder="Enter advance/due salary"
                        className={`${
                          errors?.advance_due_salary ? "is-invalid" : ""
                        }`}
                        {...register("advance_due_salary")}
                        defaultValue={advance_due_salary}
                        onChange={(e) => {
                          setValue(
                            "advance_due_salary",
                            parseFloat(e.target.value)
                          );
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder="Enter Allowable Exemption"
                        defaultValue={advance_due_salary}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Taxable Income</Label>
                      <Input
                        type="number"
                        placeholder="Enter Taxable Income"
                        defaultValue={0}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>
                        Gratuity, Annuity, Pension or similar benefit
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter Interest Receive On Provident Fund"
                        className={`${errors?.gratuity ? "is-invalid" : ""}`}
                        {...register("gratuity")}
                        defaultValue={gratuity}
                        onChange={(e) => {
                          setValue("gratuity", parseFloat(e.target.value));
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder="Enter Allowable Exemption"
                        defaultValue={gratuity}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Taxable Income</Label>
                      <Input
                        type="number"
                        placeholder="Enter Taxable Income"
                        defaultValue={0}
                      />
                    </FormGroup>
                  </Col>
                  {/*  new row collapse */}
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Prequisites</Label>
                      <Input
                        type="number"
                        placeholder="Enter Advance/Due Salary"
                        className={`${errors?.perquisites ? "is-invalid" : ""}`}
                        {...register("perquisites")}
                        defaultValue={perquisites}
                        onChange={(e) => {
                          setValue("perquisites", parseFloat(e.target.value));
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder="Enter Allowable Exemption"
                        defaultValue={perquisites}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Taxable Income</Label>
                      <Input
                        type="number"
                        placeholder="Enter Taxable Income"
                        defaultValue={0}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Any Other benefit</Label>
                      <Input
                        type="number"
                        placeholder="Enter Special Staff Allowance"
                        className={`${
                          errors?.any_other_benefit ? "is-invalid" : ""
                        }`}
                        {...register("any_other_benefit")}
                        defaultValue={any_other_benefit}
                        onChange={(e) => {
                          setValue(
                            "any_other_benefit",
                            parseFloat(e.target.value)
                          );
                        }}
                      />
                    </FormGroup>
                  </Col>

                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder="Enter Allowable Exemption"
                        defaultValue={any_other_benefit}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Taxable Income</Label>
                      <Input
                        type="number"
                        placeholder="Enter Taxable Income"
                        defaultValue={0}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <div className="separator-with-expand">
                  <span onClick={() => setAnyPaymentExpand(!anyPaymentExpand)}>
                    {anyPaymentExpand ? "Expand" : "Collapse"}
                    <i
                      className={`icofont icofont-simple-${
                        !anyPaymentExpand ? "up" : "down"
                      }`}
                    ></i>
                  </span>
                </div>
                {!anyPaymentExpand && (
                  <Row>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Any payment in addition to salary/wages</Label>
                        <Input
                          type="number"
                          placeholder="Enter Leave Allowance"
                          className={`${
                            errors?.any_payment_addition_salary_wages
                              ? "is-invalid"
                              : ""
                          }`}
                          {...register("any_payment_addition_salary_wages")}
                          defaultValue={any_payment_addition_salary_wages}
                          onChange={(e) => {
                            setValue(
                              "any_payment_addition_salary_wages",
                              parseFloat(e.target.value)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Allowable Exemption</Label>
                        <Input
                          type="number"
                          placeholder="Enter Allowable Exemption"
                          defaultValue={any_payment_addition_salary_wages}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Taxable Income</Label>
                        <Input
                          type="number"
                          placeholder="Enter Taxable Income"
                          defaultValue={0}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Income from Employee's share scheme</Label>
                        <Input
                          type="number"
                          placeholder="Enter Honorarium/Reward"
                          className={`${
                            errors?.employee_share_scheme ? "is-invalid" : ""
                          }`}
                          {...register("employee_share_scheme")}
                          defaultValue={employee_share_scheme}
                          onChange={(e) => {
                            setValue(
                              "employee_share_scheme",
                              parseFloat(e.target.value)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Allowable Exemption</Label>
                        <Input
                          type="number"
                          placeholder="Enter Allowable Exemption"
                          defaultValue={employee_share_scheme}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Taxable Income</Label>
                        <Input
                          type="number"
                          placeholder="Enter Taxable Income"
                          defaultValue={0}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Company provided accomodation facility</Label>
                        <Input
                          type="number"
                          placeholder="Enter Over Time Allowance"
                          className={`${
                            errors?.accomodation_facility ? "is-invalid" : ""
                          }`}
                          {...register("accomodation_facility")}
                          defaultValue={accomodation_facility}
                          onChange={(e) => {
                            setValue(
                              "accomodation_facility",
                              parseFloat(e.target.value)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Allowable Exemption</Label>
                        <Input
                          type="number"
                          placeholder="Enter Allowable Exemption"
                          defaultValue={accomodation_facility}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Taxable Income</Label>
                        <Input
                          type="number"
                          placeholder="Enter Taxable Income"
                          defaultValue={0}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Company provided transport facility</Label>
                        <Input
                          type="number"
                          placeholder="Enter LumpSum Grant"
                          className={`${
                            errors?.transport_facility ? "is-invalid" : ""
                          }`}
                          {...register("transport_facility")}
                          defaultValue={transport_facility}
                          onChange={(e) => {
                            setValue(
                              "transport_facility",
                              parseFloat(e.target.value)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Allowable Exemption</Label>
                        <Input
                          type="number"
                          placeholder="Enter Allowable Exemption"
                          defaultValue={transport_facility}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Taxable Income</Label>
                        <Input
                          type="number"
                          placeholder="Enter Taxable Income"
                          defaultValue={0}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Company provided any other facility</Label>
                        <Input
                          type="number"
                          placeholder="Enter value"
                          className={`${
                            errors?.company_provided_any_facility
                              ? "is-invalid"
                              : ""
                          }`}
                          {...register("company_provided_any_facility")}
                          defaultValue={company_provided_any_facility}
                          onChange={(e) => {
                            setValue(
                              "company_provided_any_facility",
                              parseFloat(e.target.value)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Allowable Exemption</Label>
                        <Input
                          type="number"
                          placeholder="Enter Allowable Exemption"
                          defaultValue={any_other_benefit}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Taxable Income</Label>
                        <Input
                          type="number"
                          placeholder="Enter Taxable Income"
                          defaultValue={0}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Employer's contribution to provident fund</Label>
                        <Input
                          type="number"
                          placeholder="Enter Any Other Allowance, If Any"
                          className={`${
                            errors?.employer_contribution_to_provident_fund
                              ? "is-invalid"
                              : ""
                          }`}
                          {...register(
                            "employer_contribution_to_provident_fund"
                          )}
                          defaultValue={employer_contribution_to_provident_fund}
                          onChange={(e) => {
                            setValue(
                              "employer_contribution_to_provident_fund",
                              parseFloat(e.target.value)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Allowable Exemption</Label>
                        <Input
                          type="number"
                          placeholder="Enter Allowable Exemption"
                          defaultValue={employer_contribution_to_provident_fund}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Taxable Income</Label>
                        <Input
                          type="number"
                          placeholder="Enter Taxable Income"
                          defaultValue={0}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Other cash/non-cash facility </Label>
                        <Input
                          type="number"
                          placeholder="Enter Any Other Allowance, If Any"
                          className={`${
                            errors?.other_cash_non_cash_facility
                              ? "is-invalid"
                              : ""
                          }`}
                          {...register("other_cash_non_cash_facility")}
                          defaultValue={other_cash_non_cash_facility}
                          onChange={(e) => {
                            setValue(
                              "other_cash_non_cash_facility",
                              parseFloat(e.target.value)
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Allowable Exemption</Label>
                        <Input
                          type="number"
                          placeholder="Enter Allowable Exemption"
                          defaultValue={other_cash_non_cash_facility}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6" md="4">
                      <FormGroup>
                        <Label>Taxable Income</Label>
                        <Input
                          type="number"
                          placeholder="Enter Taxable Income"
                          defaultValue={0}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {!anyPaymentExpand && <div className="dashed-hr"></div>}
                <Row>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Total</Label>
                      <Input
                        type="number"
                        placeholder="Total"
                        defaultValue={totalNonGovSalary}
                        value={totalNonGovSalary}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Total Allowable Exemption</Label>
                      <Input
                        type="number"
                        placeholder=" Total Allowable Exemption"
                        defaultValue={totalNonGovExemp}
                        value={totalNonGovExemp}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6" md="4">
                    <FormGroup>
                      <Label>Total Taxable Income</Label>
                      <Input
                        type="number"
                        placeholder=" Total Taxable Income"
                        defaultValue={totalNonGovTaxable}
                        value={totalNonGovTaxable}
                        disabled
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
              type={saveLoading ? `button` : `submit`}
              onClick={() => handleSubmit(onSubmit)}
            >
              {saveLoading ? "Saving..." : "Save"}
            </Btn>
          </Form>
        </>
      )}
    </>
  );
};

export default NonGovernment;
