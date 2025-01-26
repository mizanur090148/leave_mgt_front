import { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { deleteRequest, getRequest } from "../../../utils/axiosRequests";
import { capitalizeFirst, sonodTypes } from "../../../utils/helpers";
import { toast } from "react-toastify";
import CommonSearch from "../../Global/CommonSearch";
import Pagination from "../../Global/pagination";

const Unions = () => {
  const [searchKey, setSearchKey] = useState("");
  const [unions, setUnions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let url = searchKey.length
      ? `settings/unions?page=${page}&perPage=${perPage}&searchKey=${searchKey}`
      : `settings/unions?page=${page}&perPage=${perPage}`;
    getUnions(url);
  }, [searchKey]);

  const getUnions = async (url: any) => {
    await getRequest(url)
      .then((res) => {
        console.log(res, "res.datares.data");
        setUnions(res.data);
        setTotalPages(Math.ceil(res.total / perPage));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUnion = (id: any) => {
    var result = window.confirm("Are you sure want to delete?");
    if (result) {
      deleteRequest(`settings/unions/${id}`)
        .then((data: any) => {
          const result = unions?.filter((item: any) => item.id !== id);
          setUnions([...result]);
          toast.success("Successfully deleted", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  return (
    <Col sm="12">
      <Card>
        <CardBody className="custom-card-body">
          <div className="custom-flex">
            <h6 className="card-title mb-0">
              <Link
                to="/settings/union/create"
                className="btn btn-sm btn-primary custom-btn"
              >
                ইউনিয়ন তৈরী
              </Link>
            </h6>
            <CommonSearch setSearchKey={setSearchKey} />
          </div>
          <div className="table-responsive">
            <table className="list-table table-hover my-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>নাম</th>
                  <th>চেয়ারম্যান</th>
                  <th>মোবাইল</th>
                  <th>ই-মেইল</th>
                  <th>থানা</th>
                  <th>জেলা</th>
                  <th>স্ট্যাটাস</th>
                  <th className="action-col">#</th>
                </tr>
              </thead>
              <tbody>
                {unions &&
                  unions?.length > 0 &&
                  unions?.map((union: any, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{union?.name}</td>
                      <td>{union?.chairman}</td>
                      <td>{union?.mobileNo}</td>
                      <td>{union?.email}</td>
                      <td>{union?.thana}</td>
                      <td>{union?.zilla}</td>
                      <td>{capitalizeFirst(union?.status)}</td>
                      <td className="action-td">
                        <Link to={"/settings/union/create"} state={{ union }}>
                          <i
                            className="fa fa-edit"
                            title="Click to edit"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <Link
                          to={"/settings/certificate-settings"}
                          state={{ union }}
                        >
                          <i
                            className="fa fa-cog"
                            title="Click for setings"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <span onClick={() => deleteUnion(union.id)}>
                          <i
                            className="fa fa-trash"
                            title="Delete"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {unions?.length > 0 && (
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

export default Unions;
