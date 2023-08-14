import { extendTheme} from "@chakra-ui/react";
const config= {
	initialColorMode: "dark", // 'dark' | 'light'
	useSystemColorMode: false,
};
export const theme = extendTheme({
	colors: {
		brandBoardLight: "#F4F7FD",
		brandBoardDark: "#20212C",
		brandMenuDark: "#2B2C37",
		brandMenuLight: "#ffffff",
		brandBoardColorLight: "#000000",
		brandBoardColorDark: "#ffffff",
		brandMenuColorLight: "#000000",
		brandPurple: "#635FCF",
		brandPanelDark: "#23242F",
		brandPanelLight: "#EAF0FA",
	},
	styles: {
		global: {
			body: {
				fontSize: "14px",
				fontWeight: 400,
				color: "#1C1F47",
				backgroundColor: "#fff",
				fontFamily: "'Roboto', sans-serif",
			},
		},
	},
	config,
});
