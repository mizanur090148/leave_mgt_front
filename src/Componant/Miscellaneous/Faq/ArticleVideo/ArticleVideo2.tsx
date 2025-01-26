import { Card, CardBody, Col, Row } from "reactstrap";
import { articleDataTwo } from "../../../../Data/Miscellaneous/Faq";
import { H5, P } from "../../../../AbstractElements";

const ArticleVideo2 = () => {
  return (
    <Col xl="4" md="6">
      <Row>
        {articleDataTwo.map((item: any, i: number) => (
          <Col sm="12" key={i}>
            <Card>
              <CardBody>
                <div className="d-flex">
                  {item.iconClass}
                  <div className="flex-grow-1">
                    <H5 className="pb-2 f-w-600">{item.title}</H5>
                    <P>{item.description}</P>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ArticleVideo2;
