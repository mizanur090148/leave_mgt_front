import { H5, LI, P, UL } from "../../../../AbstractElements";
import { userContinentData } from "../../../../Data/Dashboard/Ecommerce";

const MapItems = () => {
  return (
    <div className="map-items">
      <UL className="d-flex align-items-center gap-3 simple-list flex-row">
        {userContinentData.map((data: any, i: number) => (
          <LI key={i}>
            <H5>
              <span className={`bg-${data.color}`} />
              {data.title}
            </H5>
            <P className="mb-0">{data.number}</P>
          </LI>
        ))}
      </UL>
    </div>
  );
};

export default MapItems;
