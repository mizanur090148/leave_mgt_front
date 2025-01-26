import { LI, UL } from "../../../../../AbstractElements";
import { Link } from "react-router-dom";
import { Href } from "../../../../../utils/Constant";
import { useDispatch } from "react-redux";
import { setColView } from "../../../../../Store/Slices/FilterSlice";
import { filterProductData } from "../../../../../Data/Application/Ecommerce/Product";

const GridOptions = () => {
  const dispatch = useDispatch();
  const LayoutView = (colClass: string) => dispatch(setColView(colClass));
  return (
    <div className="grid-options d-inline-block">
      <UL>
        {filterProductData.map((data: any, index: any) => (
          <LI key={index}>
            <Link
              className={`product-${data.id}-layout-view`}
              to={Href}
              onClick={() => LayoutView(data.colClass)}
            >
              {data.filterData.map((item: any, number: any) => (
                <span
                  key={number}
                  className={`line-grid line-grid-${item} bg-primary`}
                ></span>
              ))}
            </Link>
          </LI>
        ))}
      </UL>
    </div>
  );
};

export default GridOptions;
