import { Card, CardBody, Col } from "reactstrap";
import { H4, P } from "../../../../AbstractElements";
import { articleData } from "../../../../Data/Miscellaneous/Faq";

const Article = () => {
  return (
    <>
      {articleData.map((item: any) => (
        <Col
          xl="4"
          sm={item.sm}
          className={`"box-col-${item.box}`}
          key={item.id}
        >
          <Card className="bg-primary">
            <CardBody>
              <div className="d-flex faq-widgets">
                <div className="flex-grow-1">
                  <H4>{item.title}</H4>
                  <P>{item.paragraph}</P>
                </div>
                {item.icon}
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default Article;
