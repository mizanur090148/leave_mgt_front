//@ts-nocheck
import { Card, CardBody, Col, UncontrolledAccordion } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { OutlineAccordions } from "../../../../utils/Constant";
import CommonAccordionItem from "../Common/CommonAccordionItem";
import {
  outlineData,
  outlineList,
} from "../../../../Data/Ui-Kits/Accordion/Accordion";
import StaticAccordion from "./StaticAccordion";

const OutlineAccordion = () => {
  return (
    <Col xl="6" sm="12">
      <Card>
        <CardHeaderCommon title={OutlineAccordions} span={outlineData} />
        <CardBody>
          <UncontrolledAccordion stayOpen className="dark-accordion">
            <StaticAccordion />
            {outlineList.map((data: any, index: any) => (
              <CommonAccordionItem item={data} key={index} />
            ))}
          </UncontrolledAccordion>
        </CardBody>
      </Card>
    </Col>
  );
};

export default OutlineAccordion;
