import {configureStore} from '@reduxjs/toolkit'
import allBoardsReducer from "../features/allBoards/allBoardsSlice"
import boardReducer from "../features/board/boardSlice"
import taskReducer from "../features/Tasks/TaskSlice"

export const store = configureStore({
	reducer: {
		allBoards : allBoardsReducer,
		board: boardReducer,
		task: taskReducer
	
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
});
