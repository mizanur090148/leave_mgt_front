import { PolarArea } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { ChatJSPolarChart } from '../../../../utils/Constant'
import { polarChartData, polarChartDataOption } from '../../../../Data/Charts/ChartJs/ChartJs'

const PolarChart = () => {
  return (
    <Col xl="6" ms="12" className="box-col-6">
      <Card>
        <CommonCardHeader title={ChatJSPolarChart} />
        <CardBody className="chart-block">
          <PolarArea id="myPolarGraph" data={polarChartData} options={polarChartDataOption} width={734} height={335} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default PolarChart