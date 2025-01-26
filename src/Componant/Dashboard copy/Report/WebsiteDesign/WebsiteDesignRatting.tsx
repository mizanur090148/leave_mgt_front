import { P } from "../../../../AbstractElements";
const WebsiteDesignRatting = ({data}: any) => {
  return (
    <div className="ratting-button">
      {data.ratting.map((item:any, i:number) => (
        <div key={i}> 
          <div className="d-flex align-items-center gap-2 mb-0">
            <div className="flex-shrink-0">
              <P className="f-w-500">{item.total}</P>
            </div>
            <div className="flex-grow-1">
              <span className="f-w-500">{item.detail}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebsiteDesignRatting;
