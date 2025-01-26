import { CardBody, Table } from "reactstrap";
import SweetAlert from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { H6, P } from "../../../../AbstractElements";
import { Href } from "../../../../utils/Constant";
import { Link2, MoreHorizontal, Trash2 } from "react-feather";
import { Link } from "react-router-dom";
import { setAllTasks } from "../../../../Store/Slices/TasksSlice";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const CreatedByMe = () => {
  const { allTasks } = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();
  const deleteTask = (userId: number) => {
    SweetAlert.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        const updatedTask = allTasks.filter(
          (data: { id: number }) => data.id !== userId
        );
        dispatch(setAllTasks(updatedTask));
      } else {
        SweetAlert.fire("Your imaginary file is safe!");
      }
    });
  };
  return (
    <CardBody className="p-0">
      <div className="taskadd">
        <div className="table-responsive theme-scrollbar">
          <Table borderless>
            <tbody>
              {allTasks.map(
                (data: {
                  id: Key | null | undefined;
                  title:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  collection:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  description:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                }) => (
                  <tr key={data.id}>
                    <td>
                      <H6 className="task_title_0 f-w-600">{data.title}</H6>
                      <P className="project_name_0">{data.collection}</P>
                    </td>
                    <td>
                      <P className="task_desc_0">{data.description}</P>
                    </td>
                    <td>
                      <Link className="me-2" to={Href}>
                        <Link2 />
                      </Link>
                      <Link to={Href}>
                        <MoreHorizontal />
                      </Link>
                    </td>
                    <td>
                      <Link to={Href}>
                        <Trash2 />
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </CardBody>
  );
};

export default CreatedByMe;
