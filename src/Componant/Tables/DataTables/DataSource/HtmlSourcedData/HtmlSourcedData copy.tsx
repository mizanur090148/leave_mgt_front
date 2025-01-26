import React, { useEffect, useMemo, useState } from "react";
import {
  HtmlTableTittle,
  SearchTableButton,
} from "../../../../../utils/Constant";
import { Card, CardBody, Col, Input, Label } from "reactstrap";
import CardHeaderCommon from "../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import DataTable from "react-data-table-component";
import {
  //htmlColumn,
  htmlColumnData,
  htmlData,
} from "../../../../../Data/Tables/DataTables/DataSource/DataSource";
import { useSelector } from "react-redux";
import { getRequest, patchRequest } from "../../../../../utils/axiosRequests";
import { Link } from "react-router-dom";
import { englishToBanglaNumber } from "../../../../../utils/helpers";
import moment from "moment";

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

const HtmlSourcedData = () => {
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
        setCertificates(res.data);
        setTotalPages(Math.ceil(res.total / perPage));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const filteredItems = htmlColumnData.filter(
  //   (item) =>
  //     item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  // );
  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div
        id="basic-1_filter"
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

  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const getSonodName = (sonodId: any) => {
    return sonodId;
    //const result = sonodTypes().find((sonod: any) => sonod.id == sonodId);
    //return result ? result.name : "";
  };

  const approvedCertificate = (certificateId: any) => {
    var result = window.confirm("Are you sure want to approve?");
    if (result) {
      patchRequest(`certificates/${certificateId}`, { status: true })
        .then((data: any) => {
          // let index = certificates.findIndex(
          //   (certificate) => certificate._id === certificateId
          // );
          //certificates[index].status = true;
          setCertificates([...certificates]);
          // toast.success("Successfully approved", {
          //   position: toast.POSITION.TOP_RIGHT,
          // });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon
          title={HtmlTableTittle}
          headClass="pb-0 card-no-border"
        />
        <CardBody>
          <div className="table-responsive">
            <table className="list-table table-hover my-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>আবেদনকারীর নাম</th>
                  <th>সনদ টাইপ</th>
                  <th>সনদ নং</th>
                  <th>ইস্যু তারিখ</th>
                  <th>স্ট্যাটাস</th>
                  <th className="d-none d-md-table-cell">#</th>
                </tr>
              </thead>
              <tbody>
                {certificates?.length > 0 &&
                  certificates
                    .filter(
                      (certificate: any) =>
                        certificate.certificateNo != 21432527
                    )
                    .map((certificate: any, index) => (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td className="td-text-left">
                          {certificate?.details?.applicantName}
                        </td>
                        <td>{getSonodName(certificate?.type)}</td>
                        <td>{certificate?.certificateNo}</td>
                        <td>
                          {englishToBanglaNumber(
                            moment(certificate?.issueDate).format("DD-MM-YYYY")
                          )}
                        </td>
                        <td>
                          <button
                            className={`btn btn-xs ${
                              certificate.status ? "btn-success" : "btn-warning"
                            }`}
                            {...(!certificate?.status &&
                            userInfo?.userType !== "user"
                              ? {
                                  onClick: () => {
                                    approvedCertificate(certificate?._id);
                                  },
                                }
                              : {})}
                          >
                            {certificate?.status ? "Approved" : "Pending"}
                          </button>
                        </td>
                        <td className="action-td">
                          {((certificate?.status &&
                            userInfo?.userType !== "user") ||
                            !certificate?.status) && (
                            <Link
                              to={"/certificate/create"}
                              state={{ certificate }}
                            >
                              <i
                                className="fa fa-edit"
                                title="Click to edit"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          )}
                          <Link
                            to={"/certificate/view"}
                            state={{ certificate }}
                          >
                            <i
                              className="fa fa-eye"
                              title="View details"
                              aria-hidden="true"
                            ></i>
                          </Link>
                          {certificate?.status &&
                            userInfo?.userType !== "user" && (
                              <span
                              // onClick={() =>
                              //   deleteCertificate(certificate?._id)
                              // }
                              >
                                <i
                                  className="fa fa-trash"
                                  title="Delete"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            )}
                          {!certificate?.status && (
                            <span
                            // onClick={() =>
                            //   deleteCertificate(certificate?._id)
                            // }
                            >
                              <i
                                className="fa fa-trash"
                                title="Delete"
                                aria-hidden="true"
                              ></i>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                {certificates?.length === 0 && (
                  <tr>
                    <td colSpan={7} className="data-not-found">
                      Data not found
                    </td>
                  </tr>
                )}
              </tbody>
              {totalPages > 1 && (
                <tfoot>
                  <tr>
                    <td colSpan={7} className="text-end">
                      <div
                        className="btn-group mt-1"
                        role="group"
                        aria-label="First group"
                      >
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((pageNumber) => (
                          <button
                            type="button"
                            className={`btn btn-xs btn-outline-primary ${
                              pageNumber === page ? "btn-primary" : ""
                            }`}
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            style={{
                              fontWeight:
                                pageNumber === page ? "bold" : "normal",
                            }}
                          >
                            {pageNumber}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default HtmlSourcedData;
