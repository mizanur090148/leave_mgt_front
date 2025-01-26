import { Card, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { BreckpointSpecifics } from "../../../../../utils/Constant";
import CommonTable from "../Common/CommonTable";
import {
  breakPointBody,
  breakPointData,
  breakPointHead,
} from "../../../../../Data/Tables/ReactstrapTable/BasicTable/BasicTable";

const BreakPointSpecific = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={BreckpointSpecifics} span={breakPointData} />
        <Row className="card-block">
          <Col sm="12" lg="12" xl="12">
            <CommonTable size="sm" headData={breakPointHead}>
              {breakPointBody.map((data: any) => (
                <tr key={data.id}>
                  <th scope="row">{data.id}</th>
                  <td>{data.name}</td>
                  <td>{data.orderId}</td>
                  <td>{data.price}</td>
                  <td>{data.quantity}</td>
                  <td>{data.total}</td>
                </tr>
              ))}
            </CommonTable>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default BreakPointSpecific;
