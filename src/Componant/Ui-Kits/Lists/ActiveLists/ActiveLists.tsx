import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { ActiveList } from "../../../../utils/Constant";
import {
  activeData,
  activeListData,
} from "../../../../Data/Ui-Kits/Lists/Lists";
import { LI, UL } from "../../../../AbstractElements";

const ActiveLists = () => {
  return (
    <Col xl="4" md="6">
      <Card>
        <CardHeaderCommon title={ActiveList} span={activeData} />
        <CardBody>
          <UL className="list-content">
            <LI className="active bg-warning-light">
              <i className="icofont icofont-arrow-right"></i>UI Kits
            </LI>
            {activeListData.map((item: any, index: number) => (
              <LI key={index}>
                <i className="icofont icofont-arrow-right"></i>
                {item}
              </LI>
            ))}
          </UL>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActiveLists;
