import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { sonodTypes, certificateNoteText } from "../../../utils/helpers";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import RichTextEditor, { EditorValue } from "react-rte";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../utils/axiosRequests";
import CitizenShip from "../../Certificates/Forms/CitizenShip";
import TradeLicence from "../../Certificates/Forms/TradeLicence";
import CharacterSonod from "../../Certificates/Forms/CharacterSonod";
import DeathCertificate from "../../Certificates/Forms/DeathCertificate";
import UnemploymentCertificate from "../../Certificates/Forms/UnemploymentCertificate";
import UnmarriedCertificate from "../../Certificates/Forms/UnmarriedCertificate";
import MarriedCertificate from "../../Certificates/Forms/MarriedCertificate";
import Widow from "../../Certificates/Forms/Widow";
import CertificationCertificate from "../../Certificates/Forms/CertificationCertificate";
import NewVoterCertificate from "../../Certificates/Forms/NewVoterCertificate";
import VoterTransferCertificate from "../../Certificates/Forms/VoterTransferCertificate";
import ParentPermissionCertificate from "../../Certificates/Forms/ParentPermissionCertificate";
import MonthlyIncomeCertificate from "../../Certificates/Forms/MonthlyIncomeCertificate";
import YearlyIncomeCertificate from "../../Certificates/Forms/YearlyIncomeCertificate";
import NonObjectionCertificate from "../../Certificates/Forms/NonObjectionCertificate";
import KhamariCertificate from "../../Certificates/Forms/KhamariCertificate";
import VoterCorrectionCertificate from "../../Certificates/Forms/VoterCorrectionCertificate";
import MarrigeWithoutDowryCertificate from "../../Certificates/Forms/MarrigeWithoutDowryCertificate";
import MyEditor from "../FormsControl/FormsValidation/TooltipFormValidation/MyEditor";
import moment from "moment";

interface CertificateInputs {
  certificateNo: string;
  type: string;
  issueDate: Date;
  name: string;
  details: {
    applicantName: string;
    fathersName: string;
    mothersName: string;
    husbandName: string;
    nid: string;
    holdingNo: string;
    birthCertificateNo: string;
    birthDate?: Date;
    applicantAddress: string;
    instituteName: string;
  };
}

const CertificateEditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let certificate = location?.state?.certificate;
  console.log(certificate, "certificatecertificatecertificate");
  const userInfo = useSelector((state: AppState) => state.auth.data);
  const [serverError, setServerError] = useState("");
  const [type, setType] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [certificateNo, setCertificateNo] = useState("");
  const [isNid, setIsNid] = useState<boolean>(true);
  const [isHusband, setIsHusband] = useState<boolean>(false);
  const [financeYear, setFinanceYear] = useState("২০২২-২৩");
  const [tradeLicenceDetails, setTradeLicenceDetails] = useState([]);
  const [relatives, setRelatives] = useState([{ name: "", relationship: "" }]);
  const [taxesAndFees, setTaxesAndFees] = useState([{ item: "", amount: "" }]);
  const [certificateNote, setCertificateNote] = useState(
    RichTextEditor.createEmptyValue()
  );

  // const intialData: CertificateInputs = {
  //   certificateNo: "123123",
  //   type: "",
  //   issueDate: new Date(),
  //   name: "jhyf",
  //   details: {
  //     applicantName: "sdfdsf",
  //     fathersName: "sdfdsf",
  //     mothersName: "sdfdsf",
  //     husbandName: "sfsf",
  //     nid: "1221",
  //     birthCertificateNo: "asdas",
  //     birthDate: undefined,
  //     applicantAddress: "asdsad",
  //     instituteName: "asfsafas",
  //   },
  // };

  console.log(certificate?.issueDate, new Date(), certificate, "certificate");

  const intialData: CertificateInputs = {
    certificateNo: certificate?.certificateNo,
    type: certificate?.type,
    issueDate: certificate?.issueDate
      ? new Date(certificate.issueDate)
      : new Date(),
    name: certificate?.name,
    details: {
      applicantName: certificate?.details?.applicantName,
      fathersName: certificate?.details?.fathersName,
      mothersName: certificate?.details?.mothersName,
      husbandName: certificate?.details?.husbandName,
      nid: certificate?.details?.nid,
      holdingNo: certificate?.details?.holdingNo,
      birthCertificateNo: certificate?.details?.birthCertificateNo,
      birthDate: certificate?.details?.birthDate
        ? new Date(certificate?.details?.birthDate)
        : undefined,
      applicantAddress: certificate?.details?.applicantAddress,
      instituteName: certificate?.details?.instituteName,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CertificateInputs>({
    defaultValues: { ...intialData },
  });

  const applicantName = watch("details.applicantName");
  const fathersName = watch("details.fathersName");
  const mothersName = watch("details.mothersName");
  const husbandName = watch("details.husbandName");
  const applicantAddress = watch("details.applicantAddress");
  const nid = watch("details.nid");
  const birthCertificateNo = watch("details.birthCertificateNo");
  const instituteName = watch("details.instituteName");

  useEffect(() => {
    if (certificate) {
      setCertificateId(certificate._id);
      setType(certificate.type.toString());
      setCertificateNo(certificate?.certificateNo);
      setIsNid(certificate?.details?.birthCertificateNo ? false : true);
      setIsHusband(certificate?.details?.fathersName ? false : true);
      //const [isHusband, setIsHusband] = useState<boolean>(false);
    }
  }, []);

  // useEffect(() => {
  //   reset(intialData);
  // }, [intialData, reset]);

  useEffect(() => {
    const defaultData = certificateNoteText(
      type,
      applicantName,
      fathersName,
      mothersName,
      husbandName,
      applicantAddress,
      nid,
      birthCertificateNo,
      isNid,
      isHusband,
      instituteName
    );
    setCertificateNote(
      RichTextEditor.createValueFromString(defaultData, "html")
    );
  }, [
    type,
    isHusband,
    applicantName,
    fathersName,
    mothersName,
    husbandName,
    applicantAddress,
    nid,
    birthCertificateNo,
    instituteName,
  ]);

  const onSubmit: SubmitHandler<CertificateInputs> = (data: any) => {
    //const onSubmit = (data: any) => {
    let input;
    switch (parseInt(type)) {
      case 4:
        input = {
          ...data,
          type,
          certificateNote,
        };
        //  input.details = { ...data.details, relatives };
        break;
      case 3:
        input = {
          ...data,
          certificateNote,
          type,
        };
        //  input.details = { ...data.details, taxesAndFees, financeYear };
        break;
      case 13:
        input = {
          ...data,
          certificateNote: certificateNote.toString("html"),
          details: {},
        };
        break;
      case 1:
      case 2:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      // case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        input = {
          ...data,
          type,
          certificateNote: certificateNote.toString("html"),
        };
        break;
    }
    console.log(input, "input");
    patchRequest(`certificates/${certificate?._id}`, input)
      .then((data: any) => {
        toast.success("Successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/certificate/list");
      })
      .catch((error) => {
        setServerError(error.message);
        console.log("from react query error: ", error.message);
      });
  };

  useEffect(() => {}, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row className="g-3 custom-input mb-3">
        <Col md="4"></Col>
        <Col md="4">
          <Label className="text-center d-block" style={{ fontSize: "13px" }}>
            সনদ টাইপ
          </Label>
          <Input
            type="select"
            id="type"
            bsSize="sm"
            {...register("type", { required: true })}
            value={certificate?.type}
            defaultValue={certificate?.type}
            onChange={(e) => {
              setValue("type", e.target.value);
              setType(e.target.value);
              setIsNid(true);
            }}
          >
            <option>সিলেক্ট সনদ টাইপ</option>
            {sonodTypes().map((data, key) => (
              <option key={key} value={data.id}>
                {data.name}
              </option>
            ))}
          </Input>
          {errors.type && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      {type === "1" && (
        <CitizenShip
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "2" && (
        <CharacterSonod
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "3" && (
        <TradeLicence
          isNid={isNid}
          setIsNid={setIsNid}
          setValue={setValue}
          financeYear={financeYear}
          details={tradeLicenceDetails}
          setFinanceYear={setFinanceYear}
          taxesAndFees={taxesAndFees}
          setTaxesAndFees={setTaxesAndFees}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
          // financeYear={financeYear}
          // setFinanceYear={setFinanceYear}
          // taxesAndFees={taxesAndFees}
          // setTaxesAndFees={setTaxesAndFees}
          // certificateNote={certificateNote}
          // setCertificateNote={setCertificateNote}
          // register={register}
          // errors={errors}
          // serverError={serverError}
        />
      )}
      {type === "5" && (
        <DeathCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "6" && (
        <UnemploymentCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "7" && (
        <UnmarriedCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "8" && (
        <MarriedCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "9" && (
        <Widow
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "10" && (
        <CertificationCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "11" && (
        <NewVoterCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "12" && (
        <VoterTransferCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "13" && (
        <ParentPermissionCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "14" && (
        <MonthlyIncomeCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "15" && (
        <YearlyIncomeCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "16" && (
        <NonObjectionCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "17" && (
        <KhamariCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "18" && (
        <VoterCorrectionCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      {type === "19" && (
        <MarrigeWithoutDowryCertificate
          isNid={isNid}
          setIsNid={setIsNid}
          isHusband={isHusband}
          setIsHusband={setIsHusband}
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          serverError={serverError}
        />
      )}
      <Row className="mb-3">
        <Col xs="12">
          {type && (
            <MyEditor
              certificateNote={certificateNote}
              setCertificateNote={setCertificateNote}
            />
          )}
        </Col>
      </Row>
      {type && (
        <Row className="mb-3">
          <Col sm="12">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary"
            >
              Submit
            </button>
            {/* <Btn
              color="primary"
              type="submit"
              onClick={() => handleSubmit(onSubmit)}
            >
              {"SubmitButton"}
            </Btn> */}
          </Col>
        </Row>
      )}
    </form>
  );
};

export default CertificateEditForm;
