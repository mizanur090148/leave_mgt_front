import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addNewBrand,
  removeBrand,
} from "../../../../../../Store/Slices/FilterSlice";
import { Brand } from "../../../../../../utils/Constant";
import { H4 } from "../../../../../../AbstractElements";
import { Input, Label } from "reactstrap";
import { getBrands } from "../../../../../../Service/Ecommerce.service";

const BrandFilter = () => {
  const { productItem } = useSelector((state: any) => state.product);
  const brands = getBrands(productItem);
  const { filter } = useSelector((state: any) => state.filterData);
  const dispatch = useDispatch();

  const clickBrandHandle = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: string[]
  ) => {
    const index = brands.indexOf(event.target.value);
    if (event.target.checked === true) {
      dispatch(addNewBrand(event.target.value));
    } else {
      dispatch(removeBrand({ index, category }));
    }
  };
  return (
    <div className="product-filter">
      <H4 className="f-w-600">{Brand}</H4>
      <div className="checkbox-animated mt-0">
        {brands.map((brand, index) => (
          <Label className="d-block" key={index}>
            <Input
              className="checkbox_animated"
              onChange={(e) => clickBrandHandle(e, filter.category)}
              value={brand}
              defaultChecked={filter.brand.includes(brand) ? true : false}
              type="checkbox"
            />
            {brand}
          </Label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
