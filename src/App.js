import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import PrinciplePage from "./components/PrinciplePage";
import TeacherPage from "./components/TeacherPage";
import StudentPage from "./components/StudentPage";

const App = () => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div className="h-screen w-screen bg-mainBackgroundColor">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute
            path="/principle/:principleId"
            component={PrinciplePage}
          />
          <PrivateRoute path="/teacher/:teacherId" component={TeacherPage} />
          <PrivateRoute path="/student/:studentId" component={StudentPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
