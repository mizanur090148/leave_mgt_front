import { H5, H6, LI, SVG, UL } from "../../../../AbstractElements";
import { allOverCountriesData } from "../../../../Data/Dashboard/Ecommerce";
import { AllOverContriesSales } from "../../../../utils/Constant";
import CountriesMap from "./CountriesMap";

const AllOverCountriesSale = () => {
  return (
    <div className="contries-sale d-flex gap-4">
      <div className="map-value">
        <H5>{AllOverContriesSales}</H5>
        <UL className="simple-list">
          {allOverCountriesData.map((data: any, i: number) => (
            <LI key={i}>
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <SVG className={`fill-${data.color}`} iconId="map-loaction" />
                </div>
                <div className="flex-grow-1">
                  <H6>{data.title}</H6>
                </div>
                <span>{data.percentage}</span>
              </div>
            </LI>
          ))}
        </UL>
      </div>
      <CountriesMap />
    </div>
  );
};

export default AllOverCountriesSale;
