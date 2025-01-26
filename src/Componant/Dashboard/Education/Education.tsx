import { Container, Row } from "reactstrap";
import TotalStudents from "./TotalStudents/TotalStudents";
import StudyStatistics from "./StudyStatistics/StudyStatistics";
import AssignmentsTable from "./AssignmentsTable/AssignmentsTable";
import LiveMeeting from "./LiveMeeting/LiveMeeting";
import ActivelyHours from "./ActivelyHours/ActivelyHours";
import EnrolledClasses from "./EnrolledClasses/EnrolledClasses";
import FeaturedCourses from "./FeaturedCourses/FeaturedCourses";
import MonthlyAttendance from "./MonthlyAttendance/MonthlyAttendance";
import Schedule from "./Schedule/Schedule";

const ContainerEducation = () => {
  return (
    <Container fluid className="dashboard-4">
      <Row>
        <TotalStudents />
        <StudyStatistics />
        <AssignmentsTable />
        <LiveMeeting />
        <ActivelyHours />
        <EnrolledClasses />
        <FeaturedCourses />
        <MonthlyAttendance />
        <Schedule />
      </Row>
    </Container>
  );
};

export default ContainerEducation;
