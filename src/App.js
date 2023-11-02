import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Award from "./pages/Award";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/award" element={<Award />} />
      </Routes>
    </Router>
  );
}

export default App;
