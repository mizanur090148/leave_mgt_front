import { Label, ListGroup, ListGroupItem } from 'reactstrap'
import { Href, MollyBoake, OfwrriorCompanys } from '../../../../utils/Constant'
import { H4, Image, LI, P } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'

const InterviewHoveringTimeline = () => {
  return (
    <LI className="timeline-event">
      <Label className="timeline-event-icon" />
      <div className="timeline-event-wrapper">
        <P className="timeline-thumbnail">March 2024 - Fresher Interview</P>
        <H4>{OfwrriorCompanys}</H4>
        <div className="text-muted">
          A fresher's interview is to be conducted
          <ListGroup className="main-lists-content">
            <ListGroupItem href={Href} className="list-group-item-action border-0 p-0 mb-4">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="list-wrapper">
                  <Image className="list-img" src={dynamicImage(`user/1.jpg`)} alt="profile" />
                  <div className="list-content">
                    <H4>{MollyBoake}</H4>
                    <P>MollyBoake@rhyta.com</P>
                  </div>
                </div>
                <div className="timeline-icon">
                  <i className="icon-facebook" />
                  <i className="icon-google"> </i>
                  <i className="icon-twitter-alt" />
                </div>
              </div>
              <P className="mb-1">Next step is to choose a tone of voice for your content type.</P>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </LI>
  )
}

export default InterviewHoveringTimeline