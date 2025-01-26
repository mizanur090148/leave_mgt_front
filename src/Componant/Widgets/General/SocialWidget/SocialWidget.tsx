import { Card, CardBody, Col } from 'reactstrap'
import { socialWidgetsData } from '../../../../Data/Widgets/GeneralData'
import { H5, Image } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'
import ReactApexChart from 'react-apexcharts'

const SocialWidget = () => {
  return (
    <>
      {socialWidgetsData.map((data,index) => (
        <Col xl="3" sm="6" key={index}>
          <Card className="social-widget">
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <div className="social-icons">
                    <Image
                      src={dynamicImage(`dashboard/social/${data.image}.png`)}
                      alt={data.alt}
                    />
                  </div>
                  <span>{data.title}</span>
                </div>
                <span className="font-success f-12 d-xxl-block d-xl-none">
                  {data.count}
                </span>
              </div>
              <div className="social-content">
                <div>
                  <H5 className="mb-1">{data.followers}</H5>
                  <span className="f-light">{data.content}</span>
                </div>
                <div className="social-chart">
                  <ReactApexChart id={data.id} options={data.chart} series={data.chart.series} type="radialBar" height="130" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default SocialWidget