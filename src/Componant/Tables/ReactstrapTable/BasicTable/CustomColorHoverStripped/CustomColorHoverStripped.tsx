import { Card, Col } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { CustomColorHoverStrippedTitle } from "../../../../../utils/Constant";
import CommonTable from "../Common/CommonTable";
import {
  customColorHoverBody,
  customColorHoverData,
  customColorHoverHead,
} from "../../../../../Data/Tables/ReactstrapTable/BasicTable/BasicTable";

const CustomColorHoverStripped = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon
          title={CustomColorHoverStrippedTitle}
          span={customColorHoverData}
        />
        <CommonTable
          strip
          hover
          tableClass="bg-primary"
          headClass="tbl-strip-thad-bdr"
          headData={customColorHoverHead}
        >
          {customColorHoverBody.map((data: any) => (
            <tr key={data.id}>
              <th scope="row">{data.id}</th>
              <td>{data.title}</td>
              <td>{data.year}</td>
              <td>{data.studio}</td>
              <td>{data.budget}</td>
              <td>{data.boxOffice}</td>
            </tr>
          ))}
        </CommonTable>
      </Card>
    </Col>
  );
};

export default CustomColorHoverStripped;
