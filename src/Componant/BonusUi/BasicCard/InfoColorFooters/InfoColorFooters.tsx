import { infoColorFooterData } from "../../../../Data/BonusUi/BasicCard/BasicCard";
import CommonCard from "../Common/CommonCard";

const InfoColorFooters = () => {
  return (
    <>
      {infoColorFooterData.map((item: any, index: number) => (
        <CommonCard key={index} data={item} />
      ))}
    </>
  );
};

export default InfoColorFooters;
