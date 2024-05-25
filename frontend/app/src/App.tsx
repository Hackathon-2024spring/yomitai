import { CookiesProvider } from "react-cookie";
import RouterConfig from "./pages/RouterConfig";

function App() {
  return (
    <>
      <CookiesProvider>
        <RouterConfig />
      </CookiesProvider>
    </>
  );
}

export default App;
