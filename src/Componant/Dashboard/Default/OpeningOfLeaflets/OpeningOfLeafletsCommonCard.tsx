import { Card, CardBody } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Openingofleaflets } from "../../../../utils/Constant";
import { H2, P } from "../../../../AbstractElements";
import ReactApexChart from "react-apexcharts";
import { growthChart } from "../../../../Data/Dashboard/DefaultChartData";

const OpeningOfLeafletsCommonCard = () => {
  return (
    <Card>
      <CommonCardHeader
        headClass="card-no-border pb-0"
        title={Openingofleaflets}
        mainTitle={true}
        firstItem="Weekly"
        secondItem="Monthly"
        thirdItem="Yearly"
      />
      <CardBody className="pb-0 opening-box">
        <div className="d-flex align-items-center gap-2">
          <H2>$ 12,463</H2>
          <div className="d-flex">
            <P className="mb-0 up-arrow">
              <i className="fa fa-arrow-up" />
            </P>
            <span className="f-w-500 font-success">+ 20.08%</span>
          </div>
        </div>
        <ReactApexChart
          id="growthchart"
          options={growthChart}
          series={growthChart.series}
          height={150}
          type="line"
        />
      </CardBody>
    </Card>
  );
};

export default OpeningOfLeafletsCommonCard;
