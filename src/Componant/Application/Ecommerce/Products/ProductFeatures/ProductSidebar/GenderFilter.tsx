import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterGender,
  removeGender,
} from "../../../../../../Store/Slices/FilterSlice";
import { Input, Label } from "reactstrap";
import { getGender } from "../../../../../../Service/Ecommerce.service";

const GenderFilter = () => {
  const { productItem } = useSelector((state: any) => state.product);
  const gender = getGender(productItem);
  const dispatch = useDispatch();
  const { filter } = useSelector((state: any) => state.filterData);

  const ClickCategory = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      dispatch(filterGender(e.target.value));
    } else {
      dispatch(removeGender(e.target.value));
    }
  };
  return (
    <div className="checkbox-animated mt-0">
      {gender.map((item: any, i: number) => (
        <Label className="d-block" key={i}>
          <Input
            className="radio_animated"
            defaultChecked={filter.brand.includes(item) ? true : false}
            type="radio"
            name="name"
            value={item}
            onChange={ClickCategory}
          />
          {item}
        </Label>
      ))}
    </div>
  );
};

export default GenderFilter;
