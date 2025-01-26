import { Card, CardBody, Col, Input, Label, Table } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { RecentProject } from "../../../../utils/Constant";
import RecentProjectsTableBody from "./RecentProjectsTableBody";

const RecentProjects = () => {
  return (
    <Col xl="5" md="12" className="col-xl-70 proorder-md-3">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title={RecentProject} mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="p-0 projects">
          <div className="dataTables_wrapper">
            <div className="table-responsive theme-scrollbar">
              <Table className="table display overflow-hidden dataTable no-footer" id="recent-product" >
                <thead>
                  <tr>
                    <th>
                      <div className="form-check">
                        <Input type="checkbox" />
                        <Label className="form-check-label" />
                      </div>
                    </th>
                    <th>{"Name"}</th>
                    <th className="px-0">{"Team"}</th>
                    <th>{"started"} </th>
                    <th>{"finished"}</th>
                    <th>{"Progress"} </th>
                    <th className="px-2">{"Actions"}</th>
                  </tr>
                </thead>
                <RecentProjectsTableBody />
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentProjects;
