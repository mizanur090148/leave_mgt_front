import React from "react";
import { Input } from "reactstrap";
interface Props {
  setSearchKey: (searchKey: string) => void;
}

const CommonSearch: React.FC<Props> = ({ setSearchKey }) => {
  return (
    <div>
      <Input
        bsSize="sm"
        type="text"
        placeholder="সার্চ"
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </div>
  );
};

export default React.memo(CommonSearch);
