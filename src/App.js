import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import Signup from "./Components/User/Pages/Signup/Signup";
import Login from "./Components/User/Pages/LogIn/Login";
import Home from "./Components/User/Pages/Home/Home";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import CategoryPage from "./Components/User/Pages/CategoryPage/CategoryPage";
import RecipePage from "./Components/User/Pages/RecipePage/RecipePage";
import UserProfile from "./Components/User/Pages/UserProfile/UserProfile";
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
          <Routes>
            <Route
              path="/recipes-app/"
              element={<Navigate replace to="/recipes-app/login" />}
            />
            <Route path="/recipes-app/signup" element={<Signup />} />
            <Route path="/recipes-app/login" element={<Login />} />
            <Route path="/recipes-app/home" element={<Home />} />
            <Route path="/recipes-app/recipes/:id" element={<CategoryPage />} />
            <Route
              path="/recipes-app/recipes/:cat/:id"
              element={<RecipePage />}
            />
            <Route path="/recipes-app/dashboard" element={<Dashboard />} />
            <Route path="/recipes-app/add-recipe" element={<AddRecipe />} />
            <Route path="/recipes-app/add-category" element={<AddCategory />} />
            <Route
              path="/recipes-app/add-ingredient"
              element={<AddIngredient />}
            />
            <Route
              path="/recipes-app/edit-recipe/:id"
              element={<EditRecipe />}
            />
            <Route
              path="/recipes-app/edit-category/:id"
              element={<EditCategory />}
            />
            <Route
              path="/recipes-app/edit-ingredient/:id"
              element={<EditIngredient />}
            />
            <Route path="/recipes-app/profile" element={<UserProfile />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
