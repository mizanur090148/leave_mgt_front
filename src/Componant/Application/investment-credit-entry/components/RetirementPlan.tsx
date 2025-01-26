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
    name_of_scheme: string;
    account_no: string;
    contribution_amount: number;
    total?: number;
}

const types = [
    "pf",
    "self",
    "employer",
    "annuation",
    "benevolent",
    "insurance",
];

const RetirementPlan = () => {
    const userInfo = useSelector((state: any) => state.auth.data);
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState<PropertyItem[]>(
        types.map((type) => ({
            id: "",
            type,
            name_of_scheme: "",
            account_no: "",
            contribution_amount: 0,
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
        await getRequest(`retirement-plans`)
            .then((res: any) => {
                setLoading(false);
                const data = res.data?.map((item: any) => ({
                    id: item.id,
                    type: item.type,
                    name_of_scheme: item.name_of_scheme,
                    account_no: item.account_no,
                    contribution_amount: item.contribution_amount,
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
            const res = await postRequest(`retirement-plans`, inputArr);
            setOpen(true);
            setSaveLoading(false);
            setMessage("Successfully Updated");
            const updatedData = res.data?.map((item: any) => ({
                id: item?.id,
                type: item?.type,
                name_of_scheme: item?.name_of_scheme,
                account_no: item?.account_no,
                contribution_amount: item?.contribution_amount,
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
            name_of_scheme: "",
            account_no: "",
            contribution_amount: 0,
            total: 0,
        };
        const updatedData = [...items, newItem];
        setItems(updatedData);


        // Register the new item dynamically
        const newIndex = updatedData.length - 1;
        setValue(`items.${newIndex}.id`, "");
        setValue(`items.${newIndex}.type`, type);
        setValue(`items.${newIndex}.name_of_scheme`, "");
        setValue(`items.${newIndex}.account_no`, "");
        setValue(`items.${newIndex}.contribution_amount`, 0);
        setValue(`items.${newIndex}.total`, 0);
    };

    const deleteAction = async (id: any, type: string, index: any) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (confirmation) {
            const updatedData = [...items];
            if (id) {
                await deleteRequest(`retirement-plans/${id}`)
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
            case "pf":
                return `Contribution To PF, Where Act, 1925 applies: ${serialPadding(key)}`;
            case "self":
                return `Self Contribution To Recognised PF: ${serialPadding(key)} `;
            case "employer":
                return `Employer Contribution To Recognised: ${serialPadding(key)} `;
            case "annuation":
                return `Contribution To Super Annuation Fund: ${serialPadding(key)} `;
            case "benevolent":
                return `Contribution To Benevolent Fund: ${serialPadding(key)} `;
            case "insurance":
                return `Contribution To Group Insurance Premium: ${serialPadding(key)} `;
            default:
                return "";
        }
    };

    const getFieldLabel = (type: string) => {
        switch (type) {
            case "pf":
                return {
                    firstLabel: "Name Of Scheme",
                    secondLabel: "Account No",
                    thirdLabel: "Contribution Amount",
                };
            case "self":
                return {
                    firstLabel: "Name Of Scheme",
                    secondLabel: "Account No",
                    thirdLabel: "Contribution Amount",
                };
            case "employer":
                return {
                    firstLabel: "Name Of Scheme",
                    secondLabel: "Account No",
                    thirdLabel: "Contribution Amount",
                };
            case "annuation":
                return {
                    firstLabel: "Name Of Scheme",
                    secondLabel: "Account No",
                    thirdLabel: "Contribution Amount",
                };
            case "benevolent":
                return {
                    firstLabel: "Name Of Scheme",
                    secondLabel: "Account No",
                    thirdLabel: "Contribution Amount",
                };
            case "insurance":
                return {
                    firstLabel: "Name Of Scheme",
                    secondLabel: "Account No",
                    thirdLabel: "Contribution Amount",
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
    let totalPf = 0;
    let totalSelf = 0;
    let totalEmployer = 0;
    let totalAnnuation = 0;
    let totalBenevolent = 0;
    let totalInsurance = 0;

    if (watch("items")) {
        const pfData = dataItems?.filter((item) => item.type === "pf");
        totalPf = pfData?.reduce((n, {contribution_amount}) => Number(n) + Number(contribution_amount), 0)

        const selfData = dataItems?.filter((item) => item.type === "self");
        totalSelf = selfData?.reduce((n, {contribution_amount}) => Number(n) + Number(contribution_amount), 0)

        const employerData = dataItems?.filter((item) => item.type === "employer");
        totalEmployer = employerData?.reduce((n, {contribution_amount}) => Number(n) + Number(contribution_amount), 0)

        const annuationData = dataItems?.filter((item) => item.type === "annuation");
        totalAnnuation = annuationData?.reduce((n, {contribution_amount}) => Number(n) + Number(contribution_amount), 0)

        const benevolentData = dataItems?.filter((item) => item.type === "benevolent");
        totalBenevolent = benevolentData?.reduce((n, {contribution_amount}) => Number(n) + Number(contribution_amount), 0)

        const insuranceData = dataItems?.filter((item) => item.type === "insurance");
        totalInsurance = insuranceData?.reduce((n, {contribution_amount}) => Number(n) + Number(contribution_amount), 0)
    }

    return (
        <Col xl="9">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <UserDetailsInformation/>
                <Card className="profile-right">
                    <CardHeaderCommon
                        title={"Retirement Plans"}
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
                                    "pf",
                                    "self",
                                    "employer",
                                    "annuation",
                                    "benevolent",
                                    "insurance",
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
                                                    {type === "pf" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.name_of_scheme`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.name_of_scheme`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.name_of_scheme}
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
                                                                            `items.${item.index}.contribution_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.contribution_amount`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.contribution_amount}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    )}

                                                    {type === "self" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.name_of_scheme`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.name_of_scheme`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.name_of_scheme}
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
                                                                            `items.${item.index}.contribution_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.contribution_amount`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.contribution_amount}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>)}

                                                    {type === "employer" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.name_of_scheme`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.name_of_scheme`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.name_of_scheme}
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
                                                                            `items.${item.index}.contribution_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.contribution_amount`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.contribution_amount}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>)}

                                                    {type === "annuation" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.name_of_scheme`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.name_of_scheme`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.name_of_scheme}
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
                                                                            `items.${item.index}.contribution_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.contribution_amount`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.contribution_amount}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>)}

                                                    {type === "benevolent" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.name_of_scheme`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.name_of_scheme`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.name_of_scheme}
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
                                                                            `items.${item.index}.contribution_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.contribution_amount`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.contribution_amount}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>)}

                                                    {type === "insurance" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.name_of_scheme`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.name_of_scheme`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.name_of_scheme}
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
                                                                            `items.${item.index}.contribution_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.contribution_amount`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.contribution_amount}
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
                                        {type === "pf" &&
                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalPf}
                                                            disabled
                                                        />

                                                    </FormGroup>
                                                </Col>
                                            </Row>)}
                                        {type === "self" &&

                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalSelf}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>)}
                                        {type === "employer" &&

                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalEmployer}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>)}
                                        {type === "annuation" &&

                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalAnnuation}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>)}
                                        {type === "benevolent" &&

                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalBenevolent}
                                                            disabled/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>)}
                                        {type === "insurance" &&

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

export default RetirementPlan;