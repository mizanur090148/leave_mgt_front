import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { CurrentlyRunning, TotalProjects } from "../../../../utils/Constant";
import { H5 } from "../../../../AbstractElements";
import TotalProjectChart from "./TotalProjectChart";

const TotalProject = () => {
  return (
    <Col>
      <Card>
        <CommonCardHeader
          headClass="card-no-border"
          title={"This is Dashboard"}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
        <CardBody className="total-project">
          {/* <H5 className="f-w-500">
            {CurrentlyRunning}
            <span className="px-2 f-w-500 font-primary">{"28 Projects"}</span>
          </H5> */}
          <TotalProjectChart />
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalProject;
