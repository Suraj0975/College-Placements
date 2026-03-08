import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import AddPlacement from "./pages/AddPlacement";
import EditPlacement from "./pages/EditPlacement";
function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPlacement />} />
        <Route path="/edit/:id" element={<EditPlacement />} />
      </Routes>
    </>
  );
}

export default App;