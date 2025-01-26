import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { displayData } from '../../../../Data/Ui-Kits/Typography/Typography'
import { DisplayHeadings } from '../../../../utils/Constant'
import { H1 } from '../../../../AbstractElements'

const DisplayCart = () => {
  return (
    <Col xs="12">
      <Card>
        <CardHeaderCommon title={DisplayHeadings} span={displayData} />
        <CardBody className="d-flex flex-column gap-2">
          <H1 className="display-1 m-0">Display 1</H1>
          <H1 className="display-2 m-0">Display 2</H1>
          <H1 className="display-3 m-0">Display 3</H1>
          <H1 className="display-4 m-0">Display 4</H1>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DisplayCart