import { Fragment } from 'react'
import { Card, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { horizontalStyleDataList } from '../../../../../Data/Forms/FormsControl/MegaOption/MegaOption'
import { Badges, P } from '../../../../../AbstractElements'
import { HorizontalStyleFormProp } from '../../../../../Types/Forms/FormsControl/FormsControls'

const HorizontalStyleForm = () => {
  return (
    <Form className="mega-horizontal">
      <Row>
        {horizontalStyleDataList.map(({ megaTitle, child }, index) => (
          <Fragment key={index}>
            <Col sm="3">
              <P className="mega-title">{megaTitle}</P>
            </Col>
            {child.map(({ id, color, name, mediaBodyClass, badgeTitle, digits, spanText, colClass, check, spanClass, star, cardClass }: HorizontalStyleFormProp) => (
              <Col sm="9" key={id} className={colClass}>
                <Card className={cardClass}>
                  <div className="d-flex p-20">
                    <FormGroup className={`radio radio-${color} m-0 w-100`} check>
                      <Input id={`radio-${id}`} type="radio" name={name} value="option1" defaultChecked={check} />
                      <Label for={`radio-${id}`} className="mb-0 w-100" check>
                        <span className={`flex-grow-1 ${mediaBodyClass}`}>
                          <span className="mt-0 mega-title-badge">{badgeTitle}
                            <Badges color={color} className="pull-right digits">{digits}</Badges>
                          </span>
                          <span className={spanClass}>
                            {star && star.map(({ id, starClass }) => <i key={id} className={`icofont icofont-star ${starClass}`}></i>)}
                            {spanText}
                          </span>
                        </span>
                      </Label>
                    </FormGroup>
                  </div>
                </Card>
              </Col>
            ))}
          </Fragment>
        ))}
      </Row>
    </Form>
  )
}

export default HorizontalStyleForm