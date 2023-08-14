import { createSlice } from "@reduxjs/toolkit";
const 	initialState= {
		title: "",
		description: "",
		status: "",
		subtasks: [
			{
				title: "",
				isCompleted: false,
			},
			{
				title: "",
				isCompleted: false,
			},
		],
	}
const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		setTitle: (state, { payload }) => {
			state.title = payload;
		},
		setDescription: (state, { payload }) => {
			state.description = payload;
		},
		setStatus: (state, { payload }) => {
			state.status = payload;
		},
		addSubtask: (state) => {
			state.subtasks.push({
				title: "",
				isCompleted: false,
			});
		},
		updateTask: (state, {payload}) => {
			state.title = payload.title;
			state.description= payload.description;
			state.status = payload.status;
			state.subtasks = payload.subtasks

		},
		resetTasks: (state) => {
			state.title = "",
			state.description= "",
			state.status="",
			state.subtasks = [...initialState.subtasks];

		},
    removeSubtask: (state, {payload}) => {
      const newData = state.subtasks.filter((_, i) => i !== payload)
      state.subtasks= newData
    },
		setSubtask: (state, { payload }) => {
			const { data, index } = payload;
			const newData = state.subtasks.map((task, i) => {
				if (i === index) {
					return {
						...task,
						...data,
					};
				}
				return task;
			});
			state.subtasks = newData;
		},
	},
});
export const title = (state) => state.task.title
export const selectTask = (state) => state.task
export const description= (state) => state.task.description
export const subtasks = (state) => state.task.subtasks
export const status = (state) => state.task.status

export const {setDescription, removeSubtask, setStatus, setTitle, setSubtask, addSubtask, resetTasks, updateTask} = taskSlice.actions
export default taskSlice.reducer