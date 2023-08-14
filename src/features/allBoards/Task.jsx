import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	Heading,
	Select,
	Stack,
	Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
	addTasks,
	editColumnName,
	editTask,
	editTaskColName,
	editTaskStatus,
	filterTask,
} from "./allBoardsSlice";
import { useState } from "react";
import { selectTask, setStatus, setSubtask } from "../Tasks/TaskSlice";
import Modal from "../../modals";
import TaskModal from "../Tasks/TaskModal";

export default function Task({
	columns,
	columnId,
	id,
	panelColor,
	index,
	hide,
	boardbg,
	boardColor,
	setEditModal,
}) {
	const data = useSelector(selectTask);

	const col = data.status;

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			filterTask({ index: index, columnId: columnId, secondIndex: col, id: id })
		);
		dispatch(addTasks({ index: index, secondIndex: data.status, data: data }));
		hide();
	};

	const [active, setActive] = useState(false);
	const [edit, setEditTask] = useState(false);
	const action = (data) => {
		dispatch(
			filterTask({
				index: index,
				columnId: columnId,
				secondIndex: col,
				id: id,
			})
		);
		dispatch(addTasks(data));
		hide();
	};

	const handleActive = (e) => {
		e.stopPropagation();
		setEditTask(true);
	};
	const handleDelete = () => {
		hide();
		dispatch(
			filterTask({
				index: index,
				columnId: columnId,
				secondIndex: col,
				id: id,
			})
		);
	};
	const completedTask = data?.subtasks?.filter((t) => {
		if (t.isCompleted) {
			return true;
		} else {
			return false;
		}
	});
	const dispatch = useDispatch();
	return (
		<Box>
			<Flex justify="space-between" mb="25px" alignItems="center">
				<Heading fontSize="16px" w="70%">
					{data?.title}
				</Heading>
				<Box position="relative">
					<Button
						colorScheme="none"
						color={boardColor}
						onClick={() => setActive(!active)}>
						<SlOptionsVertical />
					</Button>
					{active && (
						<Stack
							position="absolute"
							bg={boardbg}
							zIndex="2"
							right="0"
							boxShadow="0px 0px 60px 5px rgba(0, 0, 0, 0.2)"
							top="50px"
							w="150px">
							<Button
								colorScheme="none"
								display="block"
								textAlign="left"
								fontSize="14px"
								color={boardColor}
								onClick={handleActive}>
								Edit Task
							</Button>
							<Button
								colorScheme="none"
								display="block"
								textAlign="left"
								fontSize="14px"
								color="red.00"
								onClick={handleDelete}>
								Delete Task
							</Button>
						</Stack>
					)}
				</Box>
			</Flex>
			<Box mb="25px" fontSize="14px">
				<Text>{data?.description}</Text>
			</Box>
			<form onSubmit={handleSubmit}>
				<Box mb="25px">
					<Text fontSize="14px" mb="10px">
						Subtasks{" "}
						{`(${completedTask && completedTask.length} of  ${
							data?.subtasks?.length
						})`}
					</Text>
					{data.subtasks.map((task, i) => (
						<FormControl
							key={i}
							mb="8px"
							fontSize="12px"
							p="5px"
							bg={panelColor}>
							<Checkbox
								isChecked={task.isCompleted === true}
								onChange={(e) =>
									dispatch(
										setSubtask({
											index: i,
											data: { isCompleted: e.target.checked },
										})
									)
								}>
								<Text
									fontSize="12px"
									textDecorationThickness="20px"
									opacity={task.isCompleted ? "0.6" : "1"}
									textDecoration={task.isCompleted ? "line-through" : "none"}>
									{task.title}
								</Text>
							</Checkbox>
						</FormControl>
					))}
				</Box>
				<FormControl isRequired>
					<Select
						bg={boardbg}
						value={data.status}
						fontSize="14px"
						placeholder="Select Status"
						onChange={(e) => dispatch(setStatus(e.target.value))}>
						{columns?.map((col, i) => (
							<option value={col.name} key={i}>
								{col.name}
							</option>
						))}
					</Select>
				</FormControl>
				<Button type="submit" w="100%" color="white" bg="brandPurple" mt="20px">
					Save Changes
				</Button>
			</form>
			<Modal
				isShowing={edit}
				boardColor={boardColor}
				width="40%"
				boardbg={boardbg}
				hide={() => setEditTask(false)}
				render={(hide) => (
					<TaskModal
						action={action}
						index={index}
						columns={columns}
						hide={hide}
					/>
				)}
			/>
		</Box>
	);
}
Task.propTypes = {
	data: PropTypes.object,
	columns: PropTypes.array,
	columnId: PropTypes.number,
	index: PropTypes.number,
	id: PropTypes.number,
};
