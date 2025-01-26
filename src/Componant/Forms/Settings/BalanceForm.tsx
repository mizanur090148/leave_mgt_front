import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Input, Label, Row } from "reactstrap";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../../utils/axiosRequests";
import { Btn } from "../../../AbstractElements";
import moment from "moment";

const BalanceForm = () => {
  const location = useLocation();
  let user = location?.state?.user;
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentHistories, setPaymentHistories] = useState([]);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  const onSubmit = () => {
    if (!amount) {
      setError("This field is required");
      return false;
    }
    setError("");
    let balance = {
      userId: user.id,
      amount: parseInt(amount),
      addDate: new Date(),
    };
    postRequest(`settings/users/payment`, balance)
      .then((data) => {
        setAmount("");
        toast.success("Successfully deleted", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getPaymentHistory();
      })
      .catch((error) => {
        console.log("from react query error: ", error.message);
      });
  };

  useEffect(() => {
    getPaymentHistory();
  }, []);

  const getPaymentHistory = async () => {
    await getRequest(`settings/users/payment-histories?userId=${user.id}`)
      .then((data) => {
        setPaymentHistories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePayment = (id: any) => {
    var result = window.confirm("Are you sure want to delete?");
    if (result) {
      deleteRequest(`settings/users/delete-payment/${id}`)
        .then((data: any) => {
          const result = paymentHistories?.filter(
            (item: any) => item.id !== id
          );
          setPaymentHistories([...result]);
          toast.success("Successfully deleted", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form>
      <Row className="mb-3">
        <Col md="3" className="position-relative">
          <Label>Amount:</Label>
          <Input
            bsSize="sm"
            type="number"
            //className={`${errors?.name ? "is-invalid" : ""}`}
            defaultValue={amount}
            value={amount}
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <span className="error-msg">{error}</span>}
        </Col>
        <Col className="pt-4">
          <Btn
            size="sm"
            color="primary"
            //type="submit"
            onClick={() => onSubmit()}
          >
            Submit
          </Btn>
        </Col>
        <Col md="6">
          <div className="balance-history-title">Balance History:</div>
          <table className="list-table table-hover my-0">
            <thead>
              <th>Amount</th>
              <th>Amount Date</th>
              <th>Action</th>
            </thead>
            <tbody>
              {paymentHistories.length > 0 &&
                paymentHistories.map((payment: any) => (
                  <tr key={payment.addDate}>
                    <td>{payment.amount}</td>
                    <td>{moment(payment.addDate).format("YY-MM-DD")}</td>
                    <td>
                      <i
                        className="fa fa-trash pointer text-danger"
                        title="Delete"
                        aria-hidden="true"
                        onClick={() => deletePayment(payment.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </form>
  );
};

export default BalanceForm;
