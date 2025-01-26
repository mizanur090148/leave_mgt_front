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
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { Btn, H4 } from "../../../../AbstractElements";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import { incomeTotalData } from "../../../../utils/helpers";
import { incomeEntry } from "../../../../Store/Slices/PastReturnTotalSlice";
import IncomeEntryTop from "./IncomeEntryTop";


interface SaleLand {
  asset_id: string;
  type: string;
  portion_of_sale: number | null;
  sale_price: number | null;
  land_cost: number | null;
  tax_deduction: number | null;
};

interface MarketShare {
  share_id: string;
  type: string;
  sale_price: number | null;
  share_cost: number | null;
  tax_deduction: number | null;
};

interface OtherAsset {
  other_asset_id: string;
  type: string;
  sale_qty: number | null;
  sale_price: number | null;
  cost_price: number | null;
  tax_deduction: number | null;
};


interface CapitalGain {
  saleLands: SaleLand[];
  marketShares: MarketShare[];
  otherAssets: OtherAsset[]
}

const CapitalGain = () => {
  let userInfo = useSelector((state: any) => state.auth.data);
  const incomeEntryData = useSelector((state: any) => state?.pastReturn?.incomeEntryData);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saleOfLandDropdown, setSaleOfLandDropdown] = useState<any[]>([]);
  const [otherAssetsDropdown, setOtherAssetsDropdown] = useState<any[]>([]);
  const [
    marketShareDropdown,
    setMarketShareDropdown,
  ] = useState<any[]>([]);
  const [isCapitalGain, setIsCapitalGain] = useState<boolean>(false);
  const [capitalGain, setCapitalGain] = useState<any>({});
  const [id, setId] = useState<any>("");
  const [saleLands, setSaleLands] = useState<SaleLand[]>([
    {
      asset_id: "",
      type: "",
      portion_of_sale: null,
      sale_price: null,
      land_cost: null,
      tax_deduction: null
    }
  ]);
  const [marketShares, setMarketShares] = useState<MarketShare[]>([
    {
      share_id: "",
      type: "",
      sale_price: null,
      share_cost: null,
      tax_deduction: null,
    },
  ]);
  const [otherAssets, setOtherAssets] = useState<OtherAsset[]>([
    {
      other_asset_id: "",
      type: "",
      sale_qty: null,
      sale_price: null,
      cost_price: null,
      tax_deduction: null,
    },
  ]);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CapitalGain>({
    defaultValues: {
      // saleLands,
      // marketShares,
      // otherAssets
    },
  });

  const getCapitalGain = async () => {
    setLoading(true);
    await getRequest(`income-entries/${userInfo.id}`)
      .then((res) => {
        setId(res?.data?.id);
        setIsCapitalGain(res?.data?.is_capital_gain ?? true);

        const data = res?.data?.capital_gain;
        if (data?.saleLands) {
          setSaleLands(data?.saleLands);
          data?.saleLands?.forEach((item: any, index: number) => {
            setValue(`saleLands.${index}.asset_id`, item.asset_id);
            setValue(`saleLands.${index}.type`, item.type);
            setValue(`saleLands.${index}.portion_of_sale`, item.portion_of_sale);
            setValue(`saleLands.${index}.sale_price`, item.sale_price);
            setValue(`saleLands.${index}.land_cost`, item.land_cost);
            setValue(`saleLands.${index}.tax_deduction`, item.tax_deduction);
          });
        }
        if (data?.marketShares) {
          setMarketShares(data?.marketShares);
          data?.marketShares?.forEach((item: any, index: number) => {
            setValue(`marketShares.${index}.share_id`, item.share_id);
            setValue(`marketShares.${index}.type`, item.type);
            setValue(`marketShares.${index}.sale_price`, item.sale_price);
            setValue(`marketShares.${index}.share_cost`, item.share_cost);
            setValue(`marketShares.${index}.tax_deduction`, item.tax_deduction);
          });
        }
        if (data?.otherAssets) {
          setOtherAssets(data?.otherAssets);
          data?.otherAssets?.forEach((item: any, index: number) => {
            setValue(`otherAssets.${index}.other_asset_id`, item.other_asset_id);
            setValue(`otherAssets.${index}.type`, item.type);
            setValue(`otherAssets.${index}.sale_qty`, item.sale_qty);
            setValue(`otherAssets.${index}.sale_price`, item.sale_price);
            setValue(`otherAssets.${index}.cost_price`, item.cost_price);
            setValue(`otherAssets.${index}.tax_deduction`, item.tax_deduction);
          });
        }
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
        `settings/complex-dropdown?type=saleLand`
      );
      if (res?.data?.length) {
        setSaleOfLandDropdown(res?.data);
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
        `settings/complex-dropdown?type=otherAssets`
      );
      if (res?.data?.length) {
        setOtherAssetsDropdown(res?.data);
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
        `settings/complex-dropdown?type=saleShare`
      );
      if (res?.data?.length) {
        setMarketShareDropdown(res?.data);
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
    }
  }, [capitalGain, setValue]);

  console.log(errors, "error")

  const onSubmit: SubmitHandler<any> = async (inputData: any) => {
    console.log(inputData, "inputDatainputData");
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
        topDataUpdate(res?.data);
        setMessage("Successfully Updated");
        setOpen(true);
        setSaveLoading(false);
      })
      .catch((error) => {
        setSaveLoading(false);
        console.log("from react query error: ", error.message);
      });
  };

  const getCostPrice = (type: string, id: any) => {
    let result = 0;
    if (type === 'saleLand') {
      result = saleOfLandDropdown?.find((item) => item?.id === parseInt(id))?.amount ?? 0;
    } else if (type === 'marketShare') {
      result = marketShareDropdown?.find((item) => item?.id === parseInt(id))?.amount ?? 0;
    } else if (type === 'otherAsset') {
      result = otherAssetsDropdown?.find((item) => item?.id === parseInt(id))?.amount ?? 0;
    }
    return result;
  }

  const getType = (type: string, id: any) => {
    let result = null;
    if (type === 'saleLand') {
      result = saleOfLandDropdown?.find((item) => item?.id === parseInt(id))?.type ?? null;
    } else if (type === 'marketShare') {
      result = marketShareDropdown?.find((item) => item?.id === parseInt(id))?.type ?? null;
    } else if (type === 'otherAsset') {
      result = otherAssetsDropdown?.find((item) => item?.id === parseInt(id))?.type ?? null;
    }
    return result;
  }

  const addMore = (type: string) => {
    if (type === 'saleLand') {
      setSaleLands([
        ...saleLands,
        {
          asset_id: "",
          type: "",
          portion_of_sale: null,
          sale_price: null,
          land_cost: null,
          tax_deduction: null
        },
      ]);
    } else if (type === 'marketShare') {
      setMarketShares([
        ...marketShares, {
          share_id: "",
          type: "",
          sale_price: null,
          share_cost: null,
          tax_deduction: null,
        }
      ])
    } else if (type === 'otherAsset') {
      setOtherAssets([
        ...otherAssets, {
          other_asset_id: "",
          type: "",
          sale_qty: null,
          sale_price: null,
          cost_price: null,
          tax_deduction: null,
        }
      ])
    }
  };

  const deleteAction = (type: string, key: any) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmation) {
      if (type === 'saleLand') {
        let updatedSaleLands = [...saleLands];
        if (updatedSaleLands?.length === 1) {
          updatedSaleLands = [{
            asset_id: "",
            type: "",
            portion_of_sale: null,
            sale_price: null,
            land_cost: null,
            tax_deduction: null
          }];
        } else {
          updatedSaleLands?.splice(key, 1);
        }
        setSaleLands([...updatedSaleLands]);
      } else if (type === 'marketShare') {
        let updatedMarketShares = [...marketShares];
        if (updatedMarketShares?.length === 1) {
          updatedMarketShares = [{
            share_id: "",
            type: "",
            sale_price: null,
            share_cost: null,
            tax_deduction: null,
          }];
        } else {
          updatedMarketShares?.splice(key, 1);
        }
        setMarketShares([...updatedMarketShares]);
      } else if (type === 'otherAsset') {
        let updatedOtherAssets = [...otherAssets];
        if (updatedOtherAssets?.length === 1) {
          updatedOtherAssets = [{
            other_asset_id: "",
            type: "",
            sale_qty: null,
            sale_price: null,
            cost_price: null,
            tax_deduction: null,
          }];
        } else {
          updatedOtherAssets?.splice(key, 1);
        }
        setOtherAssets([...updatedOtherAssets]);
      }
    }
  }

  const topDataUpdate = (updatedData: any) => {
    let saleLandAmount = 0;
    let saleMarketShare = 0;
    let saleOtherAsset = 0;

    if (updatedData?.capital_gain?.saleLands) {
      saleLandAmount = saleLands?.reduce(
        (acc, curr) => acc + (curr?.sale_price || 0) - getCostPrice('saleLand', curr?.asset_id),
        0
      );
    }
    if (updatedData?.capital_gain?.marketShares) {
      saleMarketShare = marketShares?.reduce(
        (acc, curr) => acc + (curr?.sale_price || 0) - getCostPrice('marketShare', curr?.share_id),
        0
      );
    }
    if (updatedData?.capital_gain?.otherAssets) {
      saleOtherAsset = otherAssets?.reduce(
        (acc, curr) => acc + (curr?.sale_price || 0) - getCostPrice('otherAsset', curr?.other_asset_id),
        0
      );
    }
    const total = saleLandAmount + saleMarketShare + saleOtherAsset;

    console.log(total, updatedData, "total")

    const updatedState = {
      ...incomeEntryData,
      capital_gain: total,
      total: incomeTotalData({ ...incomeEntryData, capital_gain: total })
    };
    dispatch(incomeEntry(updatedState));
  }



  return (
    <Col xl="9" className="capital-gain">
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <IncomeEntryTop
        title={"Total Capital Gain"}
        itemName={'capital_gain'}
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
                    <b>Income Details</b>
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
                    {saleLands?.map((saleLand, key) => (
                      <Fragment key={key}>
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
                                {...register(`saleLands.${key}.asset_id`, {
                                  required: "This is required",
                                })}
                                value={saleLand?.asset_id}
                                defaultValue={saleLand?.asset_id}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const updatedLands = [...saleLands];
                                  updatedLands[key].asset_id = value;
                                  const type = getType('saleLand', value);
                                  updatedLands[key].type = type;

                                  setSaleLands(updatedLands);
                                  setValue(`saleLands.${key}.asset_id`, value);
                                  setValue(`saleLands.${key}.type`, type);
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
                              {errors.saleLands?.[key]?.asset_id && (
                                <span className="error-msg">
                                  {errors.saleLands[key]?.asset_id?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Portion of Sale</Label>
                              <Input
                                type="number"
                                placeholder="Portion of Sale"
                                {...register(`saleLands.${key}.portion_of_sale`, saleLand?.asset_id ? {
                                  required: "This is required",
                                  valueAsNumber: true,
                                } : {})}
                                onChange={(e) => {
                                  const value = +e.target.value;
                                  const updatedLands = [...saleLands];
                                  updatedLands[key].portion_of_sale = value;
                                  setSaleLands(updatedLands);
                                  setValue(`saleLands.${key}.portion_of_sale`, value);
                                }}
                                defaultValue={saleLand?.portion_of_sale ?? ""}
                                value={saleLand?.portion_of_sale ?? ""}
                              />
                              {errors.saleLands?.[key]?.portion_of_sale && (
                                <span className="error-msg">
                                  {errors.saleLands[key]?.portion_of_sale?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label className="del-btn">
                                <span>Sale Price</span>
                                <span><i onClick={() => deleteAction('saleLand', key)} className="fa fa-times-circle"></i></span>
                              </Label>
                              <Input
                                type="number"
                                placeholder="Sale price"
                                {...register(`saleLands.${key}.sale_price`, saleLand?.asset_id ? {
                                  required: "This is required",
                                  valueAsNumber: true,
                                } : {})}
                                onChange={(e) => {
                                  const value = +e.target.value;
                                  const updatedLands = [...saleLands];
                                  updatedLands[key].sale_price = value;
                                  setSaleLands(updatedLands);
                                  setValue(`saleLands.${key}.sale_price`, value);
                                }}
                                defaultValue={saleLand?.sale_price ?? ""}
                                value={saleLand?.sale_price ?? ""}
                              />
                              {errors.saleLands?.[key]?.sale_price && (
                                <span className="error-msg">
                                  {errors.saleLands[key]?.sale_price?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Cost Price</Label>
                              <Input
                                type="number"
                                placeholder="Cost Price"
                                disabled={saleLand?.asset_id ? false : true}
                                defaultValue={saleLand?.asset_id && getCostPrice('saleLand', saleLand?.asset_id)}
                                value={saleLand?.asset_id && getCostPrice('saleLand', saleLand?.asset_id)}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Capital Gain/Loss</Label>
                              <Input
                                type="number"
                                disabled
                                value={(saleLand?.sale_price || 0) - getCostPrice('saleLand', saleLand?.asset_id)}
                                placeholder="Capital Gain/Loss"
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Tax Deduction at Source (TDS)</Label>
                              <Input
                                type="number"
                                placeholder="Tax Deduction at Source (TDS)"
                                {...register(`saleLands.${key}.tax_deduction`, {
                                  //required: "This is required",
                                  valueAsNumber: true,
                                  onChange: (e) => {
                                    const value = +e.target.value;
                                    const updatedLands = [...saleLands];
                                    updatedLands[key].tax_deduction = value;
                                    setSaleLands(updatedLands);
                                    setValue(`saleLands.${key}.tax_deduction`, value);
                                  },
                                })}
                                defaultValue={saleLand?.tax_deduction ?? 0}
                                value={saleLand?.tax_deduction ?? ""}
                              />
                              {errors.saleLands?.[key]?.tax_deduction && (
                                <span className="error-msg">
                                  {errors.saleLands[key]?.tax_deduction?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </Fragment>
                    ))}
                    <Row>
                      <Col>
                        <Btn
                          className="btn-full mb-2"
                          color="outline-info"
                          type="button"
                          onClick={() => addMore('saleLand')}
                        >
                          Add More <i className="fa fa-plus-circle pl-2"></i>
                        </Btn>
                      </Col>
                    </Row>
                    {marketShares?.map((marketShare, key) => (
                      <Fragment key={key}>
                        {key !== 0 && (<div className="dashed-hr"></div>)}
                        <Row>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Capital Gain From Capital Market (Shares)</Label>
                              <Input
                                style={{ padding: "6px 10px" }}
                                type="select"
                                bsSize="sm"
                                className="form-select select-custom"
                                {...register(`marketShares.${key}.share_id`, {
                                  //required: "This is required",
                                })}
                                value={marketShare?.share_id}
                                defaultValue={marketShare?.share_id}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const updatedLands = [...marketShares];
                                  updatedLands[key].share_id = value;
                                  const type = getType('marketShare', value);
                                  updatedLands[key].type = type;

                                  setMarketShares(updatedLands);
                                  setValue(`marketShares.${key}.share_id`, value);
                                  setValue(`marketShares.${key}.type`, type);
                                }}
                              >
                                <option value="">Select One</option>
                                {marketShareDropdown?.map(
                                  (data: any, index: any) => (
                                    <option key={index} value={data.id}>
                                      {data.name}
                                    </option>
                                  )
                                )}
                              </Input>
                              {errors.marketShares?.[key]?.share_id && (
                                <span className="error-msg">
                                  {errors.marketShares[key]?.share_id?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Sale Price</Label>
                              <Input
                                type="number"
                                placeholder="Sale price"
                                {...register(`marketShares.${key}.sale_price`, marketShare?.share_id ? {
                                  required: "This is required",
                                  valueAsNumber: true,
                                } : {})}
                                onChange={(e) => {
                                  const value = +e.target.value;
                                  const updatedLands = [...marketShares];
                                  updatedLands[key].sale_price = value;
                                  setMarketShares(updatedLands);
                                  setValue(`marketShares.${key}.sale_price`, value);
                                }}
                                defaultValue={marketShare?.sale_price ?? ""}
                                value={marketShare?.sale_price ?? ""}
                              />
                              {errors.marketShares?.[key]?.sale_price && (
                                <span className="error-msg">
                                  {errors.marketShares[key]?.sale_price?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label className="del-btn">
                                <span>Cost Price</span>
                                <span><i onClick={() => deleteAction('marketShare', key)} className="fa fa-times-circle"></i></span>
                              </Label>
                              <Input
                                type="number"
                                placeholder="Cost Price"
                                disabled={marketShare?.share_id ? false : true}
                                defaultValue={marketShare?.share_id && getCostPrice('marketShare', marketShare?.share_id)}
                                value={marketShare?.share_id && getCostPrice('marketShare', marketShare?.share_id)}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Capital Gain/Loss</Label>
                              <Input
                                type="number"
                                disabled
                                value={(marketShare?.sale_price || 0) - getCostPrice('marketShare', marketShare?.share_id)}
                                placeholder="Capital Gain/Loss"
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Tax Deduction at Source (TDS)</Label>
                              <Input
                                type="number"
                                placeholder="Tax Deduction at Source (TDS)"
                                {...register(`marketShares.${key}.tax_deduction`, marketShare?.share_id ? {
                                  //required: "This is required",
                                  valueAsNumber: true,
                                } : {})}
                                onChange={(e) => {
                                  const value = +e.target.value;
                                  const updatedLands = [...marketShares];
                                  updatedLands[key].tax_deduction = value;
                                  setMarketShares(updatedLands);
                                  setValue(`marketShares.${key}.tax_deduction`, value);
                                }}
                                defaultValue={marketShare?.tax_deduction ?? ""}
                                value={marketShare?.tax_deduction ?? ""}
                              />
                              {errors.marketShares?.[key]?.tax_deduction && (
                                <span className="error-msg">
                                  {errors.marketShares[key]?.tax_deduction?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </Fragment>
                    ))}
                    <Row>
                      <Col>
                        <Btn
                          className="btn-full mb-2"
                          color="outline-info"
                          type="button"
                          onClick={() => addMore('marketShare')}
                        >
                          Add More <i className="fa fa-plus-circle pl-2"></i>
                        </Btn>
                      </Col>
                    </Row>
                    {otherAssets?.map((otherAsset, key) => (
                      <Fragment key={key}>
                        <div className="dashed-hr"></div>
                        <Row>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Capital Gain from any other Assets</Label>
                              <Input
                                style={{ padding: "6px 10px" }}
                                type="select"
                                bsSize="sm"
                                className="form-select select-custom"
                                {...register(`otherAssets.${key}.other_asset_id`, {
                                  required: "This is required",
                                })}
                                value={otherAsset?.other_asset_id}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const updatedLands = [...otherAssets];
                                  updatedLands[key].other_asset_id = value;
                                  const type = getType('otherAsset', value);
                                  updatedLands[key].type = type;

                                  setOtherAssets(updatedLands);
                                  setValue(`otherAssets.${key}.other_asset_id`, value);
                                  setValue(`otherAssets.${key}.type`, type);
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
                              {errors.otherAssets?.[key]?.other_asset_id && (
                                <span className="error-msg">
                                  {errors.otherAssets[key]?.other_asset_id?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Sale Quantity</Label>
                              <Input
                                type="number"
                                placeholder="Sale Quantity"
                                {...register(`otherAssets.${key}.sale_qty`, otherAsset?.other_asset_id ? {
                                  required: "This is required",
                                  valueAsNumber: true,
                                } : {})}
                                onChange={(e) => {
                                  const value = +e.target.value;
                                  const updatedLands = [...otherAssets];
                                  updatedLands[key].sale_qty = value;
                                  setOtherAssets(updatedLands);
                                  setValue(`otherAssets.${key}.sale_qty`, value);
                                }}
                                defaultValue={otherAsset?.sale_qty ?? ""}
                                value={otherAsset?.sale_qty ?? ""}
                              />
                              {errors.otherAssets?.[key]?.sale_qty && (
                                <span className="error-msg">
                                  {errors.otherAssets[key]?.sale_qty?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label className="del-btn">
                                <span>Sale Price</span>
                                <span><i onClick={() => deleteAction('otherAsset', key)} className="fa fa-times-circle"></i></span>
                              </Label>
                              <Input
                                type="number"
                                placeholder="Sale price"
                                {...register(`otherAssets.${key}.sale_price`, otherAsset?.other_asset_id ? {
                                  required: "This is required",
                                  valueAsNumber: true,
                                } : {})}
                                onChange={(e) => {
                                  const value = +e.target.value;
                                  const updatedLands = [...otherAssets];
                                  updatedLands[key].sale_price = value;
                                  setOtherAssets(updatedLands);
                                  setValue(`otherAssets.${key}.sale_price`, value);
                                }}
                                defaultValue={otherAsset?.sale_price ?? ""}
                                value={otherAsset?.sale_price ?? ""}
                              />
                              {errors.otherAssets?.[key]?.sale_price && (
                                <span className="error-msg">
                                  {errors.otherAssets[key]?.sale_price?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Cost Price</Label>
                              <Input
                                type="number"
                                placeholder="Cost Price"
                                disabled={otherAsset?.other_asset_id ? false : true}
                                defaultValue={otherAsset?.other_asset_id && getCostPrice('otherAsset', otherAsset?.other_asset_id)}
                                value={otherAsset?.other_asset_id && getCostPrice('otherAsset', otherAsset?.other_asset_id)}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Capital Gain/Loss</Label>
                              <Input
                                type="number"
                                disabled
                                value={(otherAsset?.sale_price || 0) - getCostPrice('otherAsset', otherAsset?.other_asset_id)}
                                placeholder="Capital Gain/Loss"
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="4" md="4">
                            <FormGroup>
                              <Label>Tax Deduction at Source (TDS)</Label>
                              <Input
                                type="number"
                                placeholder="Tax Deduction at Source (TDS)"
                                {...register(`otherAssets.${key}.tax_deduction`, {
                                  //required: "This is required",
                                  valueAsNumber: true,
                                  onChange: (e) => {
                                    const value = +e.target.value;
                                    const updatedLands = [...otherAssets];
                                    updatedLands[key].tax_deduction = value;
                                    setOtherAssets(updatedLands);
                                    setValue(`otherAssets.${key}.tax_deduction`, value);
                                  },
                                })}
                                defaultValue={otherAsset?.tax_deduction ?? 0}
                                value={otherAsset?.tax_deduction ?? 0}
                              />
                              {errors.otherAssets?.[key]?.tax_deduction && (
                                <span className="error-msg">
                                  {errors.otherAssets[key]?.tax_deduction?.message}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </Fragment>
                    ))}
                    <Row>
                      <Col>
                        <Btn
                          className="btn-full mb-2"
                          color="outline-info"
                          type="button"
                          onClick={() => addMore('otherAsset')}
                        >
                          Add More <i className="fa fa-plus-circle pl-2"></i>
                        </Btn>
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

export default CapitalGain;
