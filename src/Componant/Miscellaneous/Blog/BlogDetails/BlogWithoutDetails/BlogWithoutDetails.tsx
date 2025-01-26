import { Image } from "../../../../../AbstractElements";
import { blogDataList } from "../../../../../Data/Miscellaneous/Blog/BlogDetails";
import { Card, Col } from "reactstrap";
import { dynamicImage } from "../../../../../Service";
import ListOfBlogWithoutDetails from "./ListOfBlogWithoutDetails";

const BlogWithoutDetails = () => {
  return (
    <>
      {blogDataList.map((data: any, index: any) => (
        <Col md="6" xl="3" className="box-col-3" key={index}>
          <Card>
            <div className="blog-box blog-grid text-center">
              <Image
                className="img-fluid top-radius-blog rounded-top-3"
                src={dynamicImage(`blog/${data}`)}
                alt="blog"
              />
              <ListOfBlogWithoutDetails />
            </div>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default BlogWithoutDetails;
