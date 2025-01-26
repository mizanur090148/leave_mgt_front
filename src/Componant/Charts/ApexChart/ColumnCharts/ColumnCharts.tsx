import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { ChartColumn } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { annotationChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const ColumnCharts = () => {
  return (
    <Col sm="12" xl="12" className="box-col-6">
      <Card>
        <CommonCardHeader title={ChartColumn} />
        <CardBody>
          <div id="annotationchart">
            <ReactApexChart options={annotationChartData} series={annotationChartData.series} type="line" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ColumnCharts