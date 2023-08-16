import "./App.css";
import Navbar from "./Components/Body/Navbar";
import NotificationBar from "./Components/Body/NotificationBar";
import Sidebar from "./Components/Body/Sidebar";
import Main from "./Components/Main";
import Footer from "./Components/Body/Footer";

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <NotificationBar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
