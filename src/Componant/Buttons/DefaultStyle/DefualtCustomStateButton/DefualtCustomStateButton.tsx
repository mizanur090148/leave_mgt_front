import { Card, CardBody } from "reactstrap";
import CommonCardHeading from "../../CommonButtons/CommonCardHeading";
import { CustomButtons } from "../../../../utils/Constant";
import {
  customButtonsSpan,
  customStateDataList,
} from "../../../../Data/Buttons/DefaultStyle";
import DefaultCustomStateButtonBody from "./DefaultCustomStateButtonBody";

const DefualtCustomStateButton = () => {
  return (
    <Card>
      <CommonCardHeading
        smallHeading={CustomButtons}
        span={customButtonsSpan}
      />
      <CardBody className="btn-showcase">
        {customStateDataList.map((item: any, index: number) => (
          <DefaultCustomStateButtonBody data={item} key={index} />
        ))}
      </CardBody>
    </Card>
  );
};

export default DefualtCustomStateButton;
