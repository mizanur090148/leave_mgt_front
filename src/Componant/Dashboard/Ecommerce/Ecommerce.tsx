import { Container, Row } from "reactstrap";
import TotalSells from "./TotalSells/TotalSells";
import SalesOverview from "./SalesOverview/SalesOverview";
import RecentCustomers from "./RecentCustomers/RecentCustomers";
import RevenueByCategory from "./RevenueByCategory/RevenueByCategory";
import UserByContinent from "./UserByContinent/UserByContinent";
import ProductSlider from "./ProductSlider/ProductSlider";
import TopSeller from "./TopSeller/TopSeller";
import RecentOrders from "./RecentOrders/RecentOrders";

const ContainerEcommerce = () => {
  return (
    <Container fluid className="dashboard-3">
      <Row>
        <TotalSells />
        <RecentOrders />
        <SalesOverview />
        <RecentCustomers />
        <RevenueByCategory />
        <UserByContinent />
        <ProductSlider />
        <TopSeller />
      </Row>
    </Container>
  );
};

export default ContainerEcommerce;
