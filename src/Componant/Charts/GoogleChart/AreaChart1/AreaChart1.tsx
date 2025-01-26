import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { AreaChartOne } from '../../../../utils/Constant'
import Chart from 'react-google-charts'
import { areaChartOneData, areaChartOneDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const AreaChart1 = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={AreaChartOne} />
        <CardBody className="p-0 chart-block">
          <div className="chart-overflow" id="area-chart1">
            <Chart chartType="AreaChart" width="100%" height="400px" data={areaChartOneData} options={areaChartOneDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default AreaChart1