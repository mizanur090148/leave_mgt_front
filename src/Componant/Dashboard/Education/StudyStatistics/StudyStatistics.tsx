import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Illustrations, StudyStatistic, UXDesign } from "../../../../utils/Constant";
import { LI, UL } from "../../../../AbstractElements";
import ReactApexChart from "react-apexcharts";
import { studyStatisticChart } from "../../../../Data/Dashboard/DefaultChartData";

const StudyStatistics = () => {
  return (
    <Col xl="6" md="6" className="proorder-md-2">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title={StudyStatistic} mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody>
          <div className="studay-statistics">
            <UL className="d-flex align-item-center gap-2 simple-list flex-row">
              <LI>
                <span className="bg-primary"> </span>{UXDesign}
              </LI>
              <LI>
                <span className="bg-secondary"> </span>{Illustrations}
              </LI>
            </UL>
          </div>
          <ReactApexChart id="study-statistics" options={studyStatisticChart} series={studyStatisticChart.series} type="area" height={230} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default StudyStatistics;
