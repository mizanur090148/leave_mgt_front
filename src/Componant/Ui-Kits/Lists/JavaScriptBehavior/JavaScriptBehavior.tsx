import { useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap';
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { ContactUs, Home, Href, JavaScriptBehaviors, Profile, Settings } from '../../../../utils/Constant';
import { javaScriptData } from '../../../../Data/Ui-Kits/Lists/Lists';
import JavaScriptBehaviorTabContent from './JavaScriptBehaviorTabContent';
import { LI, UL } from '../../../../AbstractElements';

const JavaScriptBehavior = () => {
  const [basicTab, setBasicTab] = useState("1");
  return (
    <Col sm="12" xl="12">
      <Card>
        <CardHeaderCommon title={JavaScriptBehaviors} span={javaScriptData} />
        <CardBody>
          <Row>
            <Col sm="4">
              <UL className="list-content">
                <LI href={Href} className={`list-group-item-action bg-primary ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>{Home}</LI>
                <LI href={Href} className={`list-group-item-action list-hover-primary ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>{Profile}</LI>
                <LI href={Href} className={`list-group-item-action list-hover-primary ${basicTab === "3" ? "active" : ""}`} onClick={() => setBasicTab("3")}>{ContactUs}</LI>
                <LI href={Href} className={`list-group-item-action list-hover-primary ${basicTab === "4" ? "active" : ""}`} onClick={() => setBasicTab("4")}>{Settings}</LI>
              </UL>
            </Col>
            <JavaScriptBehaviorTabContent basicTab={basicTab} />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default JavaScriptBehavior