import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { CandlestickCharts } from '../../../../utils/Constant'
import ReactApexChart from 'react-apexcharts'
import { candleStickChartData } from '../../../../Data/Charts/ApexChart/ApexChartData'

const CandlestickChart = () => {
  return (
    <Col sm="12" xl="12" className="box-col-12">
      <Card>
        <CommonCardHeader title={CandlestickCharts} />
        <CardBody>
          <div id="candlestick">
            <ReactApexChart options={candleStickChartData} series={candleStickChartData.series} type="candlestick" height={350} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CandlestickChart