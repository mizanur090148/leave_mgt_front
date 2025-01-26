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
  tution_fees: number;
  exam_fees: number;
  private_tutor_salary: number;
  books_periodicals: number;
  uniform_shoes: number;
}

const EducationExpense: React.FC = () => {
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
      tution_fees: 0,
      exam_fees: 0,
      private_tutor_salary: 0,
      books_periodicals: 0,
      uniform_shoes: 0,
    },
  });

  const onSubmit = async (inputData: PropertyItem) => {
    setSaveLoading(true);

    const payload = { ...inputData, user_id: userInfo.id };

    try {
      const res = id
        ? await patchRequest(`education-expenses/${id}`, payload)
        : await postRequest(`education-expenses`, payload);

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
      const res = await getRequest(`education-expenses`);
      if (res?.data?.length === 1) {
        const fetchedData = res.data[0];
        setId(fetchedData.id);

        // Use reset to populate all form fields with fetched data
        reset({
          tution_fees: fetchedData.tution_fees || 0,
          exam_fees: fetchedData.exam_fees || 0,
          private_tutor_salary: fetchedData.private_tutor_salary || 0,
          books_periodicals: fetchedData.books_periodicals || 0,
          uniform_shoes: fetchedData.uniform_shoes || 0,
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
    tution_fees,
    exam_fees,
    private_tutor_salary,
    books_periodicals,
    uniform_shoes,
  } = watch();

  const total = [
    tution_fees || 0,
    exam_fees || 0,
    private_tutor_salary || 0,
    books_periodicals || 0,
    uniform_shoes || 0,
  ].reduce((acc, val) => acc + val, 0);

  const updateHeadData = (updatedData: any) => {
    const result = [
      updatedData?.tution_fees || 0,
      updatedData?.exam_fees || 0,
      updatedData?.private_tutor_salary || 0,
      updatedData?.books_periodicals || 0,
      updatedData?.uniform_shoes || 0,
    ].reduce((acc, val) => acc + val, 0);

    const updatedState = {
      ...expenseData,
      education: result,
      total: expenseTotalData({ ...expenseData, education: result })
    };
    dispatch(expense(updatedState));
  }

  return (
    <Col xl="9">
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <ExpenseTop
          title={"Total Educational Expenses"}
          itemName={'education'}
        />
        <Card className="profile-right">
          <CardHeaderCommon
            title="Self & Family Expenses"
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
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Tution Fees</Label>
                      <Input
                        type="number"
                        placeholder="Enter Tution Fees"
                        className={errors.tution_fees ? "is-invalid" : ""}
                        {...register("tution_fees", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("tution_fees", +e.target.value);
                          },
                        })}
                        defaultValue={tution_fees}
                      />
                      <span className="text-danger">
                        {errors["tution_fees"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Exam Fees</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Exam Fees`}
                        className={errors["exam_fees"] ? "is-invalid" : ""}
                        {...register("exam_fees", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("exam_fees", +e.target.value);
                          },
                        })}
                        defaultValue={exam_fees}
                      />
                      <span className="text-danger">
                        {errors["exam_fees"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Private Tutor Salary</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Private Tutor Salary`}
                        className={
                          errors["private_tutor_salary"] ? "is-invalid" : ""
                        }
                        {...register("private_tutor_salary", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("private_tutor_salary", +e.target.value);
                          },
                        })}
                        defaultValue={private_tutor_salary}
                      />
                      <span className="text-danger">
                        {errors["private_tutor_salary"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Books & Periodicals</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Books & Periodicals`}
                        className={
                          errors["books_periodicals"] ? "is-invalid" : ""
                        }
                        {...register("books_periodicals", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("books_periodicals", +e.target.value);
                          },
                        })}
                        defaultValue={books_periodicals}
                      />
                      <span className="text-danger">
                        {errors["books_periodicals"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Uniform & Shoes</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Uniform & Shoes`}
                        className={errors["uniform_shoes"] ? "is-invalid" : ""}
                        {...register("uniform_shoes", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("uniform_shoes", +e.target.value);
                          },
                        })}
                        defaultValue={uniform_shoes}
                      />
                      <span className="text-danger">
                        {errors["uniform_shoes"]?.message || ""}
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

export default EducationExpense;
