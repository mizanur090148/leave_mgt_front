import { Card, CardBody, Col, Row } from "reactstrap";
import { articleDataOne } from "../../../../Data/Miscellaneous/Faq";
import { H5, P } from "../../../../AbstractElements";

const ArticleVideo1 = () => {
  return (
    <Col xl="4" md="6">
      <Row>
        {articleDataOne.map((item: any, i: number) => (
          <Col sm="12" key={i}>
            <Card>
              <CardBody>
                <div className="d-flex articles-icons">
                  {item.iconClass}
                  <div className="flex-grow-1">
                    <H5 className="f-w-600">{item.title}</H5>
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

export default ArticleVideo1;
