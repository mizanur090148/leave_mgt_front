import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { MixedCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { mixChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const MixedChart = () => {
  return (
    <Col sm="12" xl="12" className="box-col-12">
      <Card>
        <CommonCardHeader title={MixedCharts} />
        <CardBody>
          <div id="mixedchart">
            <ReactApexChart options={mixChartData} series={mixChartData.series} type="line" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default MixedChart