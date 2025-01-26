import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader, TabPane } from "reactstrap";
import { H4 } from "../../../../AbstractElements";
import { CreatedByMe } from "../../../../utils/Constant";
import ViewBookmark from "./ViewBookmark";
import DataLoop from "./DataLoop";

const DataLoopTab = () => {
  const { gridView } = useSelector((state: any) => state.bookmarkTab);
  return (
    <TabPane tabId="1">
      <Card className="mb-0">
        <CardHeader className="d-flex">
          <H4 className="mb-0">{CreatedByMe}</H4>
          <ViewBookmark />
        </CardHeader>
        <CardBody className="pb-0">
          <div
            className={`details-bookmark text-center ${
              gridView ? "" : "list-bookmark"
            }`}
          >
            <DataLoop />
          </div>
        </CardBody>
      </Card>
    </TabPane>
  );
};

export default DataLoopTab;
