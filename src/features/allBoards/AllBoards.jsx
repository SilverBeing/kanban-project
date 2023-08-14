import { useDispatch } from "react-redux";
import { addBoard, addTasks, editBoard, filterBoard } from "./allBoardsSlice";
import { resetAll, updateAll } from "../board/boardSlice";
import { useState, useEffect, useRef } from "react";
import {
	Flex,
	Stack,
	Button,
	Box,
	Heading,
	useColorMode,
	useColorModeValue,
	Switch,
	Text,
	HStack,
} from "@chakra-ui/react";
import BoardModal from "../board/boardModal";
import Boards from "./Boards";
import TaskModal from "../Tasks/TaskModal";
import Modal from "../../modals";
import PropTypes from "prop-types";
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
	MdOutlineSpaceDashboard,
} from "react-icons/md";
import { logoDark, logoLight, mobileLogo } from "../../images";
import { FaPlus, FaSun } from "react-icons/fa";
import { GiMoon } from "react-icons/gi";
import { SlOptionsVertical } from "react-icons/sl";
import { resetTasks } from "../Tasks/TaskSlice";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function AllBoards({ allBoardCreated }) {
	const { colorMode, toggleColorMode } = useColorMode();
	const boardbg = useColorModeValue("brandBoardLight", "brandBoardDark");
	const boardColor = useColorModeValue(
		"brandBoardColorLight",
		"brandBoardColorDark"
	);
	const panelColor = useColorModeValue("brandPanelLight", "brandPanelDark");
	const menuBg = useColorModeValue("brandMenuLight", " brandMenuDark");
	const iconColor = useColorModeValue("#828FA3", "#768295");
	const menuColor = useColorModeValue("brandMenuColorLight", "#828FA3");
	const logo = useColorModeValue(logoLight, logoDark);
	const borderLine = useColorModeValue("#EAF0FA", "#82837D");
	const [active, setActive] = useState(false);
	const [editBoardTable, setEditBoard] = useState(false);
	const dispatch = useDispatch();
	const [boards, setBoards] = useState();
	const [add, setAdd] = useState(false);
	const [dropdown, setDropDown] = useState(false);

	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const [activeCategory, setActiveCategory] = useState(
		allBoardCreated[0]?.name
	);
	const boardNames = allBoardCreated?.map((board) => board.name);

	const handleFilter = (category, index) => {
		const result = allBoardCreated?.find((board) => board.name === category);
		setBoards(result);
		setActiveCategory(category);
		setIndex(index);
		setOpen(false);
	};
	const handleEdit = () => {
		setEditBoard(true);
		dispatch(updateAll(boards));
	};
	const handleNewTask = () => {
		setActive(true);
		dispatch(resetTasks());
	};
	useEffect(() => {
		setBoards(allBoardCreated[index]);
	}, [allBoardCreated, index]);
	const handleNewBoard = () => {
		setAdd(true);
		dispatch(resetAll());
	};
	const dropDownRef = useRef();
	const [ref] = useOnClickOutside(dropDownRef, () => setDropDown(false));

	return (
		<Box w="100%">
			<Modal
				width="35%"
				boardColor={boardColor}
				boardbg={boardbg}
				isShowing={add}
				hide={() => setAdd(false)}
				render={(hide) => (
					<BoardModal
						boardColor={boardColor}
						hide={hide}
						index={index}
						action={(data) => dispatch(addBoard(data))}
					/>
				)}
			/>
			<Flex w="100%" gap="20px" position="relative">
				<Stack
					borderRight={`1px solid ${borderLine}`}
					display={{ base: open ? "block" : "none", md: "block" }}
					w={{ base: "100%", md: "20%" }}
					top={{ base: "100px", md: "0" }}
					zIndex={{ base: "4000", md: "" }}
					paddingTop="30px"
					position={{ base: "absolute", md: "fixed" }}
					left="0"
					h="100vh"
					bg={menuBg}
					paddingRight="20px">
					<Box padding="0 30px 40px" display={{ base: "none", md: "block" }}>
						<img src={logo} alt="" />
					</Box>
					<Box padding="0 30px" mt="15px">
						<Text
							letterSpacing="2px"
							fontSize="14px"
							mb="10px"
							color={menuColor}
							fontWeight="800">
							ALL BOARDS {`(${allBoardCreated.length})`}
						</Text>
					</Box>
					{boardNames.map((boardName, i) => (
						<Button
							display="block"
							h="50px"
							paddingLeft="30px"
							borderTopLeftRadius="0px"
							borderBottomLeftRadius="0px"
							borderTopRightRadius="40px"
							borderBottomEndRadius="40px"
							leftIcon={<MdOutlineSpaceDashboard />}
							textAlign="left"
							w="100%"
							key={boardName}
							color={activeCategory === boardName ? "white" : menuColor}
							bg={activeCategory === boardName ? "#635FC7" : menuBg}
							onClick={() => handleFilter(boardName, i)}>
							{boardName}
						</Button>
					))}

					<Button
						display="block"
						h="50px"
						paddingLeft="30px"
						borderTopLeftRadius="0px"
						borderBottomLeftRadius="0px"
						borderTopRightRadius="40px"
						borderBottomEndRadius="40px"
						w="100%"
						color={menuColor}
						textAlign="left"
						_hover={{ backgroundColor: "#635FC7", color: "white" }}
						leftIcon={<MdOutlineSpaceDashboard />}
						onClick={handleNewBoard}>
						+ Create Board
					</Button>
					<Box paddingLeft="20px" mt="200px" mb="100px">
						<Flex
							justify="center"
							alignItems="center"
							gap="20px"
							w="100%"
							bg={panelColor}
							padding="20px"
							borderRadius="8px">
							<FaSun style={{ color: iconColor, fontSize: "16px" }} />

							<Switch
								size="md"
								colorScheme="purple"
								isChecked={colorMode === "dark"}
								onChange={toggleColorMode}
							/>
							<GiMoon style={{ color: iconColor, fontSize: "16px" }} />
						</Flex>
					</Box>
				</Stack>
				<Box
					w={{ base: "100%", md: "80%" }}
					position="fixed"
					minHeight="100vh"
					alignItems="center"
					height="100%"
					right="0"
					bg={menuBg}
					color={menuColor}>
					<Flex justify="space-between" padding="20px">
						<HStack>
							<Box display={{ base: "block", md: "none" }}>
								<img src={mobileLogo} alt="" />
							</Box>
							<Box display={{ base: "none", md: "block" }}>
								<Heading>{boards?.name}</Heading>
							</Box>
							<Button
								colorScheme="none"
								color="black"
								display={{ base: "inline-flex", md: "none" }}
								onClick={() => setOpen(!open)}>
								{boards?.name}
								{open ? (
									<MdOutlineKeyboardArrowUp />
								) : (
									<MdOutlineKeyboardArrowDown />
								)}
							</Button>
						</HStack>
						<Flex alignItems="center" gap={{ base: "5px", md: "24px" }}>
							<Button
								onClick={handleNewTask}
								bg="#635FC7"
								padding={{ base: "none", md: "" }}
								color="white"
								w={{ base: "50px", md: "150px" }}
								fontWeight="800"
								height={{ base: "50px", md: "50px" }}
								fontSize="12px"
								borderRadius={{ base: "50%", md: "35px" }}>
								<FaPlus />
								<Box as="span" display={{ base: "none", md: "block" }}>
									Add New Task
								</Box>
							</Button>
							<Box position="relative">
								<Button
									colorScheme="none"
									color={menuColor}
									onClick={() => setDropDown(!dropdown)}>
									<SlOptionsVertical />
								</Button>
								{dropdown && (
									<Stack
										ref={ref}
										position="absolute"
										boxShadow="0px 0px 60px 5px rgba(0, 0, 0, 0.2)"
										top="60px"
										w="150px"
										right="5px"
										bg={menuBg}
										textAlign="left"
										color={menuColor}
										zIndex="8000"
										padding="6px">
										<Button
											fontSize="12px"
											display="block"
											w="100%"
											textAlign="left"
											size="sm"
											onClick={handleEdit}
											colorScheme="none"
											color={boardColor}>
											Edit Board
										</Button>
										<Button
											fontSize="12px"
											colorScheme="none"
											display="block"
											w="100%"
											textAlign="left"
											size="sm"
											color="red.400"
											onClick={() => dispatch(filterBoard(index))}>
											Delete Board
										</Button>
									</Stack>
								)}
							</Box>
						</Flex>
					</Flex>
					<Boards
						data={boards}
						index={index}
						boardColor={boardColor}
						boardbg={boardbg}
					/>
				</Box>

				<Modal
					width="35%"
					boardColor={boardColor}
					boardbg={boardbg}
					isShowing={active}
					hide={() => setActive(false)}
					render={(hide) => (
						<TaskModal
							index={index}
							columns={boards.columns}
							hide={hide}
							boardColor={boardColor}
							action={(data) => dispatch(addTasks(data))}
						/>
					)}
				/>
				<Modal
					isShowing={editBoardTable}
					hide={() => setEditBoard(false)}
					boardColor={boardColor}
					boardbg={boardbg}
					width="35%"
					render={(hide) => (
						<BoardModal
							boardColor={boardColor}
							index={index}
							hide={hide}
							cta="Update Board"
							heading="Edit Board"
							action={(data) => dispatch(editBoard(data))}
						/>
					)}
				/>
			</Flex>
		</Box>
	);
}
AllBoards.propTypes = {
	allBoardCreated: PropTypes.any,
};
