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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Btn } from "../../../../AbstractElements";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import ExpenseTop from "./ExpenseTop";
import { expenseTotalData } from "../../../../utils/helpers";
import { expense } from "../../../../Store/Slices/PastReturnTotalSlice";

interface PropertyItem {
  id?: string;
  institutional_loan: number;
  non_institutional_loan: number;
  other_loan: number;
}

const FinanceExpense: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const expenseData = useSelector((state: any) => state?.pastReturn?.expenseData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [id, setId] = useState<string>("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<PropertyItem>({
    defaultValues: {
      institutional_loan: 0,
      non_institutional_loan: 0,
      other_loan: 0,
    },
  });

  const onSubmit = async (inputData: PropertyItem) => {
    setSaveLoading(true);
    const payload = { ...inputData, user_id: userInfo.id };
    try {
      const res = id
        ? await patchRequest(`finance-expenses/${id}`, payload)
        : await postRequest(`finance-expenses`, payload);

      setId(res.data.id);
      updateHeadData(res.data);
      setMessage("Successfully Updated");
      setOpen(true);
    } catch (error) {
      setMessage("Something went wrong");
      setOpen(true);
    } finally {
      setSaveLoading(false);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getRequest(`finance-expenses`);
      if (res?.data?.length === 1) {
        const fetchedData = res.data[0];
        setId(fetchedData.id);

        // Use reset to populate all form fields with fetched data
        reset({
          institutional_loan: fetchedData.institutional_loan || 0,
          non_institutional_loan: fetchedData.non_institutional_loan || 0,
          other_loan: fetchedData.other_loan || 0,
        });
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { institutional_loan, non_institutional_loan, other_loan } = watch();

  const total = [
    institutional_loan || 0,
    non_institutional_loan || 0,
    other_loan || 0,
  ].reduce((acc, val) => acc + val, 0);

  const updateHeadData = (updatedData: any) => {
    const result = [
      updatedData?.institutional_loan || 0,
      updatedData?.non_institutional_loan || 0,
      updatedData?.other_loan || 0
    ].reduce((acc, val) => acc + val, 0);

    const updatedState = {
      ...expenseData,
      finance: result,
      total: expenseTotalData({ ...expenseData, finance: result })
    };
    dispatch(expense(updatedState));
  }

  return (
    <Col xl="9">
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <ExpenseTop
          title={"Total Financial Expenses"}
          itemName={'finance'}
        />
        <Card className="profile-right">
          <CardHeaderCommon
            title="Finance Expenses"
            tagClass="card-title mb-0"
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
                <Row>
                  <h3> Interest Paid</h3>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Institutional Loan</Label>
                      <Input
                        type="number"
                        placeholder="Enter Institutional Loan"
                        className={
                          errors.institutional_loan ? "is-invalid" : ""
                        }
                        {...register("institutional_loan", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("institutional_loan", +e.target.value);
                          },
                        })}
                        defaultValue={institutional_loan}
                      />
                      <span className="text-danger">
                        {errors["institutional_loan"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Non - Institutional Loan</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Non - Institutional Loan`}
                        className={
                          errors["non_institutional_loan"] ? "is-invalid" : ""
                        }
                        {...register("non_institutional_loan", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("non_institutional_loan", +e.target.value);
                          },
                        })}
                        defaultValue={non_institutional_loan}
                      />
                      <span className="text-danger">
                        {errors["non_institutional_loan"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Other Loan</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Other Loan`}
                        className={errors["other_loan"] ? "is-invalid" : ""}
                        {...register("other_loan", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("other_loan", +e.target.value);
                          },
                        })}
                        defaultValue={other_loan}
                      />
                      <span className="text-danger">
                        {errors["other_loan"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Total</Label>
                      <Input type="number" value={total} disabled readOnly />
                    </FormGroup>
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
              </>
            )}
          </CardBody>
          <CardFooter className="text-end"></CardFooter>
        </Card>
      </Form>
    </Col>
  );
};

export default FinanceExpense;
