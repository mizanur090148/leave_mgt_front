import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { topSellData } from "../../../../Data/Dashboard/Ecommerce";
import ReactApexChart from "react-apexcharts";
import TotalSellsDetails from "./TotalSellsDetails";

const TotalSells = () => {
  return (
    <>
      {topSellData.map((data: any, i: number) => (
        <Col xl="3" sm="6" key={i}>
          <Card>
            <CommonCardHeader
              headClass="card-no-border pb-0"
              mainTitle={true}
              firstItem="Weekly"
              secondItem="Monthly"
              thirdItem="Yearly"
              subClass="daily-revenue-card"
              title={data.title}
            />
            <CardBody className={`pb-0 ${data.class}`}>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0">
                  <Image
                    src={dynamicImage(`dashboard-3/icon/${data.image}`)}
                    alt="icon"
                  />
                </div>
                <TotalSellsDetails data={data} />
              </div>
              <ReactApexChart
                id={data.chartId}
                options={data.chart}
                series={data.chart.series}
                type="area"
                height={90}
              />
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default TotalSells;
