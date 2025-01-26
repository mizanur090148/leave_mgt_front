import { H2, P } from "../../../../AbstractElements";
const TotalSellsDetails = ({data}:any) => {
  return (
    <div className="flex-grow-1">
      <div className="d-flex align-items-center gap-2">
        <H2>$ {data.count}</H2>
        <div className="d-flex total-icon">
          <P className={`mb-0 up-arrow bg-light-${data.color}`}>
            <i className={`fa ${data.icon} text-${data.color}`} />
          </P>
          <span className={`f-w-500 font-${data.color}`}>
            {data.percentage}
          </span>
        </div>
      </div>
      <P className="text-truncate">{data.detail}</P>
    </div>
  );
};

export default TotalSellsDetails;
