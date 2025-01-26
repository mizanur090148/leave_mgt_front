import { Card, CardBody, Col, Input, Label, Table } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Clientsactivity } from "../../../../utils/Constant";
import ClientActivityTableBody from "./ClientActivityTableBody";

const ClientActivity = () => {
  return (
    <Col xl="7" className="col-xl-100 proorder-md-6">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title={Clientsactivity} mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="pt-0 client-activity px-0">
          <div className="dataTables_wrapper">
            <div className="table-responsive theme-scrollbar">
              <Table className="table display overflow-hidden dataTable no-footer" id="client-product">
                <thead>
                  <tr>
                    <th>
                      <div className="form-check">
                        <Input type="checkbox" />
                        <Label className="form-check-label" />
                      </div>
                    </th>
                    <th>{"Project name"}</th>
                    <th>{"timeline"}</th>
                    <th>{"Project team"} </th>
                    <th>{"Project Type"}</th>
                    <th>{"Progress"}</th>
                    <th>{'Actions'}</th>
                  </tr>
                </thead>
                <ClientActivityTableBody />
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ClientActivity;
