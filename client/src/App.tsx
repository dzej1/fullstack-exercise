import { Outlet } from "react-router";
import { Header } from "./components/ui";

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
