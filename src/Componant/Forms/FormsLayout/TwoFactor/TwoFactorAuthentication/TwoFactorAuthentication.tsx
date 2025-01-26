import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col } from "reactstrap";
import { Btn, H4, Image, P } from "../../../../../AbstractElements";
import {
  FactorAuthentication,
  TwoFactorAuthenticationHeading,
} from "../../../../../utils/Constant";
import { dynamicImage } from "../../../../../Service";
import ModalOne from "./ModalOne";
import { setModalOne } from "../../../../../Store/Slices/TwoFactorSlice";

const TwoFactorAuthentication = () => {
  const dispatch = useDispatch();
  return (
    <Col sm="12">
      <Card>
        <CardBody className="authentication-body">
          <div className="authentication-wrapper">
            <H4>{TwoFactorAuthenticationHeading}</H4>
            <P>Click on the authentication button below and scan the QR code</P>
            <Image src={dynamicImage(`forms/qr-scan.png`)} alt="qr-scan" />
          </div>
          <Btn
            color="primary"
            className="mt-5"
            onClick={() => dispatch(setModalOne())}
          >
            {FactorAuthentication}
          </Btn>
          <ModalOne />
        </CardBody>
      </Card>
    </Col>
  );
};

export default TwoFactorAuthentication;
