import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { H4, P } from "../../../AbstractElements";
import { SampleCards } from "../../../utils/Constant";
import { menuOnScroll } from "../../../Data/PageLayout/PageLayout";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setScrollMenu } from "../../../Store/Slices/LayoutSlice";

const ContainerHideNavScroll = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const hideMenu =
    pathname === `${process.env.PUBLIC_URL}/page_layout/hide_nav_scroll`;

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 30 && hideMenu) dispatch(setScrollMenu(true));
      else dispatch(setScrollMenu(false));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatch, hideMenu]);
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <H4>{SampleCards}</H4>
              <span>
                {"lorem ipsum dolor sit amet, consectetur adipisicing elit"}
              </span>
            </CardHeader>
            <CardBody>
              {menuOnScroll.map((item: any, index: number) => (
                <P key={index}>{item}</P>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContainerHideNavScroll;
