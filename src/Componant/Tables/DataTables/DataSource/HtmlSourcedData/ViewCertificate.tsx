import { useRef } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
//import "../../../../../../src/print.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import saturiaImg from "../../../../../images/background/saturia.jpg";
import dhanKuraImg from "../../../../../images/background/dhankura.jpg";
import horgojImg from "../../../../../images/background/horgoj.jpg";
import CitizenShipSonod from "../../../../Certificates/Views/CitizenShipSonod";
import CharacterSonod from "../../../../Certificates/Views/CharacterSonod";
import CertificateHeader from "../../../../Certificates/Partials/CertificateHeader";
import CertificateFooter from "./../../../../Certificates/Partials/CertificateFooter";
import CertificateVerifyParentPermission from "../../../../Certificates/Partials/CertificateVerifyParentPermission";
import CertificateVerify from "../../../../Certificates/Partials/CertificateVerify";
import CertificateTitle from "../../../../Certificates/Partials/CertificateTitle";
import DeathCertificate from "../../../../Certificates/Views/DeathCertificate";
import UnemploymentCertificate from "../../../../Certificates/Views/UnemploymentCertificate";
import UnmarriedCertificate from "../../../../Certificates/Views/UnmarriedCertificate";
import MarriedCertificate from "../../../../Certificates/Views/MarriedCertificate";
import WidowCertificate from "../../../../Certificates/Views/Widow";
import CertificationCertificate from "../../../../Certificates/Views/CertificationCertificate";
import NewVoterCertificate from "../../../../Certificates/Views/NewVoterCertificate";
import VoterTransferCertificate from "../../../../Certificates/Views/VoterTransferCertificate";
import ParentPermissionCertificate from "../../../../Certificates/Views/ParentPermissionCertificate";
import MonthlyIncomeCertificate from "../../../../Certificates/Views/MonthlyIncomeCertificate";
import YearlyIncomeCertificate from "../../../../Certificates/Views/YearlyIncomeCertificate";
import NonObjectionCertificate from "../../../../Certificates/Views/NonObjectionCertificate";
import KhamariSonod from "../../../../Certificates/Views/KhamariSonod";
import VoterCorrectionCertificate from "../../../../Certificates/Views/VoterCorrectionCertificate";
import MarrigeWithoutDowryCertificate from "../../../../Certificates/Views/MarrigeWithoutDowryCertificate";

const ViewCertificate = () => {
  const printRef = useRef(null);
  const { state } = useLocation();
  const { certificate } = state || {};
  const userInfo = useSelector((state: AppState) => state?.auth?.data);

  const callbackPrint = useReactToPrint({
    content: () => printRef.current,
  });

  let backgroundImg = dhanKuraImg;
  if (userInfo?.unionId?.id === "656018d53da55fd34c028b4b") {
    backgroundImg = horgojImg;
  } else if (userInfo?.unionId?.id === "65c10fe2b995d9a6664b57c7") {
    backgroundImg = saturiaImg;
  }
  backgroundImg = saturiaImg;
  const styles = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "480px 480px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#FFFFFF1A",
  };

  return (
    <Col sm="12">
      <Card>
        {/* <CardHeader className="d-flex">
          <H4 className="mb-0 f-w-600">সনদ</H4>
          <Link to={Href}>
            <Printer className="me-2" />
            {Print}
          </Link>
        </CardHeader> */}
        <CardHeader className="page-title">
          <span>সনদ</span>
          <span className="pointer">
            <ReactToPrint
              trigger={() => <i className="fa fa-print pointer"></i>}
              content={() => printRef.current}
            />
          </span>
        </CardHeader>
        <CardBody className="custom-card-body">
          <div ref={printRef} className="print-area" style={styles}>
            <div className="print-border">
              <CertificateHeader certificate={certificate} />
              <CertificateTitle type={certificate?.type} />
              {certificate?.type == 1 && (
                <CitizenShipSonod certificate={certificate} />
              )}
              {certificate?.type == 2 && (
                <CharacterSonod certificate={certificate} />
              )}
              {/* {certificate?.type == 3 && (
              <TradeLicence certificate={certificate} />
            )} */}
              {/* {certificate?.type == 4 && (
              <UttoradhikarSonod certificate={certificate} />
            )}  */}
              {certificate?.type == 5 && (
                <DeathCertificate certificate={certificate} />
              )}
              {certificate?.type == 6 && (
                <UnemploymentCertificate certificate={certificate} />
              )}
              {certificate?.type == 7 && (
                <UnmarriedCertificate certificate={certificate} />
              )}
              {certificate?.type == 8 && (
                <MarriedCertificate certificate={certificate} />
              )}
              {certificate?.type == 9 && (
                <WidowCertificate certificate={certificate} />
              )}
              {certificate?.type == 10 && (
                <CertificationCertificate certificate={certificate} />
              )}
              {certificate?.type == 11 && (
                <NewVoterCertificate certificate={certificate} />
              )}
              {certificate?.type == 12 && (
                <VoterTransferCertificate certificate={certificate} />
              )}
              {certificate?.type == 13 && (
                <ParentPermissionCertificate certificate={certificate} />
              )}
              {certificate?.type == 14 && (
                <MonthlyIncomeCertificate certificate={certificate} />
              )}
              {certificate?.type == 15 && (
                <YearlyIncomeCertificate certificate={certificate} />
              )}
              {certificate?.type == 16 && (
                <NonObjectionCertificate certificate={certificate} />
              )}
              {certificate?.type == 17 && (
                <KhamariSonod certificate={certificate} />
              )}
              {certificate?.type == 18 && (
                <VoterCorrectionCertificate certificate={certificate} />
              )}
              {certificate?.type == 19 && (
                <MarrigeWithoutDowryCertificate certificate={certificate} />
              )}
              {certificate?.type == 13 ? (
                <CertificateVerifyParentPermission certificate={certificate} />
              ) : (
                <CertificateVerify certificate={certificate} />
              )}
              {/* <CertificateFooter /> */}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ViewCertificate;
