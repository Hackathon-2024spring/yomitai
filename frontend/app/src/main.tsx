import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BookProvider } from "./contexts/bookContext";

// React18での正しいレンダリングの記述に変更
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <BookProvider>
    <App />
  </BookProvider>
);
