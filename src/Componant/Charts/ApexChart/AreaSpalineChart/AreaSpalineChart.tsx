import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { AreaSpalineCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { areaSaplingChart } from '../../../../Data/Charts/ApexChart/ApexChartData'

const AreaSpalineChart = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={AreaSpalineCharts} />
        <CardBody>
          <div id="area-spaline">
            <ReactApexChart options={areaSaplingChart} series={areaSaplingChart.series} type="area" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default AreaSpalineChart