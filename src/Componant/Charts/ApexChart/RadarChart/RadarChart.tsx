import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { RadarCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { radarChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const RadarChart = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={RadarCharts} />
        <CardBody>
          <div id="radarchart">
            <ReactApexChart options={radarChartData} series={radarChartData.series} type="radar" height={300} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default RadarChart