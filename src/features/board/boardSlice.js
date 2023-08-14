import { createSlice } from "@reduxjs/toolkit";
const initialState = {
		name: "",
		columns: [
			{
				name: "Todo",
				tasks: [],
			},
			{
				name: "Doing",
				tasks: [],
			},
		],
	}
const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
    setName:(state, {payload}) => {
      state.name = payload
    },
		setSubTask: (state, { payload }) => {
			const { index, thirdIndex, data } = payload;
			const newData = state.columns[index].tasks[thirdIndex].subtasks.map(
				(task, i) => {
					if (data.index === i) {
						return {
							...task,
							...data,
						};
					}
					return newData;
				}
			);
			state.columns[index].tasks[thirdIndex].subtasks = newData;
		},
		addSubTask: (state, { payload }) => {
			const { index, secondIndex } = payload;
			state.columns[index].tasks[secondIndex].subtasks.push({
				title: "",
				isCompleted: false,
			});
		},
		addTask : (state, {payload}) => {
			state.columns[payload.index].tasks.push(payload.data)
		},
		removeSubTask: (state, { payload }) => {
			const { index, secondIndex, data } = payload;
			const newData = state.columns[index].tasks[secondIndex].subtasks.filter((_, i) => i !== data)
      state.columns[index].tasks[secondIndex].subtasks = newData;
		},
		addColumns: (state) => {
			state.columns.push({
				name: "",
				tasks: [],
			});
		},
		setTask: (state, { payload }) => {
			const { index, data } = payload;
			const newData = state.columns[index].tasks.map((task, i) => {
				if (data.index === i) {
					return {
						...task,
						...data,
					};
				}

				return task;
			});
			state.columns[index].tasks = newData;
		},
		setColumnName: (state, { payload }) => {
			const { index, name } = payload;
			state.columns[index].name = name;
		},
		removeColumn: (state, { payload }) => {
			const newData = state.columns.filter((_, i) => i !== payload);
			state.columns = newData;
		},
		updateAll : (state, { payload }) => {
			state.name = payload.name;
			state.columns= payload.columns;
		},
		resetAll: (state) => {
			state.name ="",
			state.columns = [...initialState.columns]

		}
	
	},
});
export const columns = (state) => state.board.columns
export const selectBoard = (state) => state.board

export const name = (state) => state.board.name
export const {
  setColumnName,setSubTask,addTask, setTask, addColumns,addSubTask,updateAll, resetAll, setName, removeColumn, removeSubTask
} = boardSlice.actions
export default boardSlice.reducer