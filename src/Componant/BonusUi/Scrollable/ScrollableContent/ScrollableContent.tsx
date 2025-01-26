import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Href, ScrollableContents } from '../../../../utils/Constant'
import ScrollBar from 'react-perfect-scrollbar'
import { H6, Image, P } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'
import { scrollableContentData } from '../../../../Data/BonusUi/Scrollable'
import DynamicScrollableContent from './DynamicScrollableContent'

const ScrollableContent = () => {
  return (
    <Col xxl="4" md="12">
      <Card>
        <CardHeaderCommon title={ScrollableContents} span={scrollableContentData} />
        <CardBody>
          <ScrollBar className="scroll-demo scroll-b-none" style={{ width: "100%", height: "300px" }}>
            <ListGroup className="main-lists-content list-content">
              <ListGroupItem className="list-group-item-action active list-hover-primary" href={Href}>
                <div className="list-wrapper gap-0">
                  <Image className="list-img" src={dynamicImage(`user/9.jpg`)} alt="profile" />
                  <div className="list-content">
                    <H6>Molly Boake</H6>
                    <P>MollyBoake@rhyta.com</P><small>5 days ago</small></div>
                </div>
              </ListGroupItem>
              <DynamicScrollableContent />
            </ListGroup>
          </ScrollBar>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ScrollableContent