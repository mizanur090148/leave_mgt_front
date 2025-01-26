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
import {SubmitHandler} from "react-hook-form/dist/types/form";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {patchRequest, postRequest} from "../../../../utils/axiosRequests";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../../../Store/Slices/AuthSlice";

import {Btn} from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import {CheckMeOut} from "../../../../utils/Constant";
import {Fragment} from "react";

const Liabilities = () => {
    const dispatch = useDispatch();
    let userInfo = useSelector((state: any) => state.auth.data);

    const defaultValues = {};

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        watch,
    } = useForm<SalaryIncome>({defaultValues});

    const onSubmit: SubmitHandler<SalaryIncome> = (inputData) => {
        console.log(inputData, "inputDatainputData");
        patchRequest(`auth/profile-update/${userInfo.id}`, inputData)
            .then((data: any) => {
                const updatedUserInfo = {
                    ...userInfo,
                    user_detail: {
                        ...userInfo.user_detail,
                        ...data?.data,
                    },
                };
                dispatch(signIn(updatedUserInfo));
                toast.success("Successfully updated", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                console.log("from react query error: ", error.message);
            });
    };

    return (
      <Col xl="9">
        <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
          <UserDetailsInformation totalHeadIncome={""} />
          <Card className="profile-right">
            <CardHeaderCommon
              title={"Liabilities"}
              tagClass={"card-title mb-0"}
            />
            <CardBody>
              <Row className="mb-3"></Row>
              <h3>Institutional Liabilities:01 (Name, Amount)</h3>
              <br />
              <Row>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Bank/FI Name</Label>
                    <Input type="text" placeholder=" Bank/FI Name" />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>A/C No</Label>
                    <Input type="text" placeholder=" A/C No" />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Closing Amount</Label>
                    <Input type="text" placeholder=" Closing Amount" />
                  </FormGroup>
                </Col>
                <br />
                Add More
                <br />
                <h3>Non - Institutional Liabilities:01 (Name, Amount)</h3>
                <br />
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Name Of Person</Label>
                    <Input type="text" placeholder=" Name Of Person" />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>TIN No</Label>
                    <Input type="text" placeholder=" TIN No" />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Closing Amount</Label>
                    <Input type="text" placeholder=" Closing Amount" />
                  </FormGroup>
                </Col>
                <br />
                Add More
                <br />
                <h3>Other Liabilities:01 (Name, Amount)</h3>
                <br />
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Name Of Loan</Label>
                    <Input type="text" placeholder=" Name Of Loan" />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Type</Label>
                    <Input type="text" placeholder=" Type" />
                  </FormGroup>
                </Col>
                <Col sm="6" md="4">
                  <FormGroup>
                    <Label>Closing Amount</Label>
                    <Input type="text" placeholder=" Closing Amount" />
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
                type="submit"
                onClick={() => handleSubmit(onSubmit)}
              >
                Save
              </Btn>
            </CardBody>
            <CardFooter className="text-end"></CardFooter>
          </Card>
        </Form>
      </Col>
    );
};

export default Liabilities;
