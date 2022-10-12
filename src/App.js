import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import Signup from "./Components/User/Pages/Signup/Signup";
import Login from "./Components/User/Pages/LogIn/Login";
import Home from "./Components/User/Pages/Home/Home";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import CategoryPage from "./Components/User/Pages/CategoryPage/CategoryPage";
import RecipePage from "./Components/User/Pages/RecipePage/RecipePage";
import UserProfile from "./Components/User/Pages/UserProfile/UserProfile";
import Layout from "./Components/User/Layout/Layout";
import AddRecipe from "./Components/Admin/AddRecipe/AddRecipe";
import AddCategory from "./Components/Admin/AddCategory/AddCategory";
import AddIngredient from "./Components/Admin/AddIngredient/AddIngredient";
import EditRecipe from "./Components/Admin/EditRecipe/EditRecipe";
import EditCategory from "./Components/Admin/EditCategory/EditCategory";
import EditIngredient from "./Components/Admin/EditIngredient/EditIngredient";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Redirect exact from="/" to="/login" />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/add-recipe" exact component={AddRecipe} />
          <Route path="/add-category" exact component={AddCategory} />
          <Route path="/add-ingredient" exact component={AddIngredient} />
          <Route path="/edit-recipe/:id" exact component={EditRecipe} />
          <Route path="/edit-category/:id" exact component={EditCategory} />
          <Route path="/edit-ingredient/:id" exact component={EditIngredient} />
          <Route path="/profile" exact component={UserProfile} />
          <Route path="/home" exact component={Home} />
          <Layout>
            <Route path="/recipes/:id" exact component={CategoryPage} />
            <Route path="/recipes/:cat/:id" exact component={RecipePage} />
          </Layout>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
