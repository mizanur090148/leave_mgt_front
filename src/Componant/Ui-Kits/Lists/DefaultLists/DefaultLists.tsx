import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { DefaultList } from "../../../../utils/Constant";
import {
  defaultData,
  defaultListData,
} from "../../../../Data/Ui-Kits/Lists/Lists";
import { LI, UL } from "../../../../AbstractElements";

const DefaultLists = () => {
  return (
    <Col xl="4" md="6">
      <Card>
        <CardHeaderCommon title={DefaultList} span={defaultData} />
        <CardBody>
          <UL className="list-content">
            <LI>
              <i className="icofont icofont-arrow-right"></i>Logo Design
            </LI>
            {defaultListData.map((item: any, index: number) => (
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

export default DefaultLists;
