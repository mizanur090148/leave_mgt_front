import React, { ChangeEvent } from "react";
import { sonodTypes } from "../../utils/helpers";
import { Input } from "reactstrap";

interface Props {
  setSearchKey: (searchKey: string) => void;
  setCertificateType: (certificateType: string) => void;
}

const SearchCertificate: React.FC<Props> = ({
  setSearchKey,
  setCertificateType,
}) => {
  return (
    <div className="certificate-search">
      <div className="mr-5 pr-5">
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          className="form-select-sm"
          onChange={(e) => setCertificateType(e.target.value)}
        >
          <option value="">সিলেক্ট সনদ টাইপ</option>
          {sonodTypes().map((data, key) => {
            return (
              <option key={key} value={data.id}>
                {data.name}
              </option>
            );
          })}
        </Input>
      </div>
      <div>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="সার্চ"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchKey(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default React.memo(SearchCertificate);
