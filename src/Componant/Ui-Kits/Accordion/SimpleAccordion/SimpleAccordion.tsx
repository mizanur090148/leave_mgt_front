//@ts-nocheck
import { useState } from "react";
import { Accordion, Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { SimpleAccordions } from "../../../../utils/Constant";
import {
  accordionData,
  accordionList,
} from "../../../../Data/Ui-Kits/Accordion/Accordion";
import StaticAccordion from "./StaticAccordion";
import CommonAccordionItem from "../Common/CommonAccordionItem";

const SimpleAccordion = () => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => (open === id ? setOpen() : setOpen(id));
  return (
    <Col sm="12" xl="6">
      <Card>
        <CardHeaderCommon title={SimpleAccordions} span={accordionData} />
        <CardBody>
          <Accordion open={open} toggle={toggle} className="dark-accordion">
            <StaticAccordion />
            {accordionList.map((data: any, index: any) => (
              <CommonAccordionItem item={data} key={index} />
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SimpleAccordion;
