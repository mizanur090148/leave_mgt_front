import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { SteplineCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { stepLineChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const SteplineChart = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={SteplineCharts} />
        <CardBody>
          <div id="stepline">
            <ReactApexChart options={stepLineChartData} series={stepLineChartData.series} type="line" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default SteplineChart