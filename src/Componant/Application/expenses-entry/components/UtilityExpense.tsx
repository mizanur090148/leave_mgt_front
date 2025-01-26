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
  electricity_bill: number;
  gas_bill: number;
  water_bill: number;
  telephone_bill: number;
  mobile_bill: number;
  internet_bill: number;
}

const UtilityExpense: React.FC = () => {
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
      electricity_bill: 0,
      gas_bill: 0,
      water_bill: 0,
      telephone_bill: 0,
      mobile_bill: 0,
      internet_bill: 0,
    },
  });

  const onSubmit = async (inputData: PropertyItem) => {
    setSaveLoading(true);
    const payload = { ...inputData, user_id: userInfo.id };
    try {
      const res = id
        ? await patchRequest(`utility-expenses/${id}`, payload)
        : await postRequest(`utility-expenses`, payload);

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
      const res = await getRequest(`utility-expenses`);
      if (res?.data?.length === 1) {
        const fetchedData = res.data[0];
        setId(fetchedData.id);

        // Use reset to populate all form fields with fetched data
        reset({
          electricity_bill: fetchedData.electricity_bill || 0,
          gas_bill: fetchedData.gas_bill || 0,
          water_bill: fetchedData.water_bill || 0,
          telephone_bill: fetchedData.telephone_bill || 0,
          mobile_bill: fetchedData.mobile_bill || 0,
          internet_bill: fetchedData.internet_bill || 0,
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
    electricity_bill,
    gas_bill,
    water_bill,
    telephone_bill,
    mobile_bill,
    internet_bill,
  } = watch();

  const total = [
    electricity_bill || 0,
    gas_bill || 0,
    water_bill || 0,
    telephone_bill || 0,
    mobile_bill || 0,
    internet_bill || 0,
  ].reduce((acc, val) => acc + val, 0);

  const updateHeadData = (updatedData: any) => {
    const result = [
      updatedData?.electricity_bill || 0,
      updatedData?.gas_bill || 0,
      updatedData?.water_bill || 0,
      updatedData?.telephone_bill || 0,
      updatedData?.mobile_bill || 0,
      updatedData?.internet_bill || 0,
    ].reduce((acc, val) => acc + val, 0);

    const updatedState = {
      ...expenseData,
      utility: result,
      total: expenseTotalData({ ...expenseData, utility: result })
    };
    dispatch(expense(updatedState));
  }

  return (
    <Col xl="9">
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <ExpenseTop
          title={"Total Utility Expenses"}
          itemName={'utility'}
        />
        <Card className="profile-right">
          <CardHeaderCommon
            title="Utility Expenses"
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
                        className={errors.electricity_bill ? "is-invalid" : ""}
                        {...register("electricity_bill", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("electricity_bill", +e.target.value);
                          },
                        })}
                        defaultValue={electricity_bill}
                      />
                      <span className="text-danger">
                        {errors["electricity_bill"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Clothing Expenses</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Clothing Expenses`}
                        className={errors["gas_bill"] ? "is-invalid" : ""}
                        {...register("gas_bill", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("gas_bill", +e.target.value);
                          },
                        })}
                        defaultValue={gas_bill}
                      />
                      <span className="text-danger">
                        {errors["gas_bill"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Personal Expenses</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Personal Expenses`}
                        className={errors["water_bill"] ? "is-invalid" : ""}
                        {...register("water_bill", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("water_bill", +e.target.value);
                          },
                        })}
                        defaultValue={water_bill}
                      />
                      <span className="text-danger">
                        {errors["water_bill"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Family Expenses</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Family Expenses`}
                        className={errors["telephone_bill"] ? "is-invalid" : ""}
                        {...register("telephone_bill", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("telephone_bill", +e.target.value);
                          },
                        })}
                        defaultValue={telephone_bill}
                      />
                      <span className="text-danger">
                        {errors["telephone_bill"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Mobile Bill</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Mobile Bill`}
                        className={errors["mobile_bill"] ? "is-invalid" : ""}
                        {...register("mobile_bill", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("mobile_bill", +e.target.value);
                          },
                        })}
                        defaultValue={mobile_bill}
                      />
                      <span className="text-danger">
                        {errors["mobile_bill"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Internet Bill</Label>
                      <Input
                        type="number"
                        placeholder={`Enter Family Expenses`}
                        className={errors["internet_bill"] ? "is-invalid" : ""}
                        {...register("internet_bill", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("internet_bill", +e.target.value);
                          },
                        })}
                        defaultValue={internet_bill}
                      />
                      <span className="text-danger">
                        {errors["internet_bill"]?.message || ""}
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

export default UtilityExpense;
