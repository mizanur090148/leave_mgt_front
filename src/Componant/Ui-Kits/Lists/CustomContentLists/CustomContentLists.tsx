import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { CustomContentList, Href, MollyBoake } from '../../../../utils/Constant'
import { H6, Image, LI, P, UL } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'
import { customData } from '../../../../Data/Ui-Kits/Lists/Lists'
import DynamicCustomContentList from './DynamicCustomContentList'

const CustomContentLists = () => {
  return (
    <Col md="12">
      <Card>
        <CardHeaderCommon title={CustomContentList} span={customData} />
        <CardBody>
          <UL className="main-lists-content list-content">
            <LI href={Href} className="list-group-item-action active bg-primary">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="list-wrapper">
                  <Image className="list-img" src={dynamicImage(`user/1.jpg`)} alt="profile" />
                  <div className="list-content">
                    <H6>{MollyBoake}</H6>
                    <P>MollyBoake@rhyta.com</P>
                  </div>
                </div>
                <small>5 days ago</small>
              </div>
              <P className="mb-1">Next step is to choose a tone of voice for your content type. From casual to convincing, pick one from 20+ tones in the dropdown.Why did we say “snag eyeballs” instead of “get attention?” Why do we say “brick-and-mortar words” instead of “concrete words?” Because, in your email subject lines, it’s better to use words that people can picture.</P>
              <small>20K Followers</small>
            </LI>
            <DynamicCustomContentList />
          </UL>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CustomContentLists