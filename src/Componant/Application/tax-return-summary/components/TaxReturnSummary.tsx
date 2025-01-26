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
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { patchRequest, postRequest } from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../../Store/Slices/AuthSlice";

import { Btn } from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";

const TaxReturnSummary = () => {
    const dispatch = useDispatch();
    let userInfo = useSelector((state: any) => state.auth.data);
    const incomeData = useSelector((state: any) => state?.pastReturn?.incomeEntryData);
    const assetEntryData = useSelector((state: any) => state?.pastReturn?.assetEntryData);
    const liabilityData = useSelector((state: any) => state?.pastReturn?.liabilityData);
    const assessmentIncomeYear = useSelector((state: any) => state?.pastReturn?.assessmentIncomeYear);

    const onSubmit: SubmitHandler<any> = async (inputData: any) => {
        console.log(inputData, "inputDatainputData");
        // setSaveLoading(true);
        // inputData["is_capital_gain"] = isCapitalGain;
        // const actionType = id
        //   ? patchRequest(`income-entries/${id}`, {
        //     user_id: userInfo.id,
        //     capital_gain: inputData,
        //   })
        //   : postRequest(`income-entries`, {
        //     user_id: userInfo.id,
        //     capital_gain: inputData,
        //   });
        // await actionType
        //   .then((res: any) => {
        //     setId(res?.data?.id);
        //     setMessage("Successfully Updated");
        //     setOpen(true);
        //     setSaveLoading(false);
        //   })
        //   .catch((error) => {
        //     setSaveLoading(false);
        //     console.log("from react query error: ", error.message);
        //   });
    };

    return (
        <Col xl="9">
            <Form className="theme-form">
                <Card className="profile-right">
                    <CardHeaderCommon
                        title={"Tax Return Summary"}
                        tagClass={"card-title mb-0"}
                    />
                    <CardBody>
                        <Row className="mb-3">
                        </Row>
                        <Row>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Name"
                                        readOnly
                                        defaultValue={userInfo?.user_detail?.full_name}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>ETIN</Label>
                                    <Input
                                        type="text"
                                        placeholder=" ETIN"
                                        readOnly
                                        defaultValue={userInfo?.user_detail?.etin_number}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Circle</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Circle"
                                        readOnly
                                        defaultValue={userInfo?.user_detail?.circle?.name}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Zone</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Zone"
                                        readOnly
                                        defaultValue={userInfo?.user_detail?.zone?.name}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Tax Location</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Tax Location"
                                        readOnly
                                        defaultValue={userInfo?.user_detail?.tax_payer_location?.name}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Income Year</Label>
                                    <Input
                                        type="text"
                                        readOnly
                                        defaultValue={assessmentIncomeYear?.incomeYear}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Assesment Year</Label>
                                    <Input
                                        type="text"
                                        readOnly
                                        defaultValue={assessmentIncomeYear?.assessmentYear}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Taxable Income</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Taxable Income"
                                        defaultValue={incomeData?.total}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Tax Exempted Income</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Tax Exempted Income"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Investment For Tax Rebate</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Investment For Tax Rebate"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Tax Payable On Income</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Tax Payable On Income"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>TDS/AIT/Tax Refund</Label>
                                    <Input
                                        type="text"
                                        placeholder=" TDS/AIT/Tax Refund"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Wealth Surcharge</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Wealth Surcharge"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Environmental Surcharge</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Environmental Surcharge"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Delay/Penal Interest</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Delay/Penal Interest"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Tax Payable With Return</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Tax Payable With Return"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Total Asset</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total Asset"
                                        defaultValue={assetEntryData?.total}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Total Liabilities</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total Liabilities"
                                        defaultValue={liabilityData?.total}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Total Lifestyle Expenses</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total Lifestyle Expenses"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Net Assets</Label>
                                    <Input
                                        type="text"
                                        defaultValue={assetEntryData?.total - liabilityData?.total}
                                    />
                                </FormGroup>
                            </Col>
                            <hr />
                            <Col xs="12">
                                <div className="form-check checkbox-checked">
                                    <Input type="checkbox" id='checkMeOut' />
                                    <Label for='checkMeOut'>I agree to submit my income tax return under u/s 180 of ITA 2023</Label>
                                </div>
                            </Col>

                        </Row>
                        {/*<Btn
                            className="pull-right save-and-continue"
                            color="primary"
                            type="submit"
                            onClick={() => handleSubmit(onSubmit)}
                        >
                            Save & Continue
                        </Btn>*/}
                        <Btn
                            className="pull-right"
                            color="primary"
                            type="submit"
                        // onClick={() => handleSubmit(onSubmit)}
                        >
                            Confirm Review
                        </Btn>
                    </CardBody>
                    <CardFooter className="text-end"></CardFooter>
                </Card>
            </Form>
        </Col>
    );
};

export default TaxReturnSummary;
