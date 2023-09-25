import { useState } from "react";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Nf from "./features/post/Nf";
import LogIn from "./features/auth/LogIn";
import Register from "./features/auth/Register";
import UserPost from "./features/user/UserPost";
import Persist from "./components/Persist";
import AddPost from "./features/post/AddPost";
import SearchUser from "./features/user/SearchUser";
import PrivatePersist from "./components/PrivatePersist";
import Personal from "./features/user/Personal";
import EditInfo from "./features/auth/EditInfo";
import { loader as logLoader } from "./features/auth/LogIn";
import Account from "./features/user/Account";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/*   PUBLIC  */}
        <Route path="/login" element={<LogIn />} loader={logLoader} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivatePersist />}>
          <Route element={<Persist />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Nf />} />
              <Route path="/:id" element={<UserPost />} />

              <Route path="/addpost" element={<AddPost />} />
              <Route path="/search" element={<SearchUser />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/editinfo" element={<EditInfo />} />
              <Route path="/account" element={<Account />} />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
