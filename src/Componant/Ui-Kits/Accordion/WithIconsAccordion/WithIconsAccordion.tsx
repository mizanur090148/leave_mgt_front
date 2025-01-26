//@ts-nocheck
import { Card, CardBody, Col, UncontrolledAccordion } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { WithIconsAccordions } from "../../../../utils/Constant";
import CommonAccordionItem from "../Common/CommonAccordionItem";
import {
  accordionIconData,
  accordionIconList,
} from "../../../../Data/Ui-Kits/Accordion/Accordion";
import StaticAccordion from "./StaticAccordion";

const WithIconsAccordion = () => {
  return (
    <Col xl="6" sm="12">
      <Card>
        <CardHeaderCommon
          title={WithIconsAccordions}
          span={accordionIconData}
        />
        <CardBody className="accordion-border icons-accordion">
          <UncontrolledAccordion stayOpen className="dark-accordion">
            <StaticAccordion />
            {accordionIconList.map((data: any, index: any) => (
              <CommonAccordionItem key={index} item={data} />
            ))}
          </UncontrolledAccordion>
        </CardBody>
      </Card>
    </Col>
  );
};

export default WithIconsAccordion;
