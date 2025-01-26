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
  food_expenses: number;
  clothing_expenses: number;
  personal_expenses: number;
  family_expenses: number;
}

const SelfFamilyExpense: React.FC = () => {
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
      food_expenses: 0,
      clothing_expenses: 0,
      personal_expenses: 0,
      family_expenses: 0,
    },
  });

  const onSubmit = async (inputData: PropertyItem) => {
    setSaveLoading(true);
    const payload = { ...inputData, user_id: userInfo.id };

    try {
      const res = id
        ? await patchRequest(`self-family-expenses/${id}`, payload)
        : await postRequest(`self-family-expenses`, payload);

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
      const res = await getRequest(`self-family-expenses`);
      if (res?.data?.length === 1) {
        const fetchedData = res.data[0];
        setId(fetchedData.id);

        // Use reset to populate all form fields with fetched data
        reset({
          food_expenses: fetchedData.food_expenses || 0,
          clothing_expenses: fetchedData.clothing_expenses || 0,
          personal_expenses: fetchedData.personal_expenses || 0,
          family_expenses: fetchedData.family_expenses || 0,
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
    food_expenses,
    clothing_expenses,
    personal_expenses,
    family_expenses,
  } = watch();

  const total = [
    food_expenses || 0,
    clothing_expenses || 0,
    personal_expenses || 0,
    family_expenses || 0,
  ].reduce((acc, val) => acc + val, 0);

  const updateHeadData = (updatedData: any) => {
    const result = [
      updatedData?.food_expenses || 0,
      updatedData?.clothing_expenses || 0,
      updatedData?.personal_expenses || 0,
      updatedData?.family_expenses || 0,
    ].reduce((acc, val) => acc + val, 0);

    const updatedState = {
      ...expenseData,
      self_and_family: result,
      total: expenseTotalData({ ...expenseData, self_and_family: result })
    };
    dispatch(expense(updatedState));
  }

  return (
    <Col xl="9">
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <ExpenseTop 
          title={"Total Family Expenses"}
          itemName={'self_and_family'} 
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
                      <Label>Food Expenses</Label>
                      <Input
                        type="number"
                        placeholder="Enter Food Expenses"
                        className={errors.food_expenses ? "is-invalid" : ""}
                        {...register("food_expenses", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("food_expenses", +e.target.value);
                          },
                        })}
                        defaultValue={food_expenses}
                      />
                      <span className="text-danger">
                        {errors["food_expenses"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Clothing Expenses</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Clothing Expenses`}
                        className={
                          errors["clothing_expenses"] ? "is-invalid" : ""
                        }
                        {...register("clothing_expenses", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("clothing_expenses", +e.target.value);
                          },
                        })}
                        defaultValue={clothing_expenses}
                      />
                      <span className="text-danger">
                        {errors["clothing_expenses"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Personal Expenses</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Personal Expenses`}
                        className={
                          errors["personal_expenses"] ? "is-invalid" : ""
                        }
                        {...register("personal_expenses", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("personal_expenses", +e.target.value);
                          },
                        })}
                        defaultValue={personal_expenses}
                      />
                      <span className="text-danger">
                        {errors["personal_expenses"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Family Expenses</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Family Expenses`}
                        className={
                          errors["family_expenses"] ? "is-invalid" : ""
                        }
                        {...register("family_expenses", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("family_expenses", +e.target.value);
                          },
                        })}
                        defaultValue={family_expenses}
                      />
                      <span className="text-danger">
                        {errors["family_expenses"]?.message || ""}
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

export default SelfFamilyExpense;
