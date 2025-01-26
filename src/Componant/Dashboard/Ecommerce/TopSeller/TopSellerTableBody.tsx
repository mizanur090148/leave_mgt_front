import { Input, Label } from "reactstrap";
import { H6, Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { topSellerTableData } from "../../../../Data/Dashboard/Ecommerce";
import { Link } from "react-router-dom";

const TopSellerTableBody = () => {
  return (
    <tbody>
      {topSellerTableData.map((data: any, i: number) => (
        <tr key={i}>
          <td>
            <div className="form-check">
              <Input type="checkbox" />
              <Label className="form-check-label" />
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image
                  src={dynamicImage(`dashboard-3/user/${data.image}`)}
                  alt="users"
                />
              </div>
              <div className="flex-grow-1">
                <Link to={data.link}>
                  <H6>{data.name}</H6>
                </Link>
              </div>
            </div>
          </td>
          <td>{data.brand}</td>
          <td>{data.product}</td>
          <td>{data.sold}</td>
          <td>
            <P>{data.price}</P>
          </td>
          <td>{data.earning}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TopSellerTableBody;
