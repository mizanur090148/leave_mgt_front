import { Line } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { ChatJSLineGraph } from '../../../../utils/Constant'
import { lineGraphChartData, lineGraphChartDataOption } from "../../../../Data/Charts/ChartJs/ChartJs";

const LineGraph = () => {
  return (
    <Col xl="6" ms="12" className="box-col-6">
      <Card>
        <CommonCardHeader title={ChatJSLineGraph} />
        <CardBody className="chart-block">
            <Line id="myGraph" data={lineGraphChartData} options={lineGraphChartDataOption} width={778} height={400} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default LineGraph