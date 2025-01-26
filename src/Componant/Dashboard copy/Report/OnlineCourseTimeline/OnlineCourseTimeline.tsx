import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { OnlineCourseTimelines } from "../../../../utils/Constant";
import Timeline, { DateHeader } from 'react-calendar-timeline'
import moment from "moment";
import { onlineTimelineGroup, onlineTimelineItems } from "../../../../Data/Dashboard/ProjectData";


const OnlineCourseTimeline = () => {

  return (
    <Col xl="4" md="6" className="col-xl-100 proorder-md-12">
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={OnlineCourseTimelines}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
        <CardBody className="overflow-auto theme-scrollbar">
          <div className="timeline-calendar custom-scrollbar">
            <div className="custom-calendar" id="calendar-container">
              <div className="time-line" id="calendar">
                <Timeline
                  groups={onlineTimelineGroup}
                  items={onlineTimelineItems}
                  defaultTimeStart={moment().add(-12, "hour")}
                  defaultTimeEnd={moment().add(12, "hour")}
                >
                </Timeline>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default OnlineCourseTimeline;
