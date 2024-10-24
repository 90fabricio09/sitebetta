import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Ticket from './components/Ticket.jsx'

const App = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Ticket />
            <Footer />
        </>
    );
};

export default App;
