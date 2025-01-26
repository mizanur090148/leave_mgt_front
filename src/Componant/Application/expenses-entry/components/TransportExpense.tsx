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
  conveyance_payments: number;
  has_car: boolean,
  fuel_cost: number;
  repair_maintenance: number;
  fitness_renewals: number;
  driver_salary: number;
  garage_rent: number;
  ait_paid_on_car_renewal: number;
}

const TransportExpense: React.FC = () => {
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
      conveyance_payments: 0,
      has_car: false,
      fuel_cost: 0,
      repair_maintenance: 0,
      fitness_renewals: 0,
      driver_salary: 0,
      garage_rent: 0,
      ait_paid_on_car_renewal: 0,
    },
  });

  const onSubmit = async (inputData: PropertyItem) => {
    setSaveLoading(true);
    let payload = { ...inputData, user_id: userInfo.id };
    if (!inputData?.has_car) {
      payload = {
        ...payload, fuel_cost: 0,
        repair_maintenance: 0,
        fitness_renewals: 0,
        driver_salary: 0,
        garage_rent: 0,
        ait_paid_on_car_renewal: 0
      };
    }

    try {
      const res = id
        ? await patchRequest(`transport-expenses/${id}`, payload)
        : await postRequest(`transport-expenses`, payload);

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
      const res = await getRequest(`transport-expenses`);
      if (res?.data?.length === 1) {
        const fetchedData = res?.data[0];
        setId(fetchedData.id);
        reset({
          conveyance_payments: fetchedData?.conveyance_payments || 0,
          has_car: fetchedData?.has_car,
          fuel_cost: fetchedData?.fuel_cost || 0,
          repair_maintenance: fetchedData?.repair_maintenance || 0,
          fitness_renewals: fetchedData?.fitness_renewals || 0,
          driver_salary: fetchedData?.driver_salary || 0,
          garage_rent: fetchedData?.garage_rent || 0,
          ait_paid_on_car_renewal: fetchedData?.ait_paid_on_car_renewal || 0,
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
    conveyance_payments,
    has_car,
    fuel_cost,
    repair_maintenance,
    fitness_renewals,
    driver_salary,
    garage_rent,
    ait_paid_on_car_renewal,
  } = watch();

  const total = [
    conveyance_payments || 0,
    fuel_cost || 0,
    repair_maintenance || 0,
    fitness_renewals || 0,
    driver_salary || 0,
    garage_rent || 0,
    ait_paid_on_car_renewal || 0,
  ].reduce((acc, val) => acc + val, 0);

  const updateHeadData = (updatedData: any) => {
    const result = [
      updatedData?.conveyance_payments || 0,
      updatedData?.fuel_cost || 0,
      updatedData?.repair_maintenance || 0,
      updatedData?.fitness_renewals || 0,
      updatedData?.driver_salary || 0,
      updatedData?.garage_rent || 0,
      updatedData?.ait_paid_on_car_renewal || 0,
    ].reduce((acc, val) => acc + val, 0);

    const updatedState = {
      ...expenseData,
      transport: result,
      total: expenseTotalData({ ...expenseData, transport: result })
    };
    dispatch(expense(updatedState));
  }

  return (
    <Col xl="9">
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <ExpenseTop
          title={"Total Transport Expenses"}
          itemName={'transport'}
        />
        <Card className="profile-right">
          <CardHeaderCommon
            title="Transport Expenses"
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
                      <Label>Conveyance Payments</Label>
                      <Input
                        type="number"
                        placeholder="Enter Conveyance Payments"
                        className={
                          errors.conveyance_payments ? "is-invalid" : ""
                        }
                        {...register("conveyance_payments", {
                          valueAsNumber: true,
                          required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("conveyance_payments", +e.target.value);
                          },
                        })}
                        defaultValue={conveyance_payments}
                      />
                      <span className="text-danger">
                        {errors["conveyance_payments"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Do You Have Personal Car?</Label>
                      <Input
                        style={{ padding: "6px 10px" }}
                        type="select"
                        bsSize="sm"
                        className="form-select select-custom"
                        {...register(`has_car`)}
                        {...register("has_car")}
                        value={has_car ? "true" : "false"}
                        onChange={(e) => setValue("has_car", e.target.value === "true")}
                      >
                        <option value="">Select One</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Input>
                      {errors?.has_car && (
                        <span className="error-msg">
                          {errors?.has_car?.message}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Fuel Cost</Label>
                      <Input
                        type="number"
                        disabled={has_car ? false : true}
                        placeholder={`Enter Fuel Cost`}
                        className={errors["fuel_cost"] ? "is-invalid" : ""}
                        {...register("fuel_cost", {
                          valueAsNumber: true,
                          //required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("fuel_cost", +e.target.value);
                          },
                        })}
                        defaultValue={has_car ? fuel_cost : 0}
                        value={has_car ? fuel_cost : 0}
                      />
                      <span className="text-danger">
                        {errors["fuel_cost"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Repair Maintenance</Label>
                      <Input
                        type="number"
                        disabled={has_car ? false : true}
                        placeholder={`Enter Repair Maintenance`}
                        className={
                          errors["repair_maintenance"] ? "is-invalid" : ""
                        }
                        {...register("repair_maintenance", {
                          valueAsNumber: true,
                          //required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("repair_maintenance", +e.target.value);
                          },
                        })}
                        defaultValue={repair_maintenance}
                        value={has_car ? repair_maintenance : 0}
                      />
                      <span className="text-danger">
                        {errors["repair_maintenance"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Fitness Renewals</Label>
                      <Input
                        type="number"
                        disabled={has_car ? false : true}
                        placeholder={`Enter Fitness Renewals`}
                        className={
                          errors["fitness_renewals"] ? "is-invalid" : ""
                        }
                        {...register("fitness_renewals", {
                          valueAsNumber: true,
                          //required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("fitness_renewals", +e.target.value);
                          },
                        })}
                        defaultValue={has_car ? fitness_renewals : 0}
                        value={has_car ? fitness_renewals : 0}
                      />
                      <span className="text-danger">
                        {errors["fitness_renewals"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Driver Salary</Label>
                      <Input
                        type="number"
                        disabled={has_car ? false : true}
                        placeholder={`Enter Driver Salary`}
                        className={errors["driver_salary"] ? "is-invalid" : ""}
                        {...register("driver_salary", {
                          valueAsNumber: true,
                          //required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("driver_salary", +e.target.value);
                          },
                        })}
                        defaultValue={driver_salary}
                        value={has_car ? driver_salary : 0}
                      />
                      <span className="text-danger">
                        {errors["driver_salary"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>Garage Rent</Label>
                      <Input
                        type="number"
                        disabled={has_car ? false : true}
                        placeholder={`Enter Garage Rent`}
                        className={errors["garage_rent"] ? "is-invalid" : ""}
                        {...register("garage_rent", {
                          valueAsNumber: true,
                          //required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue("garage_rent", +e.target.value);
                          },
                        })}
                        defaultValue={has_car ? garage_rent : 0}
                        value={has_car ? garage_rent : 0}
                      />
                      <span className="text-danger">
                        {errors["garage_rent"]?.message || ""}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col sm="4" md="4">
                    <FormGroup>
                      <Label>AIT Paid on Car Rrenewal</Label>
                      <Input
                        type="number"
                        disabled={has_car ? false : true}
                        placeholder={`Enter AIT Paid on Car Rrenewal`}
                        className={
                          errors["ait_paid_on_car_renewal"] ? "is-invalid" : ""
                        }
                        {...register("ait_paid_on_car_renewal", {
                          valueAsNumber: true,
                          //required: "This is required",
                          validate: (value) =>
                            value >= 0 || "Value must be a positive number",
                          onChange: (e) => {
                            setValue(
                              "ait_paid_on_car_renewal",
                              +e.target.value
                            );
                          },
                        })}
                        defaultValue={has_car ? ait_paid_on_car_renewal : 0}
                        value={has_car ? ait_paid_on_car_renewal : 0}
                      />
                      <span className="text-danger">
                        {errors["ait_paid_on_car_renewal"]?.message || ""}
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

export default TransportExpense;
