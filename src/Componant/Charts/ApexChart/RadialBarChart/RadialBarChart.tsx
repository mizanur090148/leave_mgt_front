import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { RadialBarCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { circleChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const RadialBarChart = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={RadialBarCharts} />
        <CardBody>
          <div id="circlechart">
            <ReactApexChart options={circleChartData} series={circleChartData.series} type="radialBar" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default RadialBarChart