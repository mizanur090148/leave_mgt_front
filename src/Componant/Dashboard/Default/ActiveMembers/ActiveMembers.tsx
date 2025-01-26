import { Card, CardBody, Col, Table } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { ActiveMember } from "../../../../utils/Constant";
import ActiveMembersTableBody from "./ActiveMembersTableBody";

const ActiveMembers = () => {
  return (
    <Col
      xxl="4"
      xl="5"
      md="7"
      className="box-col-5 proorder-xl-10 proorder-md-4"
    >
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={ActiveMember}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
        <CardBody className="active-members px-0 pb-0">
          <div className="table-responsive theme-scrollbar">
            <Table className="display">
              <thead>
                <tr>
                  <th>{"Member Profile"}</th>
                  <th>{"Today’s hrours"}</th>
                  <th className="text-center">{"Status"}</th>
                </tr>
              </thead>
              <ActiveMembersTableBody />
            </Table>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActiveMembers;