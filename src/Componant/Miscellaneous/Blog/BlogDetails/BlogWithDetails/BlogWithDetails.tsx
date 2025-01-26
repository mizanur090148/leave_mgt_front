import { Card, Col, Row } from "reactstrap";
import { blogData } from "../../../../../Data/Miscellaneous/Blog/BlogDetails";
import { H5, Image, LI, P, UL } from "../../../../../AbstractElements";
import { dynamicImage } from "../../../../../Service";
import { BlogWithoutDetailHeading } from "../../../../../utils/Constant";

const BlogWithDetails = () => {
  return (
    <Col xl="6" className="set-col-12 box-col-6">
      {blogData.map((data: any, index: any) => (
        <Card key={index}>
          <Row className="blog-box blog-list">
            <Col sm="5">
              <Image
                className="img-fluid sm-100-w"
                src={dynamicImage(`blog/blog-${data.image}.jpg`)}
                alt="images"
              />
            </Col>
            <Col sm="7">
              <div className="blog-details">
                <div className="blog-date">
                  <span>{data.date}</span> January 2024
                </div>
                <H5>{BlogWithoutDetailHeading}</H5>
                <div className="blog-bottom-content">
                  <UL className="blog-social simple-list flex-row">
                    <LI className="rounded-0">by: Admin</LI>
                    <LI className="digits">{data.hits} Hits</LI>
                  </UL>
                  <hr />
                  <P className="mt-0">
                    A huge part of it is the incomparable beauty you can
                    encounter every day.
                  </P>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </Col>
  );
};

export default BlogWithDetails;
