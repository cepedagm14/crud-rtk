import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../features/task/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const taskId = useSelector((state) => state.task);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(taskId.find((task) => task.id === params.id));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label htmlFor="" className="block text-sm font-bold mb-1">
        Task:
      </label>
      <input
        onChange={handleChange}
        name="title"
        type="text"
        placeholder="title"
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 "
      />
      <label htmlFor="" className="block text-sm font-bold mb-1">
        Description:
      </label>
      <textarea
        onChange={handleChange}
        name="description"
        placeholder="description"
        value={task.description}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 "
      ></textarea>
      <button className="bg-indigo-600 px-2 py-1 rounded-md">Save</button>
    </form>
  );
};
