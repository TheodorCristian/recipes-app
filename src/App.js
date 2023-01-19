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
import ProtectedRoute from "./Utils/ProtectedRoute";
import WishlistPage from "./Components/User/Pages/WishlistPage/WishlistPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/recipes-app/"
            element={<Navigate replace to="/recipes-app/login" />}
          />
          <Route path="/recipes-app/signup" element={<Signup />} />
          <Route path="/recipes-app/login" element={<Login />} />
          <Route
            path="/recipes-app/home"
            element={
              <ProtectedRoute
                isAllowed={!!JSON.parse(sessionStorage.getItem("user"))}
                redirectPath="/recipes-app/login"
              >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes-app/recipes/:id"
            element={
              <ProtectedRoute
                isAllowed={!!JSON.parse(sessionStorage.getItem("user"))}
                redirectPath="/recipes-app/login"
              >
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes-app/recipes/:cat/:id"
            element={
              <ProtectedRoute
                isAllowed={!!JSON.parse(sessionStorage.getItem("user"))}
                redirectPath="/recipes-app/login"
              >
                <RecipePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes-app/profile"
            element={
              <ProtectedRoute
                isAllowed={!!JSON.parse(sessionStorage.getItem("user"))}
                redirectPath="/recipes-app/login"
              >
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes-app/wishlist"
            element={
              <ProtectedRoute
                isAllowed={!!JSON.parse(sessionStorage.getItem("user"))}
                redirectPath="/recipes-app/login"
              >
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes-app/dashboard"
            element={
              <ProtectedRoute
                isAllowed={
                  !!JSON.parse(sessionStorage.getItem("user")) &&
                  sessionStorage.getItem("isAdmin")
                }
                redirectPath="/recipes-app/home"
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/recipes-app/add-recipe" element={<AddRecipe />} />
          <Route path="/recipes-app/add-category" element={<AddCategory />} />
          <Route
            path="/recipes-app/add-ingredient"
            element={<AddIngredient />}
          />
          <Route path="/recipes-app/edit-recipe/:id" element={<EditRecipe />} />
          <Route
            path="/recipes-app/edit-category/:id"
            element={<EditCategory />}
          />
          <Route
            path="/recipes-app/edit-ingredient/:id"
            element={<EditIngredient />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
