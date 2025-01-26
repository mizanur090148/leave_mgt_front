import { useState } from 'react'
import { CardBody, Col, Row } from 'reactstrap';
import { featherIconsData } from '../../../Data/Icons/FeatherIcons';
import IconMarkUp from '../IconMarkUp';
import { H6 } from '../../../AbstractElements';

const FeatherIconCardBody = () => {
    const featherIcons = require("feather-icons");
    const [iTag, setiTag] = useState<string | object>("");
    const [feathericon, setfeatherIcon] = useState<string | object>("");
  
    const getItag = (tag: string) => {
      setiTag({ iTag: '<i data-feather="' + tag + '"></i>' });
      setfeatherIcon({ feathericon: tag });
    };
    
    return (
      <CardBody>
        <Row className="icon-lists feather-icons">
          {featherIconsData.map((singleIcon: string, index) => (
            <Col xs="12" sm="6" xl="4" key={index} onClick={() => getItag(singleIcon)}>
              <div className="d-flex">
                <div
                  dangerouslySetInnerHTML={{
                    __html: featherIcons.icons[singleIcon].toSvg(singleIcon),
                  }}
                />
                <div className="flex-grow-1 align-self-center">
                  <H6 className="mt-0">{singleIcon}</H6>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <IconMarkUp itag={iTag} icons={feathericon} />
      </CardBody>
    );
}

export default FeatherIconCardBody