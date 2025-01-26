import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { TodaysTasks } from "../../../../utils/Constant";
import TodayTasksBody from "./TodayTasksBody";
import { UL } from "../../../../AbstractElements";

const TodayTasks = () => {
  return (
    <Col xl="3" md="6" className="col-xl-40 proorder-md-11">
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={TodaysTasks}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
        <CardBody>
          <UL className="task-box simple-list">
            <TodayTasksBody />
          </UL>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TodayTasks;
