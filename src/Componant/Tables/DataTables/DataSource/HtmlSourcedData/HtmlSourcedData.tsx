import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, Input, Label } from "reactstrap";
import moment from "moment";
import {
  deleteRequest,
  getRequest,
  patchRequest,
} from "../../../../../utils/axiosRequests";
import { Link } from "react-router-dom";
import { sonodTypes } from "../../../../../utils/helpers";
import { useSelector } from "react-redux";
import Pagination from "../../../../Global/pagination";
import SearchCertificate from "../../../../Global/SearchCertificate";
import { toast } from "react-toastify";

const HtmlSourcedData = () => {
  const [searchKey, setSearchKey] = useState("");
  const [certificateType, setCertificateType] = useState("");
  const userInfo = useSelector((state: AppState) => state?.auth?.data);
  const [certificates, setCertificates] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const queryUrl = `certificates?page=${page}`;
  //   getCertificates(queryUrl);
  // }, [page]);

  useEffect(() => {
    let queryUrl = `certificates?page=${page}&type=${certificateType}`;
    if (
      (userInfo?.userType === "user" || userInfo?.userType === "chairman") &&
      searchKey.length > 0
    ) {
      queryUrl = `certificates?page=${page}&unionId=${userInfo?.unionId?.id}&type=${certificateType}&searchKey=${searchKey}`;
    } else if (
      (userInfo?.userType === "user" || userInfo?.userType === "chairman") &&
      searchKey.length === 0
    ) {
      queryUrl = `certificates?page=${page}&unionId=${userInfo?.unionId?.id}&type=${certificateType}`;
    } else if (userInfo?.userType === "admin" && searchKey.length > 0) {
      queryUrl = `certificates?page=${page}&type=${certificateType}&searchKey=${searchKey}`;
    }
    getCertificates(queryUrl);
  }, [searchKey, page, perPage, certificateType]);

  const getCertificates = (url: any) => {
    getRequest(url)
      .then((res: any) => {
        setIsLoading(true);
        setCertificates(res.data);
        setTotalPages(Math.ceil(res.total / perPage));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
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
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const getSonodName = (sonodId: any) => {
    //return sonodId;
    const result = sonodTypes().find((sonod: any) => sonod.id == sonodId);
    return result ? result.name : "";
  };

  const deleteCertificate = (id: any) => {
    var result = window.confirm("Are you sure want to delete?");
    if (result) {
      deleteRequest(`certificates/${id}`)
        .then((data: any) => {
          const result = certificates.filter((item: any) => item._id !== id);
          setCertificates([...result]);
          toast.success("Successfully deleted", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Col sm="12">
      <Card>
        <CardBody className="custom-card-body">
          <div className="custom-flex">
            <h6 className="card-title mb-0">সনদ লিস্ট</h6>
            <SearchCertificate
              setCertificateType={setCertificateType}
              setSearchKey={setSearchKey}
            />
          </div>
          <div className="table-responsive">
            <table className="list-table table-hover my-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>সনদ নং</th>
                  <th>সনদ টাইপ</th>
                  <th>আবেদনকারীর নাম</th>
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
                        <td>{certificate?.certificateNo}</td>
                        <td>{getSonodName(certificate?.type)}</td>
                        <td className="td-text-left">
                          {certificate?.details?.applicantName}
                        </td>
                        <td>
                          {moment(certificate?.issueDate).format("DD-MM-YYYY")}
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
                              to={"/certificate/edit"}
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
                                onClick={() =>
                                  deleteCertificate(certificate?._id)
                                }
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
                              onClick={() =>
                                deleteCertificate(certificate?._id)
                              }
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
                {isLoading && certificates?.length === 0 && (
                  <tr className="data-not-found">
                    <td colSpan={7}>Data not found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {certificates?.length > 0 && (
            <Pagination
              visibleLinks={10}
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default HtmlSourcedData;
