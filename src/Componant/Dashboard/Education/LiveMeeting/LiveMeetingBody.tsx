import { Image } from "../../../../AbstractElements";
import { liveMeetingData } from "../../../../Data/Dashboard/EducationData";
import { dynamicImage } from "../../../../Service";

const LiveMeetingBody = () => {
  return (
    <>
      <div className="live-metting">
        <Image className="img-fluid" src={dynamicImage(`dashboard-4/metting/teacher.png`)} alt="teacher" />
        <div className="star-img">
          <Image className="img-fluid" src={dynamicImage(`dashboard-4/metting/chart.png`)} alt="chart" />
          <Image className="img-fluid" src={dynamicImage(`dashboard-4/metting/message.png`)} alt="message" />
          {liveMeetingData.map((data,i)=>(
            <Image src={dynamicImage(`dashboard-4/metting/${data}.png`)} alt="metting" key={i}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default LiveMeetingBody;
