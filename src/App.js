import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Signup from "./Components/User/Signup/Signup";
import Login from "./Components/User/LogIn/Login";
import Home from "./Components/User/Home/Home";
import CategoryPage from "./Components/User/CategoryPage/CategoryPage";
import { AuthProvider } from "./Contexts/AuthContext";
// import { WishlistProvider } from "./Contexts/WishlistContext";
import RecipePage from "./Components/User/RecipePage/RecipePage";
// import WishlistPage from "./Components/User/WishlistPage/WishlistPage";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Redirect exact from="/" to="login" />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
          </Switch>
          {isLoggedIn !== null ? (
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/recipes/:id" exact component={CategoryPage} />
              <Route path="/recipes/:cat/:id" exact component={RecipePage} />
              {/* <Route path="/wishlist" exact component={WishlistPage} /> */}
            </Switch>
          ) : (
            <Redirect to="/login" />
          )}
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
