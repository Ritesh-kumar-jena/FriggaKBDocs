import React from "react";
import {Route , Routes} from  'react-router-dom';
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import CreateDocument from "../pages/CreateDocument";
import EditDocument from "../pages/EditDocument";
import MyDocuments from "../pages/MyDocuments";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/mydocuments" element={<MyDocuments/>}/>
        <Route path="/createdocument" element={<CreateDocument/>}/>
        <Route path="/editdocument" element={<EditDocument/>}/>
        <Route path="/searchpage" element={<SearchPage/>}/>
        <Route path="/profilepage" element={<ProfilePage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}


export default AllRoutes;