import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { BarCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { barChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const BarChart = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={BarCharts} />
        <CardBody>
          <div id="basic-bar">
            <ReactApexChart options={barChartData} series={barChartData.series} type="bar" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BarChart