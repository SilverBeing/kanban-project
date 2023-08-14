import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useRef } from "react";
import { keyframes, usePrefersReducedMotion } from "@chakra-ui/react";

import PropTypes from "prop-types";
import useOnClickOutside from "../hooks/useOnClickOutside";

export default function Modal({
	render,
	isShowing,
	hide,
	heading,
	width = "auto",
	boardbg,
	boardColor,
}) {
	const pop = keyframes`
	0% {
		transform: scale(0);
	}

	100% {
		transform: scale(1);
	}

`;
	const prefersReducedMotion = usePrefersReducedMotion();
	const animationIn = prefersReducedMotion
		? undefined
		: `${pop} 700ms ease 0s 1 normal both`;
	const modalRef = useRef();

	return (
		<>
			{isShowing &&
				createPortal(
					<Box
						h="100vh"
						bg="#00000040"
						w="100%"
						position="fixed"
						inset="0"
						display="flex"
						zIndex="50000"
						overflow="auto"
						alignItems="center">
						<Box
							bg={boardbg}
							margin="auto"
							h="auto"
							animation={animationIn}
							w={{ base: "95%", md: width }}
							color={boardColor}
							borderRadius="8px"
							boxShadow="0px 8.228571891784668px 41.14286422729492px 0px #0000001A"
							transition="0.5s ease-in-out"
							padding={{ base: "20px", lg: "30px 40px" }}>
							<Flex
								justify="space-between"
								alignItems="center"
								paddingBottom="10px">
								<Heading
									fontSize={{ base: "18px", lg: "20px" }}
									fontWeight="700">
									{heading}
								</Heading>
								<Button
									onClick={hide}
									colorScheme="none"
									bg="none"
									color={boardColor}>
									<AiOutlineClose />
								</Button>
							</Flex>
							<Box>{render(hide)}</Box>
						</Box>
					</Box>,
					document.body
				)}
		</>
	);
}
Modal.propTypes = {
	render: PropTypes.func.isRequired,
	isShowing: PropTypes.bool.isRequired,
	hide: PropTypes.func.isRequired,
	heading: PropTypes.string,
	width: PropTypes.any,
	modalRef: PropTypes.any,
};
