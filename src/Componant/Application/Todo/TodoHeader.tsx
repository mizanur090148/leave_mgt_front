import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CardHeader, Input } from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { AddTask } from "../../../utils/Constant";
import { addNewTodo, setTask } from "../../../Store/Slices/ToDoSlice";

const TodoHeader = () => {
  const { task } = useSelector((state: any) => state.todo);
  const dispatch = useDispatch();
  const handleNewTask = () => {
    if (task === "") {
      toast.error("please add your todo");
    } else {
      dispatch(addNewTodo(task));
      dispatch(setTask(" "));
      toast.success(`Completed add ${task}`);
    }
  };

  const onTaskChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTask(e.currentTarget.value));
  };
  return (
    <CardHeader className="b-bottom">
      <div className="todo-list-header">
        <div className="new-task-wrapper input-group">
          <Input
            id="new-task"
            placeholder="Enter new task here. . ."
            onChange={(e) => onTaskChanged(e)}
            value={task}
          />
          <Btn
            color="primary"
            className="add-new-task-btn"
            id="add-task"
            onClick={handleNewTask}
          >
            {AddTask}
          </Btn>
        </div>
      </div>
    </CardHeader>
  );
};

export default TodoHeader;
