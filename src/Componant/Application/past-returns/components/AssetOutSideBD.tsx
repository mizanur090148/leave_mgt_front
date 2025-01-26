import React, { Fragment, useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import {
    deleteRequest,
    getRequest,
    postRequest,
} from "../../../../utils/axiosRequests";
import { Btn } from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import { serialPadding } from "../../../../utils/helpers";

interface PropertyItem {
    id: any;
    name_of_asset: string;
    country_of_asset: number;
    closing_amount_in_bd: number;
}

const AssetOutSideBD: React.FC = () => {
    const userInfo = useSelector((state: any) => state.auth.data);
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [types, setTypes] = useState<any>([]);
    const [items, setItems] = useState<PropertyItem[]>([
        {
            id: "",
            name_of_asset: "",
            country_of_asset: 0,
            closing_amount_in_bd: 0,
        },
    ]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<{ items: PropertyItem[] }>({
        defaultValues: {
            items: [],
        },
    });

    const getchitems = async () => {
        try {
            setLoading(true);
            const res = await getRequest(`asset-outside-bd?past_return=1`);
            const data = res.data?.map((item: any) => ({
                id: item.id,
                name_of_asset: item.name_of_asset,
                country_of_asset: item.country_of_asset,
                closing_amount_in_bd: item.closing_amount_in_bd,
            }));

            if (data?.length) {
                setItems(data);
                reset({ items: data });
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            console.error("Error fetching data:", error.message);
        }
    };

    const getTypes = async () => {
        try {
            setLoading(true);
            const res = await getRequest(`settings/common?type=jewellery`);
            const types = res.data?.map((item: any) => ({
                id: item.id,
                name: item.name,
            }));
            if (types?.length) {
                setTypes(types);
            }
        } catch (error: any) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        getTypes();
        getchitems();
    }, []);

    const addMore = () => {
        setItems([
            ...items,
            {
                id: "",
                name_of_asset: "",
                country_of_asset: 0,
                closing_amount_in_bd: 0,
            },
        ]);
    };

    const deleteAction = async (id: any, index: number) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (confirmation) {
            const updatedData = [...items];
            if (id) {
                await deleteRequest(`asset-outside-bd/${id}`)
                    .then((res) => {
                        setItems(updatedData.filter((item) => item.id !== id));
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

    const onSubmit: SubmitHandler<{ items: PropertyItem[] }> = async (data) => {
        setSaveLoading(true);
        const inputArr = data?.items?.map((item) => ({
            ...item,
            user_id: userInfo.id,
            past_return: true,
        }));
        await postRequest(`asset-outside-bd`, inputArr)
            .then((res) => {
                setOpen(true);
                setSaveLoading(false);
                setMessage("Successfully Updated");
                const updatedData = res?.data?.map((item: any) => ({
                    id: item.id,
                    name_of_asset: item.name_of_asset,
                    country_of_asset: item.country_of_asset,
                    closing_amount_in_bd: item.closing_amount_in_bd,
                }));
                setItems(updatedData);
                reset({ items: updatedData });
            })
            .catch((error) => {
                setSaveLoading(false);
                console.error("Error:", error.message);
            });
    };

    let totalHeadIncome = null;
    if (watch("items")) {
        totalHeadIncome = items.reduce(
            (acc, curr) => acc + Number(curr.closing_amount_in_bd || 0),
            0
        );
    }

    return (
        <Col xl="9">
            <UserDetailsInformation
                title="Total AssetOutSideBD"
                totalHeadIncome={totalHeadIncome}
            />
            <Card className="profile-right">
                <CardHeaderCommon title="Assets OutSide BD" tagClass="card-title mb-0" />
                <CardBody>
                    {loading ? (
                        <Loader loading={loading} />
                    ) : (
                        <>
                            {open && message && (
                                <ToastCustom message={message} open={open} setOpen={setOpen} />
                            )}
                            <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                {items.map((item, key) => (
                                    <Fragment key={key}>
                                        {key > 0 && <div className="dashed-hr"></div>}
                                        {/*<Row className="fw-bold">
                                            <Col>
                                                <b>AssetOutSideBD: {serialPadding(key)} (Type, Value)</b>
                                            </Col>
                                            <Col className="text-end">
                                                {key > 0 && (
                                                    <i
                                                        style={{ fontSize: "17px" }}
                                                        className="fa fa-times-circle text-danger del-custom"
                                                        onClick={() => deleteAction(item?.id, key)}
                                                    ></i>
                                                )}
                                            </Col>
                                        </Row>*/}
                                        <Row>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Name Of Asset</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Name Of Asset"
                                                        {...register(`items.${key}.name_of_asset`, {
                                                            required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].name_of_asset = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.name_of_asset`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.name_of_asset}
                                                    />
                                                    {errors.items?.[key]?.name_of_asset && (
                                                        <span className="error-msg">
                              {errors.items[key]?.name_of_asset?.message}
                            </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Country Of Asset</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Country Of Asset"
                                                        {...register(`items.${key}.country_of_asset`, {
                                                            required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].country_of_asset = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.country_of_asset`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.country_of_asset}
                                                    />
                                                    {errors.items?.[key]?.country_of_asset && (
                                                        <span className="error-msg">
                              {errors.items[key]?.country_of_asset?.message}
                            </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Closing Amount In BD</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Closing Amount In BD"
                                                        {...register(`items.${key}.closing_amount_in_bd`, {
                                                            required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].closing_amount_in_bd = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.closing_amount_in_bd`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.closing_amount_in_bd}
                                                    />
                                                    {errors.items?.[key]?.closing_amount_in_bd && (
                                                        <span className="error-msg">
                              {errors.items[key]?.closing_amount_in_bd?.message}
                            </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                ))}
                                {/*<Row>
                                    <Col>
                                        <Btn
                                            className="btn-full mb-2"
                                            color="outline-info"
                                            type="button"
                                            onClick={() => addMore()}
                                        >
                                            Add More <i className="fa fa-plus-circle pl-2"></i>
                                        </Btn>
                                    </Col>
                                </Row>*/}
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
                            </Form>
                        </>
                    )}
                </CardBody>
            </Card>
        </Col>
    );
};

export default AssetOutSideBD;
