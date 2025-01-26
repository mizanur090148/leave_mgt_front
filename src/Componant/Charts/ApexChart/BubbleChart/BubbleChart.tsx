import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { BubbleCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { bubbleChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const BubbleChart = () => {
  return (
    <Col sm="12" xl="6" className="box-col-12">
      <Card>
        <CommonCardHeader title={BubbleCharts} />
        <CardBody>
          <div id="chart-bubble">
            <ReactApexChart options={bubbleChartData} series={bubbleChartData.series} type="bubble" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BubbleChart