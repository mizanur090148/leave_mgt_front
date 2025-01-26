import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { CustomerTransactions } from "../../../../utils/Constant";
import ReactApexChart from "react-apexcharts";
import { customerChartData } from "../../../../Data/Dashboard/DefaultChartData";

const CustomerTransaction = () => {
  return (
    <Col xl="5" md="7" className="proorder-xl-4 box-col-5 proorder-md-6">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title={CustomerTransactions} mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="pb-0">
          <ReactApexChart id="customer-transaction" options={customerChartData} series={customerChartData.series} height={350} type="bar"  />
        </CardBody>
      </Card>
    </Col>
  );
};

export default CustomerTransaction;
