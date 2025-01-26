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
import {Fragment} from "react";

const TaxPaidRefund = () => {
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
                <UserDetailsInformation/>
                <Card className="profile-right">
                    <CardHeaderCommon
                        title={"Tax Paid/Refund"}
                        tagClass={"card-title mb-0"}
                    />
                    <CardBody>
                        <Row className="mb-3">

                        </Row>


                        <Row>
                            <br/>
                            <h3> Tax Deduction At Sources:01 (Head Of Income, Challan No, Amount)
                                (</h3>
                            <br/>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Head Of Income</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Income 1">Income 1</option>
                                        <option value="Income 2">Income 2</option>
                                        <option value="Income 3">Income 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Challan Type</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Challan 1">Challan Type 1</option>
                                        <option value="Challan Type 2">Challan Type 2</option>
                                        <option value="Challan Type 3">Challan Type 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Challan No</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Challan No"
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Date</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="date"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Deposit Type</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Type 1"> Type 1</option>
                                        <option value=" Type 2"> Type 2</option>
                                        <option value=" Type 3"> Type 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Amount</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Amount"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Bank</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Bank 1">Bank 1</option>
                                        <option value="Bank 2">Bank 2</option>
                                        <option value="Bank 3">Bank 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Branch</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Branch 1">Branch 1</option>
                                        <option value="Branch 2">Branch 2</option>
                                        <option value="Branch 3">Branch 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Status</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Status"
                                    />
                                </FormGroup>
                            </Col>
                           {/* <br/>
                            Add More . . . Delete
                            <br/>*/}
                            <Col sm="6" md="12">
                                <FormGroup>
                                    <Label>Total</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total"
                                    />
                                </FormGroup>
                            </Col>

                            <br/>
                            <br/>
                            <h3> Advance Payment Of Tax:01 (Challan Type, Challan No, Amount)

                                (</h3>
                            <br/>

                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Challan Type</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Challan 1">Challan Type 1</option>
                                        <option value="Challan Type 2">Challan Type 2</option>
                                        <option value="Challan Type 3">Challan Type 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Challan No</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Challan No"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        placeholder=" Challan No"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Deposit Type</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Deposit 1">Deposit Type 1</option>
                                        <option value="Deposit Type 2">Deposit Type 2</option>
                                        <option value="Deposit Type 3">Deposit Type 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Amount</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Amount"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Bank</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Bank 1">Bank 1</option>
                                        <option value="Bank 2">Bank 2</option>
                                        <option value="Bank 3">Bank 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="6">
                                <FormGroup>
                                    <Label>Branch</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Branch 1">Branch 1</option>
                                        <option value="Branch 2">Branch 2</option>
                                        <option value="Branch 3">Branch 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="6">
                                <FormGroup>
                                    <Label>Status</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Status"
                                    />
                                </FormGroup>
                            </Col>
                           {/* <br/>
                            Add More . . . Delete
                            <br/>*/}
                            <Col sm="6" md="12">
                                <FormGroup>
                                    <Label>Total</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total"
                                    />
                                </FormGroup>
                            </Col>


                            <br/>
                            <br/>
                            <h3> Tax Paid On Past Return:01 (Assessment Year, Challan No, Amount)

                                (</h3>
                            <br/>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Assessment Year</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Assessment Year 1">Assessment Year 1</option>
                                        <option value="Assessment Year 2">Assessment Year 2</option>
                                        <option value="Assessment Year 3">Assessment Year 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Challan No</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Challan No"
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Date</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="date"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="12">
                                <FormGroup>
                                    <Label>Paid Amount</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Paid Amount"
                                    />
                                </FormGroup>
                            </Col>
                           {/* <br/>
                            Add More . . . Delete
                            <br/>*/}
                            <Col sm="6" md="12">
                                <FormGroup>
                                    <Label>Total</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total"
                                    />
                                </FormGroup>
                            </Col>
                            <br/>
                            <br/>
                            <h3> Tax Refund On Past Return:01 (Assessment Year, Challan No, Amount)

                                (</h3>
                            <br/>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Assessment Year</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                        <option value="Assessment Year 1">Assessment Year 1</option>
                                        <option value="Assessment Year 2">Assessment Year 2</option>
                                        <option value="Assessment Year 3">Assessment Year 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Refund Authority</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Refund Authority"
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Refund Date</Label>
                                    <Input
                                        style={{padding: "6px 10px"}}
                                        type="date"
                                        bsSize="sm"
                                        className="form-select select-custom"
                                    >
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="12">
                                <FormGroup>
                                    <Label>Refund Amount</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Refund Amount"
                                    />
                                </FormGroup>
                            </Col>
                           {/* <br/>
                            Add More . . . Delete
                            <br/>*/}
                            <Col sm="6" md="12">
                                <FormGroup>
                                    <Label>Total</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total"
                                    />
                                </FormGroup>
                            </Col>
                            <br/>
                            <br/>

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

export default TaxPaidRefund;
