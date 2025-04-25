import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import UserProfiles from "./pages/UserProfiles";
import Alerts from "./pages/Alerts";
import LineChart from "./pages/Charts/LineChart";
import Room1 from "./pages/Rooms/Room1";
import Room2 from "./pages/Rooms/Room2";
import RLLogs from "./components/IALogs/RlLogs";
import FaceRecognitionLogs from "./components/IALogs/FaceRecognitionLogs";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ModelSettings from "./pages/ModelSettings";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* Tables */}
            <Route path="/Tables/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            {/* Charts */}
            <Route path="/Charts/line-chart" element={<LineChart />} />
            {/* Rooms */}
            <Route path="/Room1" element={<Room1 />} />
            <Route path="/Room2" element={<Room2 />} />
            {/*IALogs*/}
            <Route path="/IALogs/RlLogs" element={<RLLogs />} />
            <Route path="/IALogs/FaceRecognitionLogs" element={<FaceRecognitionLogs />} />

          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/*Settings*/}
          <Route path="/ModelSettings" element={<ModelSettings />} />

        </Routes>
      </Router>
    </>
  );
}
