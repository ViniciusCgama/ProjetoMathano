import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Profile from "./components/pages/User/Profile";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Container from "./components/layouts/Container";
import Message from "./components/layouts/Message";

import { UserProvider } from "./context/UserContext";
import Posts from "./components/pages/Posts";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;