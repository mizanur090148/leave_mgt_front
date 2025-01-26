import { Container, Row } from "reactstrap";
import UserInfo from "./UserInfo/UserInfo";
import OpeningOfLeaflets from "./OpeningOfLeaflets/OpeningOfLeaflets";
import ShiftsOverview from "./ShiftsOverview/ShiftsOverview";
import CustomerTransaction from "./CustomerTransaction/CustomerTransaction";
import UserNotifications from "./UserNotifications/UserNotifications";
import UpcomingAppointments from "./UpcomingAppointments/UpcomingAppointments";
import ActiveMembers from "./ActiveMembers/ActiveMembers";
import SalesByProduct from "./SalesByProduct/SalesByProduct";
import SalesStatistic from "./SalesStatistic/SalesStatistic";
import ProjectsTable from "./ProjectsTable/ProjectsTable";

const ContainerDefault = () => {
  return (
    <Container fluid className="default-dashboard">
      <Row className="widget-grid">
        <UserInfo />
        <OpeningOfLeaflets />
        <ShiftsOverview />
        <ProjectsTable />
        <CustomerTransaction />
        <UserNotifications />
        <UpcomingAppointments />
        <ActiveMembers />
        <SalesStatistic />
        <SalesByProduct />
      </Row>
    </Container>
  );
};

export default ContainerDefault;
