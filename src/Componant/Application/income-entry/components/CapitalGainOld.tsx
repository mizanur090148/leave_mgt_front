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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { Btn } from "../../../../AbstractElements";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";

const CapitalGainOld = () => {
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nonAgries, setNonAgries] = useState<any[]>([]);
  const [saleOfLandDropdown, setSaleOfLandDropdown] = useState<any[]>([]);
  const [otherAssetsDropdown, setOtherAssetsDropdown] = useState<any[]>([]);
  const [
    capitalGainFromCapitalMarketDropdown,
    setCapitalGainFromCapitalMarketDropdown,
  ] = useState<any[]>([]);
  const [isCapitalGain, setIsCapitalGain] = useState<boolean>(false);
  const [capitalGain, setCapitalGain] = useState<any>({});
  const [id, setId] = useState<any>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CapitalGain>({
    defaultValues: {
      asset_id: null,
      asset_type: "",
      land_portion_of_sale: null,
      land_sale_price: null,
      land_cost: null,
      land_tax_deduction: null,
      share_id: null,
      share_type: "",
      share_sale_price: null,
      share_cost: null,
      share_tax_deduction: null,
      any_other_id: null,
      any_other_sale_price: null,
      any_other_cost: null,
      any_other_tax_deduction: null,
    },
  });

  const asset_id = watch("asset_id");
  const land_portion_of_sale = watch("land_portion_of_sale");
  const land_sale_price = watch("land_sale_price");
  const land_cost = watch("land_cost");
  const land_tax_deduction = watch("land_tax_deduction");
  const any_other_id = watch("any_other_id");
  const any_other_sale_price = watch("any_other_sale_price");
  const any_other_cost = watch("any_other_cost");
  const any_other_tax_deduction = watch("any_other_tax_deduction");

  const share_id = watch("share_id");
  const share_sale_price = watch("share_sale_price");
  const share_cost = watch("share_cost");
  const share_tax_deduction = watch("share_tax_deduction");

  const landCapitalGain = (land_sale_price || 0) - (land_cost || 0);
  const assetCapitalGain = (any_other_sale_price || 0) - (any_other_cost || 0);
  const shareCapitalGain = (share_sale_price || 0) - (share_cost || 0);
  const totalCapitalGain =
    landCapitalGain + assetCapitalGain + shareCapitalGain;
  const totalTaxDeduction =
    (land_tax_deduction || 0) +
    (share_tax_deduction || 0) +
    (any_other_tax_deduction || 0);

  const getCapitalGain = async () => {
    setLoading(true);
    await getRequest(`income-entries/${userInfo.id}`)
      .then((res) => {
        setId(res?.data?.id);
        setIsCapitalGain(res?.data?.is_capital_gain ?? true);
        setCapitalGain(res?.data?.capital_gain);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("from react query error: ", error.message);
      });
  };

  const getCapitalGainFromSaleLands = async () => {
    try {
      setLoading(true);
      const res = await getRequest(
        `settings/complex-dropdown?type=capitalGainFromSaleLand`
      );
      const types = Object.entries(res?.data || {}).map(
        ([id, name]: [any, any]) => ({
          id: Number(id),
          name: name || "",
        })
      );
      if (types?.length) {
        setSaleOfLandDropdown(types);
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetching data:", error.message);
    }
  };

  const getOtherAssetsDropdown = async () => {
    try {
      setLoading(true);
      const res = await getRequest(
        `settings/complex-dropdown?type=capitalGainFromOtherAssets`
      );
      const types = Object.entries(res?.data || {}).map(
        ([id, name]: [any, any]) => ({
          id: Number(id),
          name: name || "",
        })
      );
      if (types?.length) {
        setOtherAssetsDropdown(types);
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetching data:", error.message);
    }
  };

  const getCapitalGainFromCapitalMarket = async () => {
    try {
      setLoading(true);
      const res = await getRequest(
        `settings/complex-dropdown?type=capitalGainFromCapitalMarket`
      );
      const types = Object.entries(res?.data || {}).map(
        ([id, name_of_business]: [any, any]) => ({
          id: Number(id),
          name_of_business: name_of_business || "",
        })
      );
      if (types?.length) {
        setCapitalGainFromCapitalMarketDropdown(types);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getCapitalGainFromSaleLands();
    getCapitalGainFromCapitalMarket();
    getOtherAssetsDropdown();
    getCapitalGain();
  }, []);

  useEffect(() => {
    if (capitalGain) {
      // Set the fetched data into the form
      Object.keys(capitalGain)?.forEach((key) => {
        setValue(key as keyof CapitalGain, capitalGain[key]);
      });
      // setValue("asset_id", capitalGain?.asset_id || null);
      // setValue(
      //   "land_portion_of_sale",
      //   parseInt(capitalGain?.land_portion_of_sale || null)
      // );
      // setValue(
      //   "land_sale_price",
      //   parseInt(capitalGain?.land_sale_price ?? null)
      // );
      // setValue("land_cost", parseInt(capitalGain?.land_cost || null));
      // setValue(
      //   "land_tax_deduction",
      //   parseInt(capitalGain?.land_tax_deduction || null)
      // );
      // setValue("any_other_id", parseInt(capitalGain?.any_other_id || null));
      // setValue(
      //   "any_other_sale_price",
      //   parseInt(capitalGain?.any_other_sale_price || null)
      // );
      // setValue("any_other_cost", parseInt(capitalGain?.any_other_cost || null));
      // setValue(
      //   "any_other_tax_deduction",
      //   parseInt(capitalGain?.any_other_tax_deduction || null)
      // );
      // setValue("share_id", parseInt(capitalGain?.share_id || null));
      // setValue(
      //   "share_sale_price",
      //   parseInt(capitalGain?.share_sale_price || null)
      // );
      // setValue("share_cost", parseInt(capitalGain?.share_cost || null));
      // setValue(
      //   "share_tax_deduction",
      //   parseInt(capitalGain?.share_tax_deduction || null)
      // );
    }
  }, [capitalGain, setValue]);

  const onSubmit: SubmitHandler<CapitalGain> = async (inputData: any) => {
    setSaveLoading(true);
    inputData["is_capital_gain"] = isCapitalGain;
    const actionType = id
      ? patchRequest(`income-entries/${id}`, {
          user_id: userInfo.id,
          capital_gain: inputData,
        })
      : postRequest(`income-entries`, {
          user_id: userInfo.id,
          capital_gain: inputData,
        });
    await actionType
      .then((res: any) => {
        setId(res?.data?.id);
        setMessage("Successfully Updated");
        setOpen(true);
        setSaveLoading(false);
      })
      .catch((error) => {
        setSaveLoading(false);
        console.log("from react query error: ", error.message);
      });
  };

  let totalHeadIncome = null;

  return (
    <Col xl="9">
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <UserDetailsInformation
        title={"Total Agricultural Land"}
        totalHeadIncome={totalHeadIncome}
      />
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Capital Gain"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            {loading ? (
              <Loader loading={loading} />
            ) : (
              <>
                <Row>
                  <Col sm="6" md="12">
                    <FormGroup>
                      <Label>Have you earned any capital gain?</Label>
                      <br />
                      <Input
                        className="radio_animated"
                        id="capoital_gain_no"
                        type="radio"
                        value="false"
                        checked={isCapitalGain === false}
                        onChange={(e) => setIsCapitalGain(false)}
                      />
                      <span className="radio-right-space">No</span>
                      {/* <Input
                    className="radio_animated pl-5"
                    id="rental_income-yes"
                    type="radio"
                    value="true"
                  /> */}
                      <Input
                        className="radio_animated"
                        id="capoital_gain_yes"
                        type="radio"
                        value="true"
                        checked={isCapitalGain === true}
                        onChange={(e) => setIsCapitalGain(true)}
                      />
                      <span>Yes</span>
                    </FormGroup>
                  </Col>
                </Row>
                {isCapitalGain && (
                  <>
                    <h3> Income Details</h3>
                    <Row>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>
                            Capital Gain from sale of Agricultural Assets
                          </Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Capital Gain from sale of Agricultural Assets"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Tax Deduction at Source (TDS)"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="dashed-hr"></div>
                    <Row>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>
                            Capital Gain from sale of Business Assets
                          </Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Capital Gain from sale of Business Assets"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="6">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Tax Deduction at Source (TDS)"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="dashed-hr"></div>
                    <Row>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Capital Gain from sale of Land</Label>
                          <Input
                            style={{ padding: "6px 10px" }}
                            type="select"
                            bsSize="sm"
                            className="form-select select-custom"
                            {...register("asset_id")}
                            defaultValue={asset_id}
                            value={asset_id}
                            onChange={(e) => {
                              setValue("asset_id", e.target.value);
                            }}
                          >
                            <option value="">Select One</option>
                            {saleOfLandDropdown?.map(
                              (data: any, index: any) => (
                                <option key={index} value={data.id}>
                                  {data.name}
                                </option>
                              )
                            )}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Portion of Sale</Label>
                          <Input
                            type="number"
                            placeholder="Prize from win of Lottery"
                            {...register("land_portion_of_sale")}
                            disabled={asset_id ? false : true}
                            defaultValue={land_portion_of_sale || undefined}
                            onChange={(e) => {
                              setValue("land_portion_of_sale", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Sale Price</Label>
                          <Input
                            type="number"
                            placeholder="Sale Price"
                            {...register("land_sale_price")}
                            disabled={asset_id ? false : true}
                            defaultValue={land_sale_price || undefined}
                            onChange={(e) => {
                              setValue("land_sale_price", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Cost Price</Label>
                          <Input
                            type="number"
                            placeholder="Cost Price"
                            {...register("land_cost")}
                            disabled={asset_id ? false : true}
                            defaultValue={land_cost || undefined}
                            onChange={(e) => {
                              setValue("land_cost", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Capital Gain</Label>
                          <Input
                            type="number"
                            disabled
                            value={landCapitalGain}
                            placeholder="Capital Gain"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            placeholder="Tax Deduction at Source (TDS)"
                            {...register("land_tax_deduction")}
                            disabled={asset_id ? false : true}
                            defaultValue={land_tax_deduction || undefined}
                            onChange={(e) => {
                              setValue("land_tax_deduction", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="dashed-hr"></div>
                    <Row>
                      <Col sm="6" md="4">
                        <FormGroup>
                          <Label>
                            Capital Gain From Capital Market (Shares)
                          </Label>
                          <Input
                            style={{ padding: "6px 10px" }}
                            type="select"
                            bsSize="sm"
                            className="form-select select-custom"
                            {...register("share_id")}
                            defaultValue={share_id}
                            value={share_id}
                            onChange={(e) => {
                              setValue("share_id", e.target.value);
                            }}
                          >
                            <option value="">Select One</option>
                            {capitalGainFromCapitalMarketDropdown?.map(
                              (data: any, index: any) => (
                                <option key={index} value={data.id}>
                                  {data.name_of_business}
                                </option>
                              )
                            )}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Sale Price</Label>
                          <Input
                            type="number"
                            placeholder="Sale Price"
                            {...register("share_sale_price")}
                            disabled={share_id ? false : true}
                            defaultValue={share_sale_price || undefined}
                            onChange={(e) => {
                              setValue("share_sale_price", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Cost Price</Label>
                          <Input
                            type="number"
                            placeholder="Cost Price"
                            {...register("share_cost")}
                            disabled={share_id ? false : true}
                            defaultValue={share_cost || undefined}
                            onChange={(e) => {
                              setValue("share_cost", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Capital Gain</Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Capital Gain"
                            value={shareCapitalGain}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            placeholder="Tax Deduction at Source (TDS)"
                            {...register("share_tax_deduction")}
                            disabled={share_id ? false : true}
                            defaultValue={share_tax_deduction || undefined}
                            onChange={(e) => {
                              setValue("share_tax_deduction", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="dashed-hr"></div>
                    <Row>
                      <Col sm="6" md="4">
                        <FormGroup>
                          <Label>Capital Gain from any other Assets</Label>
                          <Input
                            style={{ padding: "6px 10px" }}
                            type="select"
                            bsSize="sm"
                            className="form-select select-custom"
                            {...register("any_other_id")}
                            defaultValue={any_other_id}
                            value={any_other_id}
                            onChange={(e) => {
                              setValue("any_other_id", e.target.value);
                            }}
                          >
                            <option value="">Select One</option>
                            {otherAssetsDropdown?.map(
                              (data: any, index: any) => (
                                <option key={index} value={data.id}>
                                  {data.name}
                                </option>
                              )
                            )}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Sale Price</Label>
                          <Input
                            type="number"
                            placeholder="Sale Price"
                            {...register("any_other_sale_price")}
                            disabled={any_other_id ? false : true}
                            defaultValue={any_other_sale_price || undefined}
                            onChange={(e) => {
                              setValue("any_other_sale_price", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Cost Price</Label>
                          <Input
                            type="number"
                            placeholder="Cost Price"
                            {...register("any_other_cost")}
                            disabled={any_other_id ? false : true}
                            defaultValue={any_other_cost || undefined}
                            onChange={(e) => {
                              setValue("any_other_cost", +e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Capital Gain</Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Capital Gain"
                            value={assetCapitalGain}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            placeholder="Tax Deduction at Source (TDS)"
                            {...register("any_other_tax_deduction")}
                            disabled={any_other_id ? false : true}
                            defaultValue={any_other_tax_deduction || undefined}
                            onChange={(e) => {
                              setValue(
                                "any_other_tax_deduction",
                                +e.target.value
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="dashed-hr"></div>
                    <Row>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Total Capital Gain</Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Total Capital Gain"
                            value={totalCapitalGain}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4" md="4">
                        <FormGroup>
                          <Label>Total Tax Deduction at Source (TDS)</Label>
                          <Input
                            type="number"
                            disabled
                            placeholder="Total Tax Deduction at Source (TDS)"
                            value={totalTaxDeduction}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </>
                )}
                <Btn
                  className="pull-right save-and-continue"
                  color="primary"
                  type="submit"
                  // onClick={() => handleSubmit(onSubmit)}
                >
                  Save & Continue
                </Btn>
                <Btn
                  className="pull-right"
                  color="primary"
                  type={saveLoading ? `button` : `submit`}
                  onClick={() => handleSubmit(onSubmit)}
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

export default CapitalGainOld;
