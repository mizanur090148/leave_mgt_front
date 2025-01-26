import { Table } from "reactstrap";
import { invoiceThreeHeader } from "../../../../../Data/Application/Ecommerce/Invoice";
import InvoiceThreeBody from "./InvoiceThreeBody";

const InvoiceThreeTable = () => {
  return (
    <td>
      <Table className="order-details" style={{ width: "100%" }} borderless>
        <thead>
          <tr style={{ background: "#7A70BA" }}>
            {invoiceThreeHeader.map((data: any, i: number) => (
              <th
                style={{
                  padding: "18px 15px",
                  textAlign: "left",
                  borderInline: i === 3 ? "" : "3px solid #fff",
                }}
                key={i}
              >
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
                  {data}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <InvoiceThreeBody />
        </tbody>
      </Table>
    </td>
  );
};

export default InvoiceThreeTable;
