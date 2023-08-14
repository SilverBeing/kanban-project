import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
	Box,
	Heading,
	FormControl,
	Input,
	Button,
	FormLabel,
	Textarea,
	Select,
  Flex,
} from "@chakra-ui/react";
import {
	addSubtask,
	description,
	removeSubtask,
	resetTasks,
	selectTask,
	setDescription,
	setStatus,
	setSubtask,
	setTitle,
	status,
	subtasks,
	title,
} from "./TaskSlice";
import { AiOutlineClose } from "react-icons/ai";


export default function TaskModal({ index, action, columns, hide,cta="Add new task", boardColor, heading="Add new task" }) {
	const dispatch = useDispatch();
	const task_title = useSelector(title);
	const task_description = useSelector(description);
	const task_status = useSelector(status);
	const task_subtasks = useSelector(subtasks);
  const select_task= useSelector(selectTask)
  const handleSubmit = (e) => {
    e.preventDefault()
    action({index: index, secondIndex: task_status, data: select_task})
		dispatch(resetTasks())
		hide()
  }
	return (
		<Box>
			<Heading fontSize="18px" mb="20px">
				{heading}
			</Heading>
			<form onSubmit={handleSubmit}>
				<FormControl mb="10px">
					<FormLabel fontSize="12px" fontWeight="800">Title</FormLabel>
					<Input
						placeholder="Self Care"
							fontSize="14px"
						_placeholder={{ fontSize: "10px" }}
						value={task_title}
						onChange={(e) => dispatch(setTitle(e.target.value))}
					/>
				</FormControl>
				<FormControl mb="10px">
					<FormLabel fontSize="12px" fontWeight="800">Description</FormLabel>
					<Textarea
						fontSize="14px"
						placeholder="It's always good to take a break and recharge a litle"
						rows={3}
						_placeholder={{ fontSize: "10px" }}
						value={task_description}
						onChange={(e) => dispatch(setDescription(e.target.value))}
					/>
				</FormControl>
				<Box>
					<FormControl mb="10px">
						<FormLabel fontSize="12px" fontWeight="800">Subtasks</FormLabel>
						{task_subtasks.map((sub, i) => (
							<Flex key={i} mb="5px">
								<Input
									fontSize="14px"
									placeholder="e.g Make my bed"
									_placeholder={{ fontSize: "10px" }}
									value={sub.title}
									onChange={(e) =>
										dispatch(
											setSubtask({ index: i, data: { title: e.target.value } })
										)
									}
								/>
								<Button
									color={boardColor}
									colorScheme="none"
									onClick={() => dispatch(removeSubtask(i))}>
									<AiOutlineClose />
								</Button>
							</Flex>
						))}
					</FormControl>
					<Button
						bg="brandPurple"
						color="white"
						borderRadius="20px"
						w="100%"
						m="20px 0"
						onClick={() => dispatch(addSubtask())}>
						Add New Subtask
					</Button>
				</Box>
				<FormControl>
					<Select
						value={task_status}
						placeholder="Status"
						fontSize="12px"
						_placeholder={{ fontSize: "10px" }}
						onChange={(e) => dispatch(setStatus(e.target.value))}>
						{columns.map((col) => (
							<option value={col.name} key={col.name}>
								{col.name}
							</option>
						))}
					</Select>
				</FormControl>
				<Button
					bg="brandPurple"
					color="white"
					borderRadius="20px"
					w="100%"
					m="20px 0"
					type="submit">
					{cta}
				</Button>
			</form>
		</Box>
	);
}
TaskModal.propTypes = {
	index: PropTypes.number,
	action: PropTypes.func,
	columns: PropTypes.array,
	hide: PropTypes.func
};
