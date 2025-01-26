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
    brokarage_name: string;
    bo_id_no: string;
    net_investment: number;
    total?: number;
}

const types = [
    "ipo",
    "secondary",
    "investment"
];

const ListedSecurities = () => {
    const userInfo = useSelector((state: any) => state.auth.data);
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState<PropertyItem[]>(
        types.map((type) => ({
            id: "",
            type,
            brokarage_name: "",
            bo_id_no: "",
            net_investment: 0,
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
        await getRequest(`listed-securities`)
            .then((res: any) => {
                setLoading(false);
                const data = res.data?.map((item: any) => ({
                    id: item.id,
                    type: item.type,
                    brokarage_name: item.brokarage_name,
                    bo_id_no: item.bo_id_no,
                    net_investment: item.net_investment,
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
            const res = await postRequest(`listed-securities`, inputArr);
            setOpen(true);
            setSaveLoading(false);
            setMessage("Successfully Updated");
            const updatedData = res.data?.map((item: any) => ({
                id: item?.id,
                type: item?.type,
                brokarage_name: item?.brokarage_name,
                bo_id_no: item?.bo_id_no,
                net_investment: item?.net_investment,
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
            brokarage_name: "",
            bo_id_no: "",
            net_investment: 0,
            total: 0,
        };
        const updatedData = [...items, newItem];
        setItems(updatedData);


        // Register the new item dynamically
        const newIndex = updatedData.length - 1;
        setValue(`items.${newIndex}.id`, "");
        setValue(`items.${newIndex}.type`, type);
        setValue(`items.${newIndex}.brokarage_name`, "");
        setValue(`items.${newIndex}.bo_id_no`, "");
        setValue(`items.${newIndex}.net_investment`, 0);
        setValue(`items.${newIndex}.total`, 0);
    };

    const deleteAction = async (id: any, type: string, index: any) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (confirmation) {
            const updatedData = [...items];
            if (id) {
                await deleteRequest(`listed-securities/${id}`)
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
            case "ipo":
                return `Share From IPO: ${serialPadding(key)}`;
            case "secondary":
                return `Shares Of Secondary Market: ${serialPadding(key)} `;
            case "investment":
                return `Shares Of Systematic Investment Scheme: ${serialPadding(key)} `;
            default:
                return "";
        }
    };

    const getFieldLabel = (type: string) => {
        switch (type) {
            case "ipo":
                return {
                    firstLabel: "Brokarage Name",
                    secondLabel: "BO ID No",
                    thirdLabel: "Net Investment",
                };
            case "secondary":
                return {
                    firstLabel: "Brokarage Name",
                    secondLabel: "BO ID No",
                    thirdLabel: "Net Investment",
                };
            case "investment":
                return {
                    firstLabel: "Brokarage Name",
                    secondLabel: "BO ID No",
                    thirdLabel: "Net Investment",
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
    let totalIpo = 0;
    let totalSecondary = 0;
    let totalInvestment = 0;

    if (watch("items")) {
        const ipoData = dataItems?.filter((item) => item.type === "ipo");
        totalIpo = ipoData?.reduce((n, {net_investment}) => Number(n) + Number(net_investment), 0)

        const secondaryData = dataItems?.filter((item) => item.type === "secondary");
        totalSecondary = secondaryData?.reduce((n, {net_investment}) => Number(n) + Number(net_investment), 0)

        const investmentData = dataItems?.filter((item) => item.type === "investment");
        totalInvestment = investmentData?.reduce((n, {net_investment}) => Number(n) + Number(net_investment), 0)
    }

    return (
        <Col xl="9">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <UserDetailsInformation/>
                <Card className="profile-right">
                    <CardHeaderCommon
                        title={"Listed Securities"}
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
                                    "ipo",
                                    "secondary",
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
                                                    {type === "ipo" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.brokarage_name`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.brokarage_name`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.brokarage_name}
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
                                                                            `items.${item.index}.bo_id_no`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.bo_id_no`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.bo_id_no}
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
                                                                            `items.${item.index}.net_investment`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.net_investment`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.net_investment}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    )}

                                                    {type === "secondary" && (
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>{getFieldLabel(type).firstLabel}</Label>

                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.brokarage_name`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.brokarage_name`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.brokarage_name}
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
                                                                            `items.${item.index}.bo_id_no`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.bo_id_no`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.bo_id_no}
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
                                                                            `items.${item.index}.net_investment`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.net_investment`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.net_investment}
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
                                                                            `items.${item.index}.brokarage_name`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.brokarage_name`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.brokarage_name}
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
                                                                            `items.${item.index}.bo_id_no`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.bo_id_no`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.bo_id_no}
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
                                                                            `items.${item.index}.net_investment`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.type`,
                                                                                        type
                                                                                    );
                                                                                    setValue(
                                                                                        `items.${item.index}.net_investment`,
                                                                                        +e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.net_investment}
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
                                        {type === "ipo" &&
                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalIpo}
                                                            disabled
                                                        />

                                                    </FormGroup>
                                                </Col>
                                            </Row>)}
                                        {type === "secondary" &&

                                            (<Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Total</Label>
                                                        <Input
                                                            bsSize="sm"
                                                            placeholder="" value={totalSecondary}
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

export default ListedSecurities;