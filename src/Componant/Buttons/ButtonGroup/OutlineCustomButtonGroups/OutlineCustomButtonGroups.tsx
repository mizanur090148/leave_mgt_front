import { ButtonGroup, Card, CardBody, Col, Row } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import {
  Left,
  Middle,
  OutlineCustomeButtonGroups,
  Right,
} from "../../../../utils/Constant";
import { Btn } from "../../../../AbstractElements";
import { buttonGroupData } from "../../../../Data/Buttons/ButtonGroup";

const OutlineCustomButtonGroups = () => {
  return (
    <Col sm="12">
      <Card>
        <CommonCardHeader title={OutlineCustomeButtonGroups} />
        <CardBody className="btn-group-showcase">
          <Row>
            <Col xl="4" md="6" sm="12">
              <ButtonGroup className="btn-group-pill">
                <Btn color="primary">{Left}</Btn>
                <Btn outline color="primary">
                  {Middle}
                </Btn>
                <Btn color="primary">{Right}</Btn>
              </ButtonGroup>
            </Col>
            {buttonGroupData.map((item: any, index: number) => (
              <Col xl="4" md="6" sm="12" key={index}>
                <ButtonGroup className="btn-group-pill">
                  <Btn color={item}>{Left}</Btn>
                  <Btn outline color={item}>
                    {Middle}
                  </Btn>
                  <Btn color={item}>{Right}</Btn>
                </ButtonGroup>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default OutlineCustomButtonGroups;
