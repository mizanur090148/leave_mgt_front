import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { BasicAreaCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { basicAreaChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const BasicAreaChart = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={BasicAreaCharts} />
        <CardBody>
          <div id="basic-apex">
            <ReactApexChart options={basicAreaChartData} series={basicAreaChartData.series} type="area" height={350}/>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicAreaChart