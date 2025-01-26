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
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  patchRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
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

const Government = ({
  id,
  setId,
  salaryIncome,
  isSalaryIncome,
  topDataUpdate
}: NonGovernmentProps) => {
  let userInfo = useSelector((state: any) => state.auth.data);
  const [loading, setLoading] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const [anyPaymentExpand, setAnyPaymentExpand] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({
    defaultValues: {
      basic_salary: salaryIncome?.basic_salary || null,
      house_rent_allowance: salaryIncome?.house_rent_allowance || null,
      medical_allowance: salaryIncome?.medical_allowance || null,
      conveyance_allowance: salaryIncome?.conveyance_allowance || null,
      festival_bonus: salaryIncome?.festival_bonus || null,
      bangla_noboborsho_allowance:
        salaryIncome?.bangla_noboborsho_allowance || null,
      interest_receivable_on_provident_fund:
        salaryIncome?.interest_receivable_on_provident_fund || null,
      advance_due_salary: salaryIncome?.advance_due_salary || null,
      special_staff_allowance: salaryIncome?.special_staff_allowance || null,
      leave_allowance: salaryIncome?.leave_allowance || null,
      honorarium_reward: salaryIncome?.honorarium_reward || null,
      overtime_allowance: salaryIncome?.overtime_allowance || null,
      lump_sum_grant: salaryIncome?.lump_sum_grant || null,
      gratuity: salaryIncome?.gratuity || null,
      any_other_allowance: salaryIncome?.any_other_allowance || null,
      total: salaryIncome?.total || null,
      total_allowable_exemption: salaryIncome?.total_allowable_exemption || null,
      total_taxable_income: salaryIncome?.total_taxable_income || null
    },
  });

  const basic_salary = watch("basic_salary");
  const house_rent_allowance = watch("house_rent_allowance");
  const medical_allowance = watch("medical_allowance");
  const conveyance_allowance = watch("conveyance_allowance");
  const festival_bonus = watch("festival_bonus");
  const bangla_noboborsho_allowance = watch("bangla_noboborsho_allowance");
  const interest_receivable_on_provident_fund = watch(
    "interest_receivable_on_provident_fund"
  );
  const advance_due_salary = watch("advance_due_salary");
  const gratuity = watch("gratuity");
  const special_staff_allowance = watch("special_staff_allowance");
  const leave_allowance = watch("leave_allowance");
  const honorarium_reward = watch("honorarium_reward");
  const overtime_allowance = watch("overtime_allowance");
  const lump_sum_grant = watch("lump_sum_grant");
  const any_other_allowance = watch("any_other_allowance");

  const totalGovSalary =
    (basic_salary ?? 0) +
    (house_rent_allowance ?? 0) +
    (medical_allowance ?? 0) +
    (conveyance_allowance ?? 0) +
    (festival_bonus ?? 0) +
    (bangla_noboborsho_allowance ?? 0) +
    (interest_receivable_on_provident_fund ?? 0) +
    (advance_due_salary ?? 0) +
    (special_staff_allowance ?? 0) +
    (leave_allowance ?? 0) +
    (gratuity ?? 0) +
    (honorarium_reward ?? 0) +
    (overtime_allowance ?? 0) +
    (lump_sum_grant ?? 0) +
    (any_other_allowance ?? 0);

  const totalGovExemp =
    (house_rent_allowance ?? 0) +
    (medical_allowance ?? 0) +
    (conveyance_allowance ?? 0) +
    (bangla_noboborsho_allowance ?? 0) +
    (interest_receivable_on_provident_fund ?? 0) +
    (advance_due_salary ?? 0) +
    (special_staff_allowance ?? 0) +
    (leave_allowance ?? 0) +
    (honorarium_reward ?? 0) +
    (overtime_allowance ?? 0) +
    (lump_sum_grant ?? 0) +
    (any_other_allowance ?? 0);

  const totalGovTaxable = (basic_salary ?? 0) + (festival_bonus ?? 0);

  const onSubmit: SubmitHandler<GovernmentIncome> = async (inputData: any) => {
    try {
      setSaveLoading(true);
      inputData["employee_type"] = "government";
      inputData["user_id"] = userInfo.id;
      inputData["is_salary_income"] = isSalaryIncome;
      inputData["total"] = totalGovSalary;
      inputData["total_allowable_exemption"] = totalGovExemp;
      inputData["total_taxable_income"] = totalGovTaxable;

      const response = id
        ? await patchRequest(`income-entries/${id}`, {
          user_id: userInfo.id,
          salary_income: inputData,
        })
        : await postRequest(`income-entries`, {
          user_id: userInfo.id,
          salary_income: inputData,
        });

      setId(response?.data?.id);
      topDataUpdate(totalGovSalary);
      setSaveLoading(false);
      setMessage("Successfully Updated");
      setOpen(true);
    } catch (error) {
      setSaveLoading(false);
      setMessage("Something went wrong");
      setOpen(true);
    }
  };

  useEffect(() => {
    if (salaryIncome) {
      if (salaryIncome) {
        Object.entries(salaryIncome).forEach(([key, value]) => {
          setValue(key, value || null);
        });
      }
    }

    //   setValue(
    //     "basic_salary",
    //     parseInt(salaryIncome?.basic_salary, 10) || null
    //   );
    //   setValue(
    //     "house_rent_allowance",
    //     parseInt(salaryIncome?.house_rent_allowance, 10) || null
    //   );
    //   setValue(
    //     "medical_allowance",
    //     parseInt(salaryIncome?.medical_allowance, 10) || null
    //   );
    //   setValue(
    //     "conveyance_allowance",
    //     parseInt(salaryIncome?.conveyance_allowance, 10) || null
    //   );
    //   setValue(
    //     "festival_bonus",
    //     parseInt(salaryIncome?.festival_bonus, 10) || null
    //   );
    //   setValue(
    //     "bangla_noboborsho_allowance",
    //     parseInt(salaryIncome?.bangla_noboborsho_allowance, 10) || null
    //   );
    //   setValue(
    //     "interest_receivable_on_provident_fund",
    //     parseInt(salaryIncome?.interest_receivable_on_provident_fund, 10) ||
    //       null
    //   );
    //   setValue(
    //     "advance_due_salary",
    //     parseInt(salaryIncome?.advance_due_salary, 10) || null
    //   );
    //   setValue(
    //     "special_staff_allowance",
    //     parseInt(salaryIncome?.special_staff_allowance, 10) || null
    //   );
    //   setValue(
    //     "leave_allowance",
    //     parseInt(salaryIncome?.leave_allowance, 10) || null
    //   );
    //   setValue(
    //     "honorarium_reward",
    //     parseInt(salaryIncome?.honorarium_reward, 10) || null
    //   );
    //   setValue(
    //     "overtime_allowance",
    //     parseInt(salaryIncome?.overtime_allowance, 10) || null
    //   );
    //   setValue(
    //     "lump_sum_grant",
    //     parseInt(salaryIncome?.lump_sum_grant, 10) || null
    //   );
    //   setValue("gratuity", parseInt(salaryIncome?.gratuity, 10) || null);
    //   setValue(
    //     "any_other_allowance",
    //     parseInt(salaryIncome?.any_other_allowance, 10) || null
    //   );
    // }
  }, [salaryIncome]);

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
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Basic Salary</Label>
                  <Input
                    type="number"
                    placeholder="Enter basic salary"
                    className={`${errors.basic_salary ? "is-invalid" : ""}`}
                    {...register("basic_salary")}
                    defaultValue={basic_salary}
                    onChange={(e) =>
                      setValue("basic_salary", parseInt(e.target.value))
                    }
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Allowable Exemption</Label>
                  <Input
                    type="number"
                    disabled
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
                    disabled
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
                    className={`${errors?.house_rent_allowance ? "is-invalid" : ""
                      }`}
                    {...register("house_rent_allowance", {
                      maxLength: {
                        value: 200,
                        message: "Maximum length is 30 characters",
                      },
                    })}
                    defaultValue={house_rent_allowance}
                    onChange={(e) => {
                      setValue(
                        "house_rent_allowance",
                        parseInt(e.target.value)
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
                    disabled
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
                    disabled
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
                    className={`${errors?.medical_allowance ? "is-invalid" : ""
                      }`}
                    {...register("medical_allowance", {
                      maxLength: {
                        value: 200,
                        message: "Maximum length is 30 characters",
                      },
                    })}
                    defaultValue={medical_allowance}
                    onChange={(e) => {
                      setValue("medical_allowance", parseInt(e.target.value));
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Allowable Exemption</Label>
                  <Input
                    type="number"
                    disabled
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
                    disabled
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
                    className={`${errors?.conveyance_allowance ? "is-invalid" : ""
                      }`}
                    {...register("conveyance_allowance", {
                      maxLength: {
                        value: 200,
                        message: "Maximum length is 30 characters",
                      },
                    })}
                    defaultValue={conveyance_allowance}
                    onChange={(e) => {
                      setValue(
                        "conveyance_allowance",
                        parseInt(e.target.value)
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
                    disabled
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
                    disabled
                    placeholder="Enter Taxable Income"
                    defaultValue={0}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Festival Bonus</Label>
                  <Input
                    type="number"
                    placeholder="Enter Festival Bonus"
                    className={`${errors?.festival_bonus ? "is-invalid" : ""}`}
                    {...register("festival_bonus", {
                      maxLength: {
                        value: 200,
                        message: "Maximum length is 30 characters",
                      },
                    })}
                    defaultValue={festival_bonus}
                    onChange={(e) => {
                      setValue("festival_bonus", parseInt(e.target.value));
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Allowable Exemption</Label>
                  <Input
                    type="number"
                    disabled
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
                    disabled
                    placeholder="Enter Taxable Income"
                    defaultValue={festival_bonus}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Bangla Noboborsho Allowance</Label>
                  <Input
                    type="number"
                    placeholder="Enter Bangla Noboborsho Allowance"
                    className={`${errors?.bangla_noboborsho_allowance ? "is-invalid" : ""
                      }`}
                    {...register("bangla_noboborsho_allowance", {
                      maxLength: {
                        value: 200,
                        message: "Maximum length is 30 characters",
                      },
                    })}
                    defaultValue={bangla_noboborsho_allowance}
                    onChange={(e) => {
                      setValue(
                        "bangla_noboborsho_allowance",
                        parseInt(e.target.value)
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
                    disabled
                    placeholder="Enter Allowable Exemption"
                    defaultValue={bangla_noboborsho_allowance}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Taxable Income</Label>
                  <Input
                    type="number"
                    disabled
                    placeholder="Enter Taxable Income"
                    defaultValue={0}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Interest Receivale On Provident Fund</Label>
                  <Input
                    type="number"
                    placeholder="Enter Interest Receive On Provident Fund"
                    className={`${errors?.interest_receivable_on_provident_fund
                      ? "is-invalid"
                      : ""
                      }`}
                    {...register("interest_receivable_on_provident_fund", {
                      maxLength: {
                        value: 200,
                        message: "Maximum length is 30 characters",
                      },
                    })}
                    defaultValue={interest_receivable_on_provident_fund}
                    onChange={(e) => {
                      setValue(
                        "interest_receivable_on_provident_fund",
                        parseInt(e.target.value)
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
                    disabled
                    placeholder="Enter Allowable Exemption"
                    defaultValue={interest_receivable_on_provident_fund}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Taxable Income</Label>
                  <Input
                    type="number"
                    disabled
                    placeholder="Enter Taxable Income"
                    defaultValue={0}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="separator-with-expand">
              <span onClick={() => setIsMore(!isMore)}>
                {isMore ? "Collapse" : "Expand"}
                <i
                  className={`icofont icofont-simple-${isMore ? "up" : "down"}`}
                ></i>
              </span>
            </div>
            {isMore && (
              <Row>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Advance/Due Salary</Label>
                    <Input
                      type="number"
                      placeholder="Enter Advance/Due Salary"
                      className={`${errors?.advance_due_salary ? "is-invalid" : ""
                        }`}
                      {...register("advance_due_salary", {
                        maxLength: {
                          value: 200,
                          message: "Maximum length is 30 characters",
                        },
                      })}
                      defaultValue={advance_due_salary}
                      onChange={(e) => {
                        setValue(
                          "advance_due_salary",
                          parseInt(e.target.value)
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
                      disabled
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
                      disabled
                      placeholder="Enter Taxable Income"
                      defaultValue={0}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Special Staff Allowance</Label>
                    <Input
                      type="number"
                      placeholder="Enter Special Staff Allowance"
                      className={`${errors?.special_staff_allowance ? "is-invalid" : ""
                        }`}
                      {...register("special_staff_allowance", {
                        maxLength: {
                          value: 200,
                          message: "Maximum length is 30 characters",
                        },
                      })}
                      defaultValue={special_staff_allowance}
                      onChange={(e) => {
                        setValue(
                          "special_staff_allowance",
                          parseInt(e.target.value)
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
                      disabled
                      placeholder="Enter Allowable Exemption"
                      defaultValue={special_staff_allowance}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Taxable Income</Label>
                    <Input
                      type="number"
                      disabled
                      placeholder="Enter Taxable Income"
                      defaultValue={0}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Leave Allowance</Label>
                    <Input
                      type="number"
                      placeholder="Enter Leave Allowance"
                      className={`${errors?.leave_allowance ? "is-invalid" : ""
                        }`}
                      {...register("leave_allowance")}
                      defaultValue={leave_allowance}
                      onChange={(e) => {
                        setValue("leave_allowance", parseInt(e.target.value));
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Allowable Exemption</Label>
                    <Input
                      type="number"
                      disabled
                      placeholder="Enter Allowable Exemption"
                      defaultValue={leave_allowance}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Taxable Income</Label>
                    <Input
                      type="number"
                      disabled
                      placeholder="Enter Taxable Income"
                      defaultValue={0}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Honorarium/Reward</Label>
                    <Input
                      type="number"
                      placeholder="Enter Honorarium/Reward"
                      className={`${errors?.honorarium_reward ? "is-invalid" : ""
                        }`}
                      {...register("honorarium_reward", {
                        maxLength: {
                          value: 200,
                          message: "Maximum length is 30 characters",
                        },
                      })}
                      defaultValue={honorarium_reward}
                      onChange={(e) => {
                        setValue("honorarium_reward", parseInt(e.target.value));
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Allowable Exemption</Label>
                    <Input
                      type="number"
                      disabled
                      placeholder="Enter Allowable Exemption"
                      defaultValue={honorarium_reward}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Taxable Income</Label>
                    <Input
                      type="number"
                      disabled
                      placeholder="Enter Taxable Income"
                      defaultValue={0}
                    />
                  </FormGroup>
                </Col>

                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Over Time Allowance</Label>
                    <Input
                      type="number"
                      placeholder="Enter Over Time Allowance"
                      className={`${errors?.overtime_allowance ? "is-invalid" : ""
                        }`}
                      {...register("overtime_allowance", {
                        maxLength: {
                          value: 200,
                          message: "Maximum length is 30 characters",
                        },
                      })}
                      defaultValue={overtime_allowance}
                      onChange={(e) => {
                        setValue(
                          "overtime_allowance",
                          parseInt(e.target.value)
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
                      disabled
                      placeholder="Enter Allowable Exemption"
                      defaultValue={overtime_allowance}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Taxable Income</Label>
                    <Input
                      type="number"
                      disabled
                      placeholder="Enter Taxable Income"
                      defaultValue={0}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>LumpSum Grant</Label>
                    <Input
                      type="number"
                      placeholder="Enter LumpSum Grant"
                      className={`${errors?.lump_sum_grant ? "is-invalid" : ""
                        }`}
                      {...register("lump_sum_grant", {
                        maxLength: {
                          value: 200,
                          message: "Maximum length is 30 characters",
                        },
                      })}
                      defaultValue={lump_sum_grant}
                      onChange={(e) => {
                        setValue("lump_sum_grant", parseInt(e.target.value));
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Allowable Exemption</Label>
                    <Input
                      type="number"
                      disabled
                      placeholder="Enter Allowable Exemption"
                      value={lump_sum_grant}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Taxable Income</Label>
                    <Input
                      type="number"
                      disabled
                      placeholder="Enter Taxable Income"
                      value={0}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Gratuity</Label>
                    <Input
                      type="number"
                      placeholder="Enter Gratuity"
                      className={`${errors?.gratuity ? "is-invalid" : ""}`}
                      {...register("gratuity", {
                        maxLength: {
                          value: 200,
                          message: "Maximum length is 30 characters",
                        },
                      })}
                      defaultValue={gratuity}
                      onChange={(e) => {
                        setValue("gratuity", parseInt(e.target.value));
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Allowable Exemption</Label>
                    <Input
                      type="number"
                      disabled
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
                      disabled
                      placeholder="Enter Taxable Income"
                      defaultValue={0}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Any Other Allowance, If Any</Label>
                    <Input
                      type="number"
                      placeholder="Enter Any Other Allowance, If Any"
                      className={`${errors?.any_other_allowance ? "is-invalid" : ""
                        }`}
                      {...register("any_other_allowance")}
                      defaultValue={any_other_allowance}
                      onChange={(e) => {
                        setValue(
                          "any_other_allowance",
                          parseInt(e.target.value)
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
                      disabled
                      placeholder="Enter Allowable Exemption"
                      defaultValue={any_other_allowance}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Taxable Income</Label>
                    <Input
                      type="number"
                      disabled
                      placeholder="Enter Taxable Income"
                      defaultValue={0}
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}
            {isMore && <div className="dashed-hr"></div>}
            <Row>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Total</Label>
                  <Input
                    type="number"
                    disabled
                    placeholder="Total"
                    value={totalGovSalary}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Total Allowable Exemption</Label>
                  <Input
                    type="number"
                    disabled
                    placeholder=" Total Allowable Exemption"
                    value={totalGovExemp}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="4">
                <FormGroup>
                  <Label>Total Taxable Income</Label>
                  <Input
                    type="number"
                    disabled
                    placeholder=" Total Taxable Income"
                    value={totalGovTaxable}
                  />
                </FormGroup>
              </Col>
            </Row>
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

export default Government;
