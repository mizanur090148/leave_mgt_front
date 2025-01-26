import { Card, CardBody, Col, Input, Label, Table } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { RecentOrder } from "../../../../utils/Constant";
import RecentOrdersBody from "./RecentOrdersBody";

const RecentOrders = () => {
  return (
    <Col xxl="7" xl="8" sm="12">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" mainTitle={true} title={RecentOrder} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly" />
        <CardBody className="pt-0 recent-orders px-0">
          <div className="dataTables_wrapper">
            <div className="table-responsive theme-scrollbar">
              <Table className="table display dataTable no-footer" id="recent-orders">
                <thead>
                  <tr>
                    <th>
                      <div className="form-check">
                        <Input type="checkbox" />
                        <Label className="form-check-label" />
                      </div>
                    </th>
                    <th>{"Recent Orders"}</th>
                    <th>{"Order Date"}</th>
                    <th>{"QTY"}</th>
                    <th>{"Customer"}</th>
                    <th>{"Price"} </th>
                    <th>{"Status"}</th>
                  </tr>
                </thead>
                <RecentOrdersBody />
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentOrders;
