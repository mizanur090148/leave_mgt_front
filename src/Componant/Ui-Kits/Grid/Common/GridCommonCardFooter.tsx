import { CardFooter, Table } from "reactstrap";
import { Class, ValueOfClass } from "../../../../utils/Constant";
import { GridCommonCardFooterType } from "../../../../Types/Ui-Kits/UiKitsTypes";

const GridCommonCardFooter:React.FC<GridCommonCardFooterType> = ({ className, valueClass }) => {
  return (
    <CardFooter>
      <div className="table-responsive theme-scrollbar">
        <Table className="w-100">
          <tbody>
            <tr>
              <th>{Class}</th>
              <th>{ValueOfClass}</th>
            </tr>
            <tr>
              <td><code>{className}</code></td>
              <td>{valueClass}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </CardFooter>
  );
};

export default GridCommonCardFooter;