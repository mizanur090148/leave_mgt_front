import { H5, Image, Progressbar } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { salesByProductTableData } from "../../../../Data/Dashboard/DefaultData";

const SalesByProductTableBody = () => {
  return (
    <tbody>
      {salesByProductTableData.map((data: any, i: number) => (
        <tr key={i}>
          <td>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <Image
                  src={dynamicImage(`dashboard/product/${data.img}`)}
                  alt="product"
                />
              </div>
              <div className="flex-grow-1">
                <Link to={data.link}>
                  <H5>{data.fileName}</H5>
                </Link>
              </div>
            </div>
          </td>
          <td> $ {data.amount}</td>
          <td> {data.sold}</td>
          <td>
            <Progressbar
              animated
              striped
              color={data.color}
              className={`b-r-2 progress-striped-${data.color}`}
              value={data.value}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default SalesByProductTableBody;
