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
    scheme_name: string;
    account_no: string;
    paid_amount: number;
    total?: number;
}

const types = [
    "savings",
    "mutual",
    "investment"
];

const GovSecurities = () => {
    const userInfo = useSelector((state: any) => state.auth.data);
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState<PropertyItem[]>(
        types.map((type) => ({
            id: "",
            type,
            scheme_name: "",
            account_no: "",
            paid_amount: 0,
            total: 0,
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
        await getRequest(`gov-securities`)
            .then((res: any) => {
                setLoading(false);
                const data = res.data?.map((item: any) => ({
                    id: item.id,
                    type: item.type,
                    scheme_name: item.scheme_name,
                    account_no: item.account_no,
                    paid_amount: item.paid_amount,
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
        console.log(items, "items");

        setSaveLoading(true);
        const inputArr = data.items.map((item) => ({
            ...item,
            user_id: userInfo.id,
        }));

        console.log(inputArr, "inputArr")

        try {
            const res = await postRequest(`gov-securities`, inputArr);
            setOpen(true);
            setSaveLoading(false);
            setMessage("Successfully Updated");
            const updatedData = res.data?.map((item: any) => ({
                id: item?.id,
                type: item?.type,
                scheme_name: item?.scheme_name,
                account_no: item?.account_no,
                paid_amount: item?.paid_amount,
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
        console.log("type", type);
        const newItem = {
            id: "",
            type: type,
            scheme_name: "",
            account_no: "",
            paid_amount: 0,
            total: 0,
        };
        const updatedData = [...items, newItem];
        setItems(updatedData);


        // Register the new item dynamically
        const newIndex = updatedData.length - 1;
        setValue(`items.${newIndex}.id`, "");
        setValue(`items.${newIndex}.type`, type);
        setValue(`items.${newIndex}.scheme_name`, "");
        setValue(`items.${newIndex}.account_no`, "");
        setValue(`items.${newIndex}.paid_amount`, 0);
        setValue(`items.${newIndex}.total`, 0);
    };

    const deleteAction = async (id: any, type: string, index: any) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (confirmation) {
            const updatedData = [...items];
            if (id) {
                await deleteRequest(`gov-securities/${id}`)
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
            case "savings":
                return `Savings Certificate: ${serialPadding(key)}`;
            case "mutual":
                return `Mutual Fund: ${serialPadding(key)} `;
            case "investment":
                return `Joint Investment Scheme: ${serialPadding(key)} `;
            default:
                return "";
        }
    };

    const getFieldLabel = (type: string) => {
        switch (type) {
            case "savings":
                return {
                    firstLabel: "Scheme Name",
                    secondLabel: "A/C No",
                    thirdLabel: "Paid Amount",
                };
            case "mutual":
                return {
                    firstLabel: "Scheme Name",
                    secondLabel: "A/C No",
                    thirdLabel: "Paid Amount",
                };
            case "investment":
                return {
                    firstLabel: "Scheme Name",
                    secondLabel: "A/C No",
                    thirdLabel: "Paid Amount",
                };
            default:
                return {
                    firstLabel: "",
                    secondLabel: "",
                    thirdLabel: "",
                };
        }
    };


    const dataItems = watch("items");
    let totalsavings = 0;
    let totalMutual = 0;
    let totalInvestment = 0;
    let allowableInvestmentSavings = 0;
    let allowableInvestmentMutual = 0;
    let allowableInvestmentInvestment = 0;

    if (watch("items")) {
        const savingsData = dataItems?.filter((item) => item.type === "savings");
        totalsavings = savingsData?.reduce((n, {paid_amount}) => Number(n) + Number(paid_amount), 0)
        allowableInvestmentSavings = Math.min(totalsavings, 500000);

        const mutualData = dataItems?.filter((item) => item.type === "mutual");
        totalMutual = mutualData?.reduce((n, {paid_amount}) => Number(n) + Number(paid_amount), 0)
        allowableInvestmentMutual = Math.min(totalMutual, 500000);

        const investmentData = dataItems?.filter((item) => item.type === "investment");
        totalInvestment = investmentData?.reduce((n, {paid_amount}) => Number(n) + Number(paid_amount), 0)
        allowableInvestmentInvestment = Math.min(totalInvestment, 500000);
    }

    return (
        <Col xl="9">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <UserDetailsInformation/>
                <Card className="profile-right">
                    <CardHeaderCommon
                        title={"Govt. Securities"}
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
                                    "savings",
                                    "mutual",
                                    "investment",
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
                                                    {type === "savings" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.scheme_name`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.scheme_name`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.scheme_name}
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
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).thirdLabel}</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.paid_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.paid_amount`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.paid_amount}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    )}

                                                    {type === "mutual" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.scheme_name`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.scheme_name`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.scheme_name}
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
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).thirdLabel}</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.paid_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.paid_amount`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.paid_amount}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>)}

                                                    {type === "investment" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.scheme_name`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.scheme_name`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.scheme_name}
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
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).thirdLabel}</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.paid_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.paid_amount`,
                                                                                        +e.target.value
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
                                        {type === "savings" &&
                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalsavings}
                                                            disabled
                                                        />

                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Allowable Investment</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={allowableInvestmentSavings}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>)}
                                        {type === "mutual" &&

                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalMutual}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Allowable Investment</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={allowableInvestmentMutual}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>)}
                                        {type === "investment" &&

                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalInvestment}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Allowable Investment</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={allowableInvestmentInvestment}
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

export default GovSecurities;
