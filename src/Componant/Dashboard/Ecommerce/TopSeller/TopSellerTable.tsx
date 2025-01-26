import { Input, Label, Table } from "reactstrap";
import TopSellerTableBody from "./TopSellerTableBody";

const TopSellerTable = () => {
  return (
    <div className="dataTables_wrapper">
      <div className="theme-scrollbar">
        <Table className="table display dataTable no-footer" id="seller-month" responsive>
          <thead>
            <tr>
              <th>
                <div className="form-check">
                  <Input type="checkbox" />
                  <Label className="form-check-label" />
                </div>
              </th>
              <th>{"Seller Name"}</th>
              <th>{"Brand Name"}</th>
              <th>{"Product"}</th>
              <th>{"Sold"}</th>
              <th>{"Price"}</th>
              <th>{"Earnings"}</th>
            </tr>
          </thead>
          <TopSellerTableBody />
        </Table>
      </div>
    </div>
  );
};

export default TopSellerTable;
