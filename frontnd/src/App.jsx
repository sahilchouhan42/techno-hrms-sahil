import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/routes/AppRoutes";

function App() {
  
  // const dummyUser = {
  //   id: 2,
  //   name: "Arvind Kumar",
  //   email: "Arvind.employee@example.com",
  //   role: "employee", // Employee role
  //   technoToken: "dummy-jwt-token-employee",
  // };
  // localStorage.setItem("technoUser", JSON.stringify(dummyUser));
  // localStorage.setItem("technoToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30");

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;


