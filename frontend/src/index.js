import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import ChatProvider from './Context/ChatProvider';

const theme = extendTheme({
  config: {
    initialColorMode: "light", // Set default color mode to light
    useSystemColorMode: false, // Disable system color mode preference
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "white" : "gray.800", // Background color for light/dark mode
        color: props.colorMode === "light" ? "black" : "white", // Text color for light/dark mode
      },
    }),
  },
});

// Save the color mode in localStorage
if (typeof window !== "undefined") {
  const colorMode = localStorage.getItem("chakra-ui-color-mode") || "light";
  theme.config.initialColorMode = colorMode;
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChatProvider >
  <ChakraProvider theme={theme}>
  <BrowserRouter>

    <App />

  </BrowserRouter>
  </ChakraProvider>
  </ChatProvider>
);

