import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditProfile from "./features/user/EditProfile";
import ViweProfile from "./features/user/ViweProfile";
import PhoneSingUp from "./layouts/PhoneSingUp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />

        <Routes>
          <Route index element={<Home />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile" element={<ViweProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/phonesignup" element={<PhoneSingUp />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
