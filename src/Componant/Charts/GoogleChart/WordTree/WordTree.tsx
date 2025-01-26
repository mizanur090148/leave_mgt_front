import Chart from 'react-google-charts'
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { WordTreeChart } from '../../../../utils/Constant'
import { wordTreeChartData, wordTreeChartDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const WordTree = () => {
  return (
    <Col sm="12" xl="6" className="box-col-12">
      <Card>
        <CommonCardHeader title={WordTreeChart} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="wordtree_basic">
            <Chart chartType="WordTree" width="100%" height="400px" data={wordTreeChartData} options={wordTreeChartDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default WordTree