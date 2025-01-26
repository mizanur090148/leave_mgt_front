import { Card, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import CommonTable from "../Common/CommonTable";
import { TableHeadOption } from "../../../../../utils/Constant";
import {
  tableHeadOptionBody,
  tableHeadOptionData,
  tableHeadOptionHead,
} from "../../../../../Data/Tables/ReactstrapTable/BasicTable/BasicTable";

const TableHeadOptions = () => {
  return (
    <Col sm="6">
      <Card>
        <CardHeaderCommon title={TableHeadOption} span={tableHeadOptionData} />
        <Row className="card-block">
          <Col sm="12" lg="12" xl="12">
            <CommonTable headClass="table-dark" headData={tableHeadOptionHead}>
              {tableHeadOptionBody.map((data: any) => (
                <tr key={data.id}>
                  <th scope="row">{data.id}</th>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.userName}</td>
                </tr>
              ))}
            </CommonTable>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default TableHeadOptions;
