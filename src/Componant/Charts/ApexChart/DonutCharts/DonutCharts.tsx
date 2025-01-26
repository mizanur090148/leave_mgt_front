import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { DonutChart } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { dountChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const DonutCharts = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={DonutChart} />
        <CardBody>
          <div id="donutchart">
            <ReactApexChart options={dountChartData} series={dountChartData.series} type="pie" height={300} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DonutCharts