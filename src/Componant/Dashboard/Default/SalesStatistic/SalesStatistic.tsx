import { Card, CardBody, Col, Row } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { SalesStatistics } from "../../../../utils/Constant";
import { salesData } from "../../../../Data/Dashboard/DefaultData";
import { Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";
import SalesStatisticChart from "./SalesStatisticChart";

const SalesStatistic = () => {
  return (
    <Col xxl="7" xl="12" className="box-col-12 proorder-xl-8 proorder-md-9">
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={SalesStatistics}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
        <CardBody className="sale-statistic">
          <Row>
            {salesData.map((data: any, i: number) => (
              <Col xs="3" className="statistic-icon" key={i}>
                <div className="light-card balance-card widget-hover">
                  <div className="icon-box">
                    <Image
                      src={dynamicImage(`dashboard/icon/${data.img}`)}
                      alt="icons"
                    />
                  </div>
                  <div>
                    {" "}
                    <span className="f-w-500 f-light">{data.title}</span>
                    <h5 className="mt-1 mb-0">{data.count}</h5>
                  </div>
                  <div className="ms-auto text-end">
                    <CardHeaderDropDown
                      mainTitle={true}
                      firstItem="Today"
                      secondItem="Tomorrow"
                      thirdItem="Yesterday"
                    />
                    <span className={`f-w-600 font-${data.color}`}>
                      {data.result}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <SalesStatisticChart />
        </CardBody>
      </Card>
    </Col>
  );
};

export default SalesStatistic;
