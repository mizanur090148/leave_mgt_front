import { Container } from "reactstrap";
import TotalSaleWidgets from "./TotalSaleWidgets/TotalSaleWidgets";
import MonthlyHistory from "./MonthlyHistory/MonthlyHistory";
import LiveProducts from "./LiveProducts/LiveProducts";
import StockMarket from "./StockMarket/StockMarket";

const ContainerChart = () => {
  return (
    <Container fluid>
      <TotalSaleWidgets />
      <MonthlyHistory />
      <LiveProducts />
      <StockMarket />
    </Container>
  );
};

export default ContainerChart;
