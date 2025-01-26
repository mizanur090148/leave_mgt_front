import { Card, CardBody, Col } from "reactstrap";
import { Btn, H6, Image, P } from "../../../../AbstractElements";
import { BookmarkFilter, Href } from "../../../../utils/Constant";
import { dynamicImage } from "../../../../Service";
import { setBookmarkFilter } from "../../../../Store/Slices/BookmarkTabSlice";
import { useDispatch, useSelector } from "react-redux";
import NavTab from "./NavTab";

const BookmarkSideBar = () => {
  const { bookmarkFilter } = useSelector((state: any) => state.bookmarkTab);
  const dispatch = useDispatch();
  return (
    <Col xl="3" className="box-col-6">
      <div className="md-sidebar">
        <Btn
          tag="a"
          color="primary"
          className="md-sidebar-toggle"
          href={Href}
          onClick={() => dispatch(setBookmarkFilter())}
        >
          {BookmarkFilter}
        </Btn>
        <div
          className={`md-sidebar-aside job-left-aside custom-scrollbar ${
            bookmarkFilter ? "open" : ""
          }`}
        >
          <div className="email-left-aside">
            <Card>
              <CardBody>
                <div className="email-app-sidebar left-bookmark">
                  <div className="d-flex">
                    <div className="media-size-email">
                      <Image
                        className="me-3 rounded-circle"
                        src={dynamicImage("user/user.png")}
                        alt="user"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <H6 className="f-w-600">{"MARK JECNO"}</H6>
                      <P>Markjecno@gmail.com</P>
                    </div>
                  </div>
                  <NavTab />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default BookmarkSideBar;
