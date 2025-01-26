import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceBackImage from "./InvoiceBackImage";
import InvoiceContent from "./InvoiceContent";
import InvoiceOrder from "./InvoiceOrder";
import InvoiceSign from "./InvoiceSign";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { InvoiceButtons } from "../Common/InvoiceButtons";

const InvoiceOneContainer = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div ref={componentRef}>
        <Container>
          <Card className="invoice-1">
            <CardBody>
              <Table className="table-wrapper" borderless>
                <tbody>
                  <tr>
                    <InvoiceHeader />
                  </tr>
                  <tr>
                    <InvoiceBackImage />
                  </tr>
                  <tr>
                    <InvoiceContent />
                  </tr>
                  <tr>
                    <InvoiceOrder />
                  </tr>
                </tbody>
                <tbody>
                  <InvoiceSign />
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

export default InvoiceOneContainer;
