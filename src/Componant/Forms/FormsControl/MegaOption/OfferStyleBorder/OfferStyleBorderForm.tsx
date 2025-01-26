import { Card, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { offerBorderStyleDataList } from '../../../../../Data/Forms/FormsControl/MegaOption/MegaOption'
import { Image } from '../../../../../AbstractElements'
import { dynamicImage } from '../../../../../Service'

const OfferStyleBorderForm = () => {
  return (
    <Form className="mega-inline offer-style">
      <Row className="flex-column">
        {offerBorderStyleDataList.map(({id,color,image,spanText,check},index) => (
          <Col xs="12" key={index}>
            <Card>
              <div className="d-flex p-20">
                <FormGroup className={`checkbox checkbox-${color}`} check>
                  <Input id={`checkbox-${id}`} type="checkbox" defaultChecked={check}/>
                  <Label for={`checkbox-${id}`} className="my-0" check>
                    <span className="flex-grow-1">
                      <span className="d-flex list-behavior-1">
                        <span className="flex-shrink-0">
                          <Image className="tab-img b-r-0 img-fluid" src={dynamicImage(`${image}`)} alt="image"/>
                        </span>
                        <span className="flex-grow-1">
                          <span className="mb-0">{spanText}</span>
                        </span>
                      </span>
                    </span>
                  </Label>
                </FormGroup>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Form>
  )
}

export default OfferStyleBorderForm