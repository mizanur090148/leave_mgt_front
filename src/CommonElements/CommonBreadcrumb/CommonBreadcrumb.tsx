import { Breadcrumb, BreadcrumbItem, Col } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import H4 from "../Headings/H4Element";
import FeatherIcons from "../FeatherIcon/FeatherIcons";

const CommonBreadcrumb = () => {
  const location = useLocation();
  const [firstPart, secondPart, thirdPart] = location?.pathname
    .split("/")
    .slice(1);
  return (
    <Col xs="4" xl="4" className="page-title">
      <H4 className="f-w-700 text-capitalize">
        {thirdPart
          ? thirdPart.replaceAll("_", " ")
          : secondPart?.replaceAll("_", " ")}
      </H4>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
            <FeatherIcons iconName="Home" />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem className="f-w-400 text-capitalize">
          {firstPart?.replaceAll("_", " ")}
        </BreadcrumbItem>
        <BreadcrumbItem className={`f-w-400 ${!thirdPart ? "active" : ""}`}>
          {secondPart?.replaceAll("_", " ")}
        </BreadcrumbItem>
        {thirdPart && (
          <BreadcrumbItem className="f-w-400 active">
            {thirdPart?.replaceAll("_", " ")}
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </Col>
  );
};

export default CommonBreadcrumb;
