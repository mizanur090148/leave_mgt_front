import { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { deleteRequest, getRequest } from "../../../utils/axiosRequests";
import { capitalizeFirst } from "../../../utils/helpers";
import { toast } from "react-toastify";
import CommonSearch from "../../Global/CommonSearch";
import Pagination from "../../Global/pagination";
//import ToolTipAndPopover from "./../../Ui-Kits/Modal/BasicModalCart/ToolTipAndPopover/ToolTipAndPopover";

const Users = () => {
  const [searchKey, setSearchKey] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let url = searchKey.length
      ? `settings/users?page=${page}&perPage=${perPage}&searchKey=${searchKey}`
      : `settings/users?page=${page}&perPage=${perPage}`;
    getUsers(url);
  }, [searchKey, page, perPage]);

  const getUsers = async (url: any) => {
    await getRequest(url)
      .then((res) => {
        setUsers(res.data);
        setTotalPages(Math.ceil(res.total / perPage));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = (id: any) => {
    var result = window.confirm("Are you sure want to delete?");
    if (result) {
      deleteRequest(`settings/users/${id}`)
        .then((data: any) => {
          const result = users?.filter((item: any) => item.id !== id);
          setUsers([...result]);
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
                to="/settings/user/create"
                className="btn btn-sm btn-primary custom-btn"
              >
                ইউজার তৈরী
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
                  <th>মোবাইল</th>
                  <th>ই-মেইল</th>
                  <th>ইউনিয়ন</th>
                  <th>টাইপ</th>
                  <th>স্ট্যাটাস</th>
                  <th className="d-none d-md-table-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.length > 0 &&
                  users.map((user: any, index) => (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{user?.name}</td>
                      <td>{user?.mobile}</td>
                      <td>{user?.email}</td>
                      <td>{user?.unionId?.name}</td>
                      <td>{capitalizeFirst(user?.userType)}</td>
                      <td>{capitalizeFirst(user?.status)}</td>
                      <td className="action-td">
                        {/* <Link to={"/settings/users/create"} state={{ user }}>
                          <i
                            className="fa fa-edit"
                            title="Click to edit"
                            aria-hidden="true"
                          ></i>
                        </Link> */}
                        {user?.userType === "user" && (
                          <Link
                            to={"/settings/user/balance"}
                            state={{ user }}
                            style={{ paddingLeft: "14px" }}
                          >
                            <i
                              className="fa fa-dollar"
                              title="Add balance"
                              aria-hidden="true"
                            ></i>
                          </Link>
                        )}
                        <i
                          className="fa fa-trash"
                          title="Delete"
                          aria-hidden="true"
                          onClick={() => deleteUser(user.id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {users?.length > 0 && (
            <Pagination
              visibleLinks={10}
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
          {/* <ToolTipAndPopover /> */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default Users;
