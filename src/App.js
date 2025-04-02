import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { isLoggedIn } from "./utils/utility";
import Footer from "./components/footer";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Services from "./components/services";
import AddServices from "./components/services/addservice";
import ListServices from "./components/services/listservices";
import EditService from "./components/services/editservice";
import ViewService from "./components/services/viewservice";
import NavBarAfterLogin from "./components/NavBarAfterLogin";
import Dashboard from "./components/Dashboard";
import BookAppointment from "./components/Appointment/bookappointment";
import AppointmentRequest from "./components/Appointment/apointmentrequests";


const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/sign-in" replace={true} />;
};

const PublicRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/" replace={true} /> : children;
};

function App() {
  return (
    <div className="App">
      <div>
        <NavBarAfterLogin />
      </div>
      <div className="">
        <Routes>
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/sign-in"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/sign-up"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/services"
            element={
              <PrivateRoute>
                <Services />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/addservice"
            element={
              <PrivateRoute>
                <AddServices />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/listservices"
            element={
              <PrivateRoute>
                <ListServices />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/service/:id/edit"
            element={
              <PrivateRoute>
                <EditService />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/service/:id"
            element={
              <PrivateRoute>
                <ViewService />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/service/:id/book-appointment"
            element={
              <PrivateRoute>
                <BookAppointment />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/appointmentrequests"
            element={
              <PrivateRoute>
                <AppointmentRequest />
              </PrivateRoute>
            }
          />

        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;

