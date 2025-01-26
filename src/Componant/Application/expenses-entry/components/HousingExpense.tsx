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
import { expenseTotalData } from "../../../../utils/helpers";
import { expense } from "../../../../Store/Slices/PastReturnTotalSlice";
import ExpenseTop from "./ExpenseTop";

interface PropertyItem {
  id?: string;
  rental_payments: number;
  repair_maintenance: number;
  service_charge: number;
}

const HousingExpense: React.FC = () => {
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
      rental_payments: 0,
      repair_maintenance: 0,
      service_charge: 0,
    },
  });

  const onSubmit = async (inputData: PropertyItem) => {
    setSaveLoading(true);
    const payload = { ...inputData, user_id: userInfo.id };
    try {
      const res = id
        ? await patchRequest(`housing-expenses/${id}`, payload)
        : await postRequest(`housing-expenses`, payload);

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
      const res = await getRequest(`housing-expenses`);
      if (res?.data?.length === 1) {
        const fetchedData = res.data[0];
        setId(fetchedData.id);
        reset({
          rental_payments: fetchedData.rental_payments || 0,
          repair_maintenance: fetchedData.repair_maintenance || 0,
          service_charge: fetchedData.service_charge || 0,
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

  const { rental_payments, repair_maintenance, service_charge } = watch();
  const total = [
    rental_payments || 0,
    repair_maintenance || 0,
    service_charge || 0,
  ].reduce((acc, val) => acc + val, 0);

  const updateHeadData = (updatedData: any) => {
    const result = [
      updatedData?.rental_payments || 0,
      updatedData?.repair_maintenance || 0,
      updatedData?.service_charge || 0,
    ].reduce((acc, val) => acc + val, 0);

    const updatedState = {
      ...expenseData,
      housing: result,
      total: expenseTotalData({ ...expenseData, housing: result })
    };
    dispatch(expense(updatedState));
  }

    return (
      <Col xl="9">
        <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
          <ExpenseTop
            title={"Total Housing Expenses"}
            itemName={'housing'}
          />
          <Card className="profile-right">
            <CardHeaderCommon
              title="Housing Expenses"
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
                        <Label>Rental Payments sada</Label>
                        <Input
                          type="number"
                          placeholder="Enter Food Expenses"
                          className={errors.rental_payments ? "is-invalid" : ""}
                          {...register("rental_payments", {
                            valueAsNumber: true,
                            required: "This is required",
                            validate: (value) =>
                              value >= 0 || "Value must be a positive number",
                            onChange: (e) => {
                              setValue("rental_payments", +e.target.value);
                            },
                          })}
                          defaultValue={rental_payments}
                        />
                        <span className="text-danger">
                          {errors["rental_payments"]?.message || ""}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col sm="4" md="4">
                      <FormGroup>
                        <Label>Repair & Maintenance</Label>
                        <Input
                          type="number"
                          placeholder={`Enter repair & maintenance`}
                          className={
                            errors["repair_maintenance"] ? "is-invalid" : ""
                          }
                          {...register("repair_maintenance", {
                            valueAsNumber: true,
                            required: "This is required",
                            validate: (value) =>
                              value >= 0 || "Value must be a positive number",
                            onChange: (e) => {
                              setValue("repair_maintenance", +e.target.value);
                            },
                          })}
                          defaultValue={repair_maintenance}
                        />
                        <span className="text-danger">
                          {errors["repair_maintenance"]?.message || ""}
                        </span>
                      </FormGroup>
                    </Col>
                    <Col sm="4" md="4">
                      <FormGroup>
                        <Label>Service Charge</Label>
                        <Input
                          type="number"
                          placeholder={`Enter service charge`}
                          className={errors["service_charge"] ? "is-invalid" : ""}
                          {...register("service_charge", {
                            valueAsNumber: true,
                            required: "This is required",
                            validate: (value) =>
                              value >= 0 || "Value must be a positive number",
                            onChange: (e) => {
                              setValue("service_charge", +e.target.value);
                            },
                          })}
                          defaultValue={service_charge}
                        />
                        <span className="text-danger">
                          {errors["service_charge"]?.message || ""}
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

  export default HousingExpense;
