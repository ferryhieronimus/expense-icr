import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import ExpenseDetail from "./pages/ExpenseDetail";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/:id' element={<ExpenseDetail />} />
    </Route>
  )
);

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        ellipsis: {
          backgroundColor: "#FFF",
          borderRadius: "4px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
