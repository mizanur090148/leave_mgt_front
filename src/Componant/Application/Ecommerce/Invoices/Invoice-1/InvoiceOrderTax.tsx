import { getallCardTotal } from "../../../../../Service/Ecommerce.service";
import { useSelector } from "react-redux";

const InvoiceOrderTax = () => {
  const { cart, tax } = useSelector((state: any) => state.cartData);
  return (
    <>
      <td> </td>
      <td> </td>
      <td style={{ padding: "5px 0", paddingTop: 0 }}>
        <span>Tax({tax}%)</span>
      </td>
      <td style={{ padding: "5px 0", textAlign: "right", paddingTop: 0 }}>
        <span>$ {(getallCardTotal(cart) * tax) / 100}</span>
      </td>
    </>
  );
};

export default InvoiceOrderTax;
