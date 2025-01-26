import React, {Fragment, useEffect, useState} from "react";
import {Card, CardBody, CardFooter, Col, Form, FormGroup, Input, Label, Row,} from "reactstrap";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {deleteRequest, getRequest, postRequest,} from "../../../../utils/axiosRequests";
import {Btn} from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import {serialPadding} from "../../../../utils/helpers";

interface PropertyItem {
    id: string;
    type: string;
    policy_number: string;
    insured_amount: string;
    current_year_amount: number;
    bank_name?: string;
    account_no?: string;
    paid_amount: number;
    allowable_limit?: number;
    total?: string;
}

const types = [
    "insurance",
    "deposit",
];

const SavingsPlan = () => {
    const userInfo = useSelector((state: any) => state.auth.data);
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState<PropertyItem[]>(
        types.map((type) => ({
            id: "",
            type,
            policy_number: "",
            insured_amount: "",
            current_year_amount: 0,
            bank_name: "",
            account_no: "",
            paid_amount: 0,
            allowable_limit: 0,
            total: "",
        }))
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm<{ items: PropertyItem[] }>({
        defaultValues: {items},
    });

    console.log(errors, "errors");

    const getData = async () => {
        setLoading(true);
        await getRequest(`savings-plan`)
            .then((res: any) => {
                setLoading(false);
                const data = res.data?.map((item: any) => ({
                    id: item.id,
                    type: item.type,
                    policy_number: item.policy_number,
                    insured_amount: item.insured_amount,
                    current_year_amount: item.current_year_amount,
                    bank_name: item.bank_name,
                    account_no: item.account_no,
                    paid_amount: item.paid_amount,
                    allowable_limit: item.allowable_limit,
                    total: item.total,
                }));
                if (data?.length) {
                    setItems(data);
                    reset({items: data});
                }
            })
            .catch((error: any) => {
                setLoading(false);
                console.error("Error fetching data:", error.message);
            });
    };

    useEffect(() => {
        getData();
        console.log(items, "updatedData");

    }, []);

    const onSubmit: SubmitHandler<{ items: PropertyItem[] }> = async (data) => {
        setSaveLoading(true);
        const inputArr = data.items.map((item) => ({
            ...item,
            user_id: userInfo.id,
        }));

        console.log(inputArr, "inputArr")

        try {
            const res = await postRequest(`savings-plan`, inputArr);
            setOpen(true);
            setSaveLoading(false);
            setMessage("Successfully Updated");
            const updatedData = res.data?.map((item: any) => ({
                id: item?.id,
                type: item?.type,
                policy_number: item?.policy_number,
                insured_amount: item?.insured_amount,
                current_year_amount: item?.current_year_amount,
                bank_name: item?.bank_name,
                account_no: item?.account_no,
                paid_amount: item?.paid_amount,
                allowable_limit: item?.allowable_limit,
                total: item?.total,
            }));
            setItems(updatedData);
            reset({items: updatedData});
        } catch (error: any) {
            setSaveLoading(false);
            console.error("Error:", error.message);
        }
    };

    const addMore = (type: string) => {
        const newItem = {
            id: "",
            type: type,
            policy_number: "",
            insured_amount: "",
            current_year_amount: 0,
            bank_name: "",
            account_no: "",
            paid_amount: 0,
            allowable_limit: 0,
            total: "",
        };
        const updatedData = [...items, newItem];
        setItems(updatedData);


        // Register the new item dynamically
        const newIndex = updatedData.length - 1;
        setValue(`items.${newIndex}.id`, "");
        setValue(`items.${newIndex}.type`, type);
        setValue(`items.${newIndex}.policy_number`, "");
        setValue(`items.${newIndex}.insured_amount`, "");
        setValue(`items.${newIndex}.current_year_amount`, 0);
        setValue(`items.${newIndex}.bank_name`, "");
        setValue(`items.${newIndex}.account_no`, "");
        setValue(`items.${newIndex}.paid_amount`, 0);
        setValue(`items.${newIndex}.allowable_limit`, 0);
        setValue(`items.${newIndex}.total`, "");
    };

    const deleteAction = async (id: any, type: string, index: any) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (confirmation) {
            const updatedData = [...items];
            if (id) {
                await deleteRequest(`savings-plan/${id}`)
                    .then((res) => {
                        const newItems = updatedData.filter((item) => item.id !== id);
                        setItems([...newItems]);
                        if (newItems.length === 0) {
                            getData();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                updatedData.splice(index, 1);
                setItems(updatedData);
            }
        }
    };

    const getTitle = (type: string, key: number) => {
        switch (type) {
            case "insurance":
                return `Life Insurance Premium: ${serialPadding(key)}`;
            case "deposit":
                return `Deposit Pension Scheme/ Monthly Savings Scheme: ${serialPadding(key)} `;
            default:
                return "";
        }
    };

    const getFieldLabel = (type: string) => {
        switch (type) {
            case "insurance":
                return {
                    firstLabel: "Policy Number",
                    secondLabel: "Insured Amount",
                    thirdLabel: "Current Year Payment",
                };
            case "deposit":
                return {
                    firstLabel: "Bank Name",
                    secondLabel: "A/C No",
                    thirdLabel: "Paid Amount",
                };
            default:
                return {
                    firstLabel: "",
                    secondLabel: "",
                };
        }
    };


    const dataItems = watch("items");
    let totalInsurance = 0;
    let totalDeposit = 0;
    let allowableIncomeInsurance = 0;
    let allowableIncomeDeposit = 0;
    if (watch("items")) {
        const insuranceData = dataItems?.filter((item) => item.type === "insurance");
        totalInsurance = insuranceData?.reduce((n, {current_year_amount}) => Number(n) + Number(current_year_amount), 0)
        allowableIncomeInsurance = insuranceData?.reduce((n, {insured_amount}) =>
            Number(n) + (Number(insured_amount) * 0.1), 0);
        const depositData = dataItems?.filter((item) => item.type === "deposit");
        totalDeposit = depositData?.reduce((n, {paid_amount}) => Number(n) + Number(paid_amount), 0)
        allowableIncomeDeposit = Math.min(totalDeposit, 120000);
    }

    return (
        <Col xl="9">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <UserDetailsInformation/>
                <Card className="profile-right">
                    <CardHeaderCommon
                        title={"Savings Plan"}
                        tagClass={"card-title mb-0"}
                    />
                    <CardBody>
                        {loading ? (
                            <Loader loading={loading}/>
                        ) : (
                            <>
                                {open && message && (
                                    <ToastCustom
                                        message={message}
                                        open={open}
                                        setOpen={setOpen}
                                    />
                                )}
                                {[
                                    "insurance",
                                    "deposit",
                                ].map((type) => (
                                    <div key={type}>
                                        {items
                                            .map((item, index) => ({...item, index}))
                                            .filter((item) => item.type === type)
                                            .map((item, key) => (
                                                <Fragment key={item.index}>
                                                    <Row>
                                                        <Col>
                                                            <b>{getTitle(type, key)}</b>
                                                            {/* {item.index + 1} */}
                                                        </Col>
                                                        <Col className="text-end">
                                                            {((item.id && key > 0) || key > 0) && (
                                                                <i
                                                                    className="fa fa-times-circle text-danger pointer"
                                                                    onClick={() =>
                                                                        deleteAction(item?.id, type, item.index)
                                                                    }
                                                                />
                                                            )}
                                                        </Col>
                                                    </Row>
                                                    {type === "insurance" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.policy_number`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.policy_number`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.policy_number}
                                                                    />

                                                                </FormGroup>
                                                            </Col>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).secondLabel}</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.insured_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.insured_amount`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.insured_amount}
                                                                    />

                                                                </FormGroup>
                                                            </Col>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).thirdLabel}</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.current_year_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.current_year_amount`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.current_year_amount}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    )}

                                                    {type === "deposit" && (
                                                        <Row>
                                                            <Col>
                                                                <Label>{getFieldLabel(type).firstLabel}</Label>
                                                                <FormGroup>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.bank_name`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.bank_name`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.bank_name}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).secondLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.account_no`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.account_no`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.account_no}
                                                                    />
                                                                </FormGroup>
                                                            </Col>

                                                            <Col>
                                                                <Label>{getFieldLabel(type).thirdLabel} </Label>

                                                                <FormGroup>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.paid_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.paid_amount`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.paid_amount}
                                                                    />

                                                                </FormGroup>
                                                            </Col>
                                                        </Row>)}

                                                </Fragment>
                                            ))}
                                        <Row>
                                            <Col>
                                                <Btn
                                                    className="btn-full mb-2"
                                                    color="outline-info"
                                                    type="button"
                                                    onClick={() => addMore(type)}
                                                >
                                                    Add More <i className="fa fa-plus-circle pl-2"></i>
                                                </Btn>
                                            </Col>
                                        </Row>
                                        {type === "insurance" ?
                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                        bsSize="sm"
                                                        placeholder="" value={totalInsurance}
                                                        disabled
                                                        />

                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Allowable Limit</Label>
                                                    <Input
                                                        bsSize="sm"
                                                        placeholder="" value={allowableIncomeInsurance}
                                                        disabled
                                                    />
                                                    </FormGroup>
                                                </Col>
                                            </Row>)
                                            :

                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                    <Input
                                                        bsSize="sm"
                                                        placeholder="" value={totalDeposit}
                                                        disabled
                                                    />
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Allowable Limit</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={allowableIncomeDeposit}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>)}
                                    </div>
                                ))}

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
                                    type={saveLoading ? `button` : `submit`}
                                >
                                    {saveLoading ? "Saving..." : "Save"}
                                </Btn>
                            </>
                        )}
                    </CardBody>
                    <CardFooter className="text-end"></CardFooter>
                </Card>
            </Form>
        </Col>
    );
};

export default SavingsPlan;
