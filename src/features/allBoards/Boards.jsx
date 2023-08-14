import PropTypes from "prop-types";
import {
	Box,
	Grid,
	Heading,
	Flex,
	GridItem,
	Button,
	useColorModeValue,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { updateAll } from "../board/boardSlice";
import Modal from "../../modals";
import { useCallback, useState } from "react";
import BoardModal from "../board/boardModal";
import { editBoard } from "./allBoardsSlice";
import { selectTask, updateTask } from "../Tasks/TaskSlice";
import { keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import Task from "./Task";

export default function Boards({ data, index, boardbg, boardColor }) {
	const panelColor = useColorModeValue("brandPanelLight", "brandPanelDark");
	const dispatch = useDispatch();

	const boxPanel = useColorModeValue("#ffffff", "brandPanelDark");
	const boxColor = useColorModeValue("black", "#ffffff");
	const subTaskColor = useColorModeValue("#444", "#82837D");

	const [edit, setEdit] = useState(false);
	const [active, setActive] = useState(false);

	const [id, setId] = useState();
	const [columnId, setColumnId] = useState();

	const handleEdit = () => {
		setActive(true);
		dispatch(updateAll(data));
	};
	const pop = keyframes`
	0% {
		opacity: 0;
		transform: translateX(-250px);
	}

	100% {
		opacity: 1;
		transform: translateX(0);
	}
`;
	const prefersReducedMotion = usePrefersReducedMotion();
	const animationIn = prefersReducedMotion
		? undefined
		: `${pop} 700ms ease 0s 1 normal forwards`;
	const handleTaskEdit = (tee) => {
		setEdit(true);
		const result = data.columns[tee.index].tasks.find(
			(task) => task.title === tee.title
		);
		console.log(result);
		setColumnId(tee.index);
		setId(tee.id);
		dispatch(updateTask(result));
	};

	return (
		<Grid
			overflow="scroll"
			bg={boardbg}
			h="100%"
			gap="18px"
			gridTemplateColumns={`repeat(${
				data?.columns?.length + 1
			}, minMax(300px, 30%))`}
			w="100%">
			{data?.columns?.map((col, i) => {
				function generateRandomColor() {
					const red = Math.floor(Math.random() * 256);
					const green = Math.floor(Math.random() * 256);
					const blue = Math.floor(Math.random() * 256);
					return `rgb(${red}, ${green}, ${blue})`;
				}

				const randomColor = generateRandomColor();
				return (
					<GridItem key={i} h="100%" padding="20px ">
						<Flex alignItems="center" gap="10px" mb="20px">
							<Box
								w="15px"
								height="15px"
								borderRadius="50%"
								bg={randomColor}></Box>

							<Heading fontSize="18px" color={boardColor}>
								{col?.name} {`(${col?.tasks?.length})`}
							</Heading>
						</Flex>
						<Box bg={col?.tasks?.length === 0 ? panelColor : "nonw"} h="100%">
							{col?.tasks?.map((task, j) => {
								const completedTask = task?.subtasks?.filter((t) => {
									if (t.isCompleted) {
										return true;
									} else {
										return false;
									}
								});
								return (
									<Button
										key={j}
										animation={animationIn}
										onClick={() =>
											handleTaskEdit({ index: i, id: j, title: task.title })
										}
										h="100px"
										w="100%"
										bg={boxPanel}
										color={boxColor}
										borderRadius="10px"
										boxShadow="0px 0px 30px 0.5px rgba(0, 0, 0, 0.1)"
										display="block"
										textAlign="left"
										mb="22px"
										whiteSpace="normal">
										<Box mb="3px" fontWeight="700" fontSize="14px">
											{task?.title}
										</Box>

										<Box
											as="span"
											fontSize="12px"
											fontWeight="800"
											color={subTaskColor}>
											subTasks {completedTask && completedTask?.length} of{" "}
											{task?.subtasks?.length}
										</Box>
									</Button>
								);
							})}
						</Box>
					</GridItem>
				);
			})}
			<GridItem>
				<Box mt="50px" h="100%" w="100%">
					<Button
						onClick={handleEdit}
						h="100%"
						fontSize="25px"
						fontWeight="800"
						textAlign="center"
						color={subTaskColor}
						w="100%"
						bg={panelColor}
						display="flex"
						alignItems="center"
						justifyContent="cemter">
						+ New Column
					</Button>
				</Box>
			</GridItem>
			<Modal
				isShowing={active}
				hide={() => setActive(false)}
				boardColor={boardColor}
				boardbg={boardbg}
				width="35%"
				render={(hide) => (
					<BoardModal
						index={index}
						cta="Update"
						boardColor={boardColor}
						heading="Edit Board"
						hide={hide}
						action={(data) => dispatch(editBoard(data))}
					/>
				)}
			/>
			<Modal
				width="30%"
				boardColor={boardColor}
				boardbg={boardbg}
				isShowing={edit}
				hide={() => setEdit(false)}
				render={(hide) => (
					<Task
						index={index}
						boardColor={boardColor}
						boardbg={boardbg}
						panelColor={panelColor}
						setEditModal={setEdit}
						columnId={columnId}
						id={id}
						hide={hide}
						columns={data.columns}
						action={(data) => dispatch(editBoard(data))}
					/>
				)}
			/>
		</Grid>
	);
}
Boards.propTypes = {
	data: PropTypes.any,
	index: PropTypes.number,
};
