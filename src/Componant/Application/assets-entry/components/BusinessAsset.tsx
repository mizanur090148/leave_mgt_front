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
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { Btn } from "../../../../AbstractElements";
import AssetEntryTop from "./AssetEntryTop";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import { assetEntryTotalData, serialPadding } from "../../../../utils/helpers";
import { assetEntry } from "../../../../Store/Slices/PastReturnTotalSlice";

interface PropertyItem {
  id: any;
  name_of_business: string;
  type_of_business: string;
  address: string;
  total_assets: number | null;
  closing_liabilities: number | null;
  closing_capital: number | null;
}

const BusinessAssets: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const assetEntryData = useSelector((state: any) => state?.pastReturn?.assetEntryData);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState<PropertyItem[]>([
    {
      id: "",
      name_of_business: "",
      type_of_business: "",
      address: "",
      total_assets: null,
      closing_liabilities: null,
      closing_capital: null,
    },
  ]);
  const dispatch = useDispatch();

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

  const getItems = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`business-assets`);
      const data = res?.data?.map((item: any) => ({
        id: item.id,
        name_of_business: item.name_of_business,
        type_of_business: item.type_of_business,
        address: item.address,
        total_assets: item.total_assets,
        closing_liabilities: item.closing_liabilities,
        closing_capital: item.closing_capital,
      }));

      if (data?.length) {
        setItems(data);
        reset({ items: data });
        updateHeadData(data);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetching data:", error?.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const onSubmit: SubmitHandler<{ items: PropertyItem[] }> = async (data) => {
    // setSaveLoading(true);
    // const inputArr = data?.items?.map((item) => ({
    //   ...item,
    //   user_id: userInfo?.id,
    //   past_return: true,
    // }));
    // await postRequest(`business-assets`, inputArr)
    //   .then((res) => {
    //     setOpen(true);
    //     setSaveLoading(false);
    //     setMessage("Successfully Updated");
    //     const updatedData = res?.data?.map((item: any) => ({
    //       id: item.id,
    //       name_of_business: item.name_of_business,
    //       type_of_business: item.type_of_business,
    //       address: item.address,
    //       total_assets: item.total_assets,
    //       closing_liabilities: item.closing_liabilities,
    //       closing_capital: item.closing_capital,
    //     }));
    //     setItems(updatedData);
    //     reset({ items: updatedData });
    //   })
    //   .catch((error) => {
    //     setSaveLoading(false);
    //     console.error("Error:", error.message);
    //   });
  };

  // let totalHeadIncome = null;
  // if (watch("items")) {
  //   totalHeadIncome = items.reduce(
  //     (acc, curr) => acc + Number(curr.closing_capital || 0),
  //     0
  //   );
  // }

  const updateHeadData = (updatedData: any) => {
    const result = updatedData?.reduce(
      (acc: any, curr: any) => acc + Number(curr.closing_capital || 0),
      0
    );
    const updatedState = {
      ...assetEntryData,
      businessAsset: result,
      total: assetEntryTotalData({ ...assetEntryData, businessAsset: result })
  }
    dispatch(assetEntry(updatedState));
  }

  return (
    <Col xl="9">
      <AssetEntryTop
        title={"Business Assets"}
        itemName={'businessAsset'}
      />
      <Card className="profile-right">
        <CardHeaderCommon title="Business Assets" tagClass="card-title mb-0" />
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
                    <Row className="fw-bold">
                      <Col>
                        <b>
                          Business: {serialPadding(key)} (Name, Address,
                          Capital)
                        </b>
                      </Col>
                      <Col className="text-end">
                        {/* {key > 0 && (
                          <i
                            style={{ fontSize: "17px" }}
                            className="fa fa-times-circle text-danger del-custom"
                            onClick={() => deleteAction(item?.id, key)}
                          ></i>
                        )} */}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Name Of Business</Label>
                          <Input
                            type="text"
                            placeholder="Name of business"
                            disabled={true}
                            defaultValue={item.name_of_business}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Type Of Business</Label>
                          <Input
                            type="text"
                            placeholder="Name of business"
                            disabled={true}
                            defaultValue={item.type_of_business}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>ETIN</Label>
                          <Input
                            type="text"
                            placeholder="Name of business"
                            disabled={true}
                            defaultValue={userInfo?.user_detail?.etin_number}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="12">
                        <FormGroup>
                          <Label>Address</Label>
                          <Input
                            type="text"
                            placeholder="Address"
                            disabled={true}
                            defaultValue={item.address}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Total Assets</Label>
                          <Input
                            type="number"
                            placeholder="Name of business"
                            disabled={true}
                            defaultValue={item.total_assets ?? ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Closing Liabilities</Label>
                          <Input
                            type="text"
                            disabled={true}
                            defaultValue={item.closing_liabilities ?? ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Closing Capital</Label>
                          <Input
                            type="text"
                            disabled={true}
                            defaultValue={item.closing_capital ?? ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Fragment>
                ))}
              </Form>
            </>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default BusinessAssets;
