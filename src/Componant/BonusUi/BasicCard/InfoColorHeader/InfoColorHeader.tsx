import { infoColorHeaderData } from "../../../../Data/BonusUi/BasicCard/BasicCard";
import CommonCard from "../Common/CommonCard";

const InfoColorHeader = () => {
  return (
    <>
      {infoColorHeaderData.map((item: any, index: number) => (
        <CommonCard key={index} data={item} />
      ))}
    </>
  );
};

export default InfoColorHeader;
