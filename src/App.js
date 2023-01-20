import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
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
import ProtectedAdminRoutes from "./Utils/ProtectedAdminRoutes";
import ProtectedUserRoutes from "./Utils/ProtectedUserRoutes";
import WishlistPage from "./Components/User/Pages/WishlistPage/WishlistPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedUserRoutes redirectPath="/login">
                <Home />
              </ProtectedUserRoutes>
            }
          />
          <Route
            path="/recipes/:id"
            element={
              <ProtectedUserRoutes redirectPath="/login">
                <CategoryPage />
              </ProtectedUserRoutes>
            }
          />
          <Route
            path="/recipes/:cat/:id"
            element={
              <ProtectedUserRoutes redirectPath="/login">
                <RecipePage />
              </ProtectedUserRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedUserRoutes redirectPath="/login">
                <UserProfile />
              </ProtectedUserRoutes>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedUserRoutes redirectPath="/login">
                <WishlistPage />
              </ProtectedUserRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedAdminRoutes redirectPath="/home">
                <Dashboard />
              </ProtectedAdminRoutes>
            }
          />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/add-ingredient" element={<AddIngredient />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/edit-ingredient/:id" element={<EditIngredient />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
