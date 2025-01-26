import { Container, Row } from "reactstrap";
import TotalSells from "../../Dashboard/Ecommerce/TotalSells/TotalSells";
import WebsiteDesign from "./WebsiteDesign/WebsiteDesign";
import Visitors from "./Visitors/Visitors";
import SocialWidget from "./SocialWidget/SocialWidget";
import UpcomingAppointment from "./UpcomingAppointment/UpcomingAppointment";
import TotalStudents from "./TotalStudents/TotalStudents";
import OpeningOfLeaflets from "./OpeningOfLeaflets/OpeningOfLeaflets";


const ContainerGeneral = () => {
  return (
    <Container fluid>
      <Row>
        <TotalSells />
        <WebsiteDesign />
        <OpeningOfLeaflets />
        <Visitors />
        <SocialWidget />
        <TotalStudents />
        <UpcomingAppointment />
      </Row>
    </Container>
  );
};

export default ContainerGeneral;
