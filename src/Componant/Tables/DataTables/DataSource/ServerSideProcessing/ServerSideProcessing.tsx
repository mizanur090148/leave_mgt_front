import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Label } from "reactstrap";
import {
  SearchTableButton,
  ServerSideProcessingHeading,
} from "../../../../../utils/Constant";
import { H4 } from "../../../../../AbstractElements";
import {
  serverColumn,
  serverData,
} from "../../../../../Data/Tables/DataTables/DataSource/DataSource";
import DataTable from "react-data-table-component";

import { getRequest, patchRequest } from "../../../../../utils/axiosRequests";
import { Link } from "react-router-dom";
import { englishToBanglaNumber } from "../../../../../utils/helpers";
import { useSelector } from "react-redux";

interface AppState {
  auth: {
    data: {
      userType: string;
      username: string;
      email: string;
    };
    // Other auth-related properties can be added here
  };
  // Other top-level state properties can be added here
}

const ServerSideProcessing = () => {
  const [filterText, setFilterText] = useState("");
  const userInfo = useSelector((state: AppState) => state.auth.data);
  const [searchKey, setSearchKey] = useState("");
  const [certificateType, setCertificateType] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  console.log(userInfo);

  useEffect(() => {
    let queryUrl = `certificates?page=${page}&type=${certificateType}`;
    // if (
    //   (userInfo?.userType === "user" || userInfo?.userType === "chairman") &&
    //   searchKey.length > 0
    // ) {
    //   queryUrl = `certificates?page=${page}&unionId=${userInfo?.unionId?.id}&type=${certificateType}&searchKey=${searchKey}`;
    // } else if (
    //   (userInfo?.userType === "user" || userInfo?.userType === "chairman") &&
    //   searchKey.length === 0
    // ) {
    //   queryUrl = `certificates?page=${page}&unionId=${userInfo?.unionId?.id}&type=${certificateType}`;
    // } else if (userInfo?.userType === "admin" && searchKey.length > 0) {
    //   queryUrl = `certificates?page=${page}&type=${certificateType}&searchKey=${searchKey}`;
    // }
    getCertificates(queryUrl);
  }, [searchKey, page, perPage, certificateType]);

  const getCertificates = (url: any) => {
    getRequest(url)
      .then((res) => {
        console.log(res.data, serverColumn, 12321312);
        setCertificates(res.data);
        setTotalPages(Math.ceil(res.total / perPage));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const filteredItems = serverData.filter(
  //   (item) =>
  //     item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  // );
  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div
        id="dataSource"
        className="dataTables_filter d-flex align-items-center"
      >
        <Label className="me-1">{SearchTableButton}:</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilterText(e.target.value)
          }
          type="search"
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  return (
    <Col sm="12">
      <Card>
        <CardHeader className="pb-0 card-no-border">
          <H4 className="mb-3">{ServerSideProcessingHeading}</H4>
          <span>
            Server-side processing is enabled by setting the
            <code className="option" title="DataTables initialisation option">
              serverSide:option
            </code>
            option to <code>true</code> and providing an Ajax data source
            through the
            <code className="option" title="DataTables initialisation option">
              ajax:option
            </code>
            option.
          </span>
        </CardHeader>
        <CardBody>
          <div className="table-responsive">
            <DataTable
              data={certificates}
              columns={serverColumn}
              striped
              highlightOnHover
              pagination
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ServerSideProcessing;
