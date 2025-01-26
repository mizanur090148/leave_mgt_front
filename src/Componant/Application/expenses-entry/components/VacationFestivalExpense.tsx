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
  local_travel: number;
  foreign_travel: number;
  other_entertainment: number;
  religious_festive_expense: number;
  anniversary_expense: number;
  birthday_expense: number;
}

const VacationFestivalExpense = () => {
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
      local_travel: 0,
      foreign_travel: 0,
      other_entertainment: 0,
      religious_festive_expense: 0,
      anniversary_expense: 0,
      birthday_expense: 0,
    },
  });

  const onSubmit = async (inputData: PropertyItem) => {
    setSaveLoading(true);
    const payload = { ...inputData, user_id: userInfo.id };
    try {
      const res = id
        ? await patchRequest(`vacation-festival-expenses/${id}`, payload)
        : await postRequest(`vacation-festival-expenses`, payload);

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
      const res = await getRequest(`vacation-festival-expenses`);
      if (res?.data?.length === 1) {
        const fetchedData = res.data[0];
        setId(fetchedData.id);

        // Use reset to populate all form fields with fetched data
        reset({
          local_travel: fetchedData.local_travel || 0,
          foreign_travel: fetchedData.foreign_travel || 0,
          other_entertainment: fetchedData.other_entertainment || 0,
          religious_festive_expense: fetchedData.religious_festive_expense || 0,
          anniversary_expense: fetchedData.anniversary_expense || 0,
          birthday_expense: fetchedData.birthday_expense || 0,
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

  const {
    local_travel,
    foreign_travel,
    other_entertainment,
    religious_festive_expense,
    anniversary_expense,
    birthday_expense,
  } = watch();

  const vacationTotal = [
    local_travel || 0,
    foreign_travel || 0,
    other_entertainment || 0,
  ].reduce((acc, val) => acc + val, 0);

  const festivalTotal = [
    religious_festive_expense || 0,
    anniversary_expense || 0,
    birthday_expense || 0,
  ].reduce((acc, val) => acc + val, 0);

  const updateHeadData = (updatedData: any) => {
    const result = [
      updatedData?.local_travel || 0,
      updatedData?.foreign_travel || 0,
      updatedData?.other_entertainment || 0,
      updatedData?.religious_festive_expense || 0,
      updatedData?.anniversary_expense || 0,
      updatedData?.birthday_expense || 0,
    ].reduce((acc, val) => acc + val, 0);

    const updatedState = {
      ...expenseData,
      vacation_festival: result,
      total: expenseTotalData({ ...expenseData, vacation_festival: result })
    };
    dispatch(expense(updatedState));
  }

  return (
    <Col xl="9">
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <ExpenseTop
          title={"Total Festival Expenses"}
          itemName={'vacation_festival'}
        />
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Vacation & Festival Expenses"}
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
                <Row>
                  <b> Vacation & Entertainment</b>
                </Row>
                <Row>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Local Travel</Label>
                      <Input
                        type="number"
                        placeholder=" Local Travel"
                        className={errors.local_travel ? "is-invalid" : ""}
                        {...register("local_travel", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("local_travel", +e.target.value);
                          },
                        })}
                        defaultValue={local_travel}
                      />
                      <span className="text-danger">
                        {errors["local_travel"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Foreign Travel</Label>
                      <Input
                        type="number"
                        placeholder=" Foreign Travel"
                        className={errors.foreign_travel ? "is-invalid" : ""}
                        {...register("foreign_travel", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("foreign_travel", +e.target.value);
                          },
                        })}
                        defaultValue={foreign_travel}
                      />
                      <span className="text-danger">
                        {errors["foreign_travel"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Other Entertainment</Label>
                      <Input
                        type="number"
                        placeholder=" Other Entertainment"
                        className={
                          errors.other_entertainment ? "is-invalid" : ""
                        }
                        {...register("other_entertainment", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("other_entertainment", +e.target.value);
                          },
                        })}
                        defaultValue={other_entertainment}
                      />
                      <span className="text-danger">
                        {errors["other_entertainment"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Total</Label>
                      <Input
                        type="number"
                        placeholder="Total"
                        value={vacationTotal}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mt-2 mb-1">
                  <b> Festival & Other Occasional Expenses</b>
                </Row>
                <Row>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Religious Festival Expenses</Label>
                      <Input
                        type="number"
                        placeholder="Religious Festival Expenses"
                        className={
                          errors.religious_festive_expense ? "is-invalid" : ""
                        }
                        {...register("religious_festive_expense", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue(
                              "religious_festive_expense",
                              +e.target.value
                            );
                          },
                        })}
                        defaultValue={religious_festive_expense}
                      />
                      <span className="text-danger">
                        {errors["religious_festive_expense"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>

                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Anniversary Expenses</Label>
                      <Input
                        type="number"
                        placeholder=" Anniversary Expenses"
                        className={
                          errors.anniversary_expense ? "is-invalid" : ""
                        }
                        {...register("anniversary_expense", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("anniversary_expense", +e.target.value);
                          },
                        })}
                        defaultValue={anniversary_expense}
                      />
                      <span className="text-danger">
                        {errors["anniversary_expense"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Birthday Expenses</Label>
                      <Input
                        type="number"
                        placeholder=" Birthday Expenses"
                        className={errors.birthday_expense ? "is-invalid" : ""}
                        {...register("birthday_expense", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("birthday_expense", +e.target.value);
                          },
                        })}
                        defaultValue={birthday_expense}
                      />
                      <span className="text-danger">
                        {errors["birthday_expense"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Total</Label>
                      <Input
                        type="number"
                        placeholder=" Total"
                        value={festivalTotal}
                        disabled
                      />
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

export default VacationFestivalExpense;
