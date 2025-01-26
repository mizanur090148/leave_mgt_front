import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceFiveHeader from "./InvoiceFiveHeader";
import InvoiceNumber from "./InvoiceNumber";
import InvoiceTable from "./InvoiceTable";
import InvoiceFiveSign from "./InvoiceFiveSign";
import { InvoiceButtons } from "../Common/InvoiceButtons";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InvoiceFiveContainer = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div ref={componentRef}>
        <Container className="invoice-2">
          <Card>
            <CardBody>
              <Table responsive className="table-wrapper theme-scrollbar" borderless>
                <tbody>
                  <tr>
                    <td>
                      <InvoiceFiveHeader />
                    </td>
                  </tr>
                  <tr>
                    <InvoiceNumber />
                  </tr>
                  <tr>
                    <InvoiceTable />
                  </tr>
                  <InvoiceFiveSign />
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
      <InvoiceButtons handlePrint={handlePrint}/>
    </>
  );
};

export default InvoiceFiveContainer;
