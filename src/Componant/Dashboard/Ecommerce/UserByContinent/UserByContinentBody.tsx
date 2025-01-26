import { H5, Progressbar } from "../../../../AbstractElements";
import MapItems from "./MapItems";
import AllOverContriesSale from "./AllOverContriesSale";

const UserByContinentBody = () => {
  return (
    <>
      <div className="user-map-menu d-flex align-items-center gap-5">
        <div className="user-items">
          <H5>
            1,506<span>{"items"}</span>
          </H5>
          <Progressbar multi>
            <Progressbar bar color="primary" value={25} />
            <Progressbar bar color="secondary" value={25} />
            <Progressbar bar color="warning" value={25} />
            <Progressbar bar color="tertiary" value={25} />
          </Progressbar>
        </div>
        <MapItems />
      </div>
      <AllOverContriesSale />
    </>
  );
};

export default UserByContinentBody;
