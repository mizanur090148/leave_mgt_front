import ReactApexChart from "react-apexcharts";
import { visitorChartData } from "../../../../Data/Dashboard/DefaultChartData";

const VisitorChart = () => {
  return (
    <div className="visitors-container">
      <ReactApexChart id="visitor-chart" options={visitorChartData} series={visitorChartData.series} type="bar" height={220} />
    </div>
  );
};

export default VisitorChart;
