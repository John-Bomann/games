import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Clocks from "./Clock/Clocks";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Tables from "./Tables/Tables";
import * as Realm from "realm-web";
import { useEffect } from "react";

const app = new Realm.App({ id: "website-alwra" });

function App() {
  useEffect(() => {
    const login = async () => {
      await app.logIn(Realm.Credentials.anonymous());
      // const response = await clocks.findOne({});
      // console.log(response);
    };
    login();
  }, []);
  const mongo = app.currentUser.mongoClient("Website");
  const clocks = mongo.db("Website").collection("Clocks");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Dashboard />} />
          <Route path="clocks" element={<Clocks />} />
          <Route path="tables" element={<Tables />} />
          <Route path="*" element={<div>No Match</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
