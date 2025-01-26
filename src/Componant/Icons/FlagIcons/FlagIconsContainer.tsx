import  { useState } from 'react'
import { Card, Col, Container, Row } from 'reactstrap';
import CommonCardHeader from '../../../CommonElements/CommonCardHeader/CommonCardHeader';
import { FlagIcon } from '../../../utils/Constant';
import FlagIconCardBody from './FlagIconCardBody';
import IconMarkUp from '../IconMarkUp';

const FlagIconsContainer = () => {
  const [iTag, setITag] = useState<string | object>("");
  const [icon, setIcon] = useState<string | object>("");

  const getITag = (tag: string) => {
    setITag({
      iTag: '<i className="flag-icon flag-icon-' + tag + '"></i>',
    });
    setIcon({
      icon: "flag-icon flag-icon-" + tag + " fa-2x",
    });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title={FlagIcon} />
              <FlagIconCardBody getITag={getITag}/>
            </Card>
          </Col>
        </Row>
      </Container>
      <IconMarkUp itag={iTag} icons={icon} />
    </>
  );
}

export default FlagIconsContainer