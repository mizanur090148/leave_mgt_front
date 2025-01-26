import { useSelector } from "react-redux";
import { getallCardTotal } from "../../../../../Service/Ecommerce.service";

const InvoiceOrderAmount = () => {
  const { cart, tax } = useSelector((state: any) => state.cartData);
  return (
    <>
      <td> </td>
      <td> </td>
      <td style={{ padding: "10px 0" }}>
        <span style={{ fontWeight: 600 }}>Amount Due (USD)</span>
      </td>
      <td style={{ padding: "10px 0", textAlign: "right" }}>
        <span style={{ fontWeight: 600 }}>
          $ {getallCardTotal(cart) - (getallCardTotal(cart) * tax) / 100}
        </span>
      </td>
    </>
  );
};

export default InvoiceOrderAmount;
