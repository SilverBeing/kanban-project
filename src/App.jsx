import AllBoards from "./features/allBoards/AllBoards";

import { allBoards } from "./features/allBoards/allBoardsSlice";
import { useSelector } from "react-redux";

function App() {
	const allBoardsCreated = useSelector(allBoards);

	return (
		<>
			<AllBoards allBoardCreated={allBoardsCreated} />
		</>
	);
}

export default App;
