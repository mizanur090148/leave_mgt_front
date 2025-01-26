import { Col, Row } from "reactstrap";
import { H3, H4, Image, P } from "../../../../../AbstractElements";
import { Invoice, Mofi } from "../../../../../utils/Constant";
import { dynamicImage } from "../../../../../Service";

const InvoiceSixHeader = () => {
  return (
    <div>
      <Row>
        <Col sm="6">
          <div className="d-flex">
            <div className="media-left">
              <Image className="media-object img-60 for-light" src={dynamicImage("other-images/logo-login.png")} alt="logo" />
              <Image className="media-object img-60 for-dark" src={dynamicImage("other-images/logo-light.png")} alt="logo" />
            </div>
            <div className="flex-grow-1 m-l-20 text-right">
              <H4 className="media-heading">{Mofi} </H4>
              <P>
                hello@Mofi.in
                <br />
                <span>289-335-6503</span>
              </P>
            </div>
          </div>
        </Col>
        <Col sm="6">
          <div className="text-md-end text-xs-center">
            <H3>
              {Invoice} #<span className="counter">1069</span>
            </H3>
            <P>
              Issued: May<span> 27, 2024</span>
              <br /> Payment Due: June <span>27, 2024</span>
            </P>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceSixHeader;
