import Countdown from "react-countdown";
import { H3, LI, UL } from "../../../../AbstractElements";
import { Days, DealDayFrom, Hours, Min, Sec } from "../../../../utils/Constant";
import { DealOfTheDayType } from "../../../../Types/DashboardType/EcommerceType";

const DealOfTheDay = () => {
  const renderer = ({ days,
    hours,
    minutes,
    seconds,
    completed }: DealOfTheDayType) => {
    if (!completed){
      return (
        <>
          <H3 className="text-truncate">
            {DealDayFrom}
            <span className="font-secondary"> $48 </span>
          </H3>
          <div className="countdown" id="clock-arrival" >
            <UL className="simple-list flex-row">
              <LI>
                <span className="days time">{days}</span>
                <span className="title">{Days}</span>
              </LI>
              <LI>
                <span className="hours time">{hours}</span>
                <span className="title">{Hours}</span>
              </LI>
              <LI className="px-3">
                <span className="minutes time">{minutes}</span>
                <span className="title">{Min}</span>
              </LI>
              <LI className="px-3">
                <span className="seconds time">{seconds}</span>
                <span className="title">{Sec}</span>
              </LI>
            </UL>
          </div>
        </>
      );
    }
  };
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var coundown = new Date(year, month, day + 10).getTime();

  return <Countdown date={coundown} renderer={renderer}/>
};

export default DealOfTheDay;
