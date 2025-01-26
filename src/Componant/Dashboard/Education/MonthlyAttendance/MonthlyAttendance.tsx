import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { MonthlyAttendances } from "../../../../utils/Constant";
import { LI, UL } from "../../../../AbstractElements";
import ReactApexChart from "react-apexcharts";
import { monthlyChartData } from "../../../../Data/Dashboard/DefaultChartData";

const MonthlyAttendance = () => {
  return (
    <Col xxl="7" xl="12" className="box-col-12 proorder-md-8">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title={MonthlyAttendances} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="pb-0">
          <div className="monthly-report">
            <UL className="d-flex align-item-center gap-2 simple-list flex-row">
              <LI>
                <span className="bg-primary"> </span>{"Teacher"}
              </LI>
              <LI>
                <span className="bg-secondary"> </span>{"Student"}
              </LI>
            </UL>
          </div>
          <ReactApexChart id="monthly-reportchart" type="line" height={315} options={monthlyChartData} series={monthlyChartData.series} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default MonthlyAttendance;
