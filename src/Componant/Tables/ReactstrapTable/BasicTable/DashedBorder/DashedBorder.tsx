import { Card, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { DashedBorderTitle } from "../../../../../utils/Constant";
import CommonTable from "../Common/CommonTable";
import {
  dashedBorderData,
  dashedBorderHead,
  dashedBorderHeadBody,
} from "../../../../../Data/Tables/ReactstrapTable/BasicTable/BasicTable";

const DashedBorder = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={DashedBorderTitle} span={dashedBorderData} />
        <Row className="card-block">
          <Col sm="12" lg="12" xl="12">
            <CommonTable tableClass="table-dashed" headData={dashedBorderHead}>
              {dashedBorderHeadBody.map((data: any) => (
                <tr key={data.id}>
                  <th scope="row">{data.id}</th>
                  <td>{data.activity}</td>
                  <td>{data.category}</td>
                  <td>{data.time}</td>
                  <td>{data.instructor}</td>
                  <td>{data.capacity}</td>
                </tr>
              ))}
            </CommonTable>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default DashedBorder;
