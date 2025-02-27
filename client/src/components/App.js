import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Article from "./Article";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      {/* <Header user={user} onLogout={setUser} /> */}
      <Switch>
        <Route exact path="/articles/:id">
          <Article />
        </Route>
        <Route exact path="/login">
          <Login onLogin={handleLogin} />
          {/* <Login onLogin={setUser} /> */}
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
