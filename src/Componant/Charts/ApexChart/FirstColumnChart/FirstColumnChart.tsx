import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { ColumnCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { columnChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const FirstColumnChart = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={ColumnCharts} />
        <CardBody>
          <div id="column-chart">
            <ReactApexChart options={columnChartData} series={columnChartData.series} type="bar" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default FirstColumnChart