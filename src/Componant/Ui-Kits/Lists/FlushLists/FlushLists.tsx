import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { FlushList } from "../../../../utils/Constant";
import { flushData, flushListData } from "../../../../Data/Ui-Kits/Lists/Lists";
import { LI, UL } from "../../../../AbstractElements";

const FlushLists = () => {
  return (
    <Col xl="4" md="12">
      <Card>
        <CardHeaderCommon title={FlushList} span={flushData} />
        <CardBody>
          <UL className="list-group-flush list-content">
            <LI>
              <i className="icofont icofont-arrow-right"></i>PRODUCT
            </LI>
            {flushListData.map((item: any, index: number) => (
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

export default FlushLists;
