import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
	columns,
	addColumns,
	removeColumn,
	setColumnName,
	name,
	setName,
	resetAll,
	selectBoard,
} from "./boardSlice";
import { AiOutlineClose } from "react-icons/ai";

import PropTypes from "prop-types";

export default function BoardModal({
	index,
	cta = "Add new board",
	boardColor,
	action,
	hide,
	heading = "Add new Board",
}) {
	const column = useSelector(columns);
	const boardName = useSelector(name);
	const selectAllBoard = useSelector(selectBoard);

	const dispatch = useDispatch();
	const handeleSubmit = (e) => {
		e.preventDefault();
		action({ index, data: selectAllBoard });
		dispatch(resetAll());
		hide();
	};
	return (
		<form onSubmit={handeleSubmit}>
			<Heading fontSize="18px" mb="20px">
				{heading}
			</Heading>
			<Box>
				<FormControl mb="10px">
					<FormLabel fontSize="12px" fontWeight="800">
						Name
					</FormLabel>
					<Input
						value={boardName}
						fontSize="14px"
						placeholder="Enter name of board"
						_placeholder={{ fontSize: "10px" }}
						onChange={(e) => dispatch(setName(e.target.value))}
					/>
				</FormControl>
			</Box>
			<Box>
				<FormControl mb="10px">
					<FormLabel fontSize="12px" fontWeight="800">
						Columns
					</FormLabel>
					{column.map((col, i) => (
						<Flex key={i} mb="10px">
							<Input
								value={col.name}
								fontSize="12px"
								_placeholder={{ fontSize: "10px" }}
								onChange={(e) =>
									dispatch(setColumnName({ index: i, name: e.target.value }))
								}
								placeholder="Enter Name of Column"
							/>
							<Button
								onClick={() => dispatch(removeColumn(i))}
								color={boardColor}
								colorScheme="none">
								<AiOutlineClose />
							</Button>
						</Flex>
					))}
				</FormControl>
				<Button
					type="button"
					onClick={() => dispatch(addColumns())}
					borderRadius="20px"
					w="100%"
					m="10px 0">
					Add Column
				</Button>
				<Button
					type="submit"
					bg="brandPurple"
					color="white"
					borderRadius="20px"
					w="100%"
					m="10px 0">
					{cta}
				</Button>
			</Box>
		</form>
	);
}
BoardModal.propTypes = {
	action: PropTypes.func,
	hide: PropTypes.func,
	index: PropTypes.number,
	cta: PropTypes.string,
	heading: PropTypes.string,
	boardColor: PropTypes.string,
};
