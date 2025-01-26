import { Table } from "reactstrap";
import { invoiceTableHeader } from "../../../../../Data/Application/Ecommerce/Invoice";
import { Description } from "../../../../../utils/Constant";
import InvoiceTableBody from "./InvoiceTableBody";

const InvoiceFourTable = () => {
  return (
    <td>
      <Table className="table-responsive" style={{ width: "100%", borderSpacing: 0 }} >
        <thead>
          <tr style={{ background: "#7A70BA" }}>
            {invoiceTableHeader.map((data,i)=>(
              <th style={{ padding: "18px 15px", textAlign: data === Description ? "left" : "center", position: data === Description ?"relative" : undefined, borderTopLeftRadius: data === Description ? 10 : 0}} key={i}>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }} >
                  {data}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <InvoiceTableBody />
        </tbody>
      </Table>
    </td>
  );
};

export default InvoiceFourTable;
