import "../css/App.css";
import Main from "./Main";
import About from "./About";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Set-up of the entire page 
function App() {
  return (
    <div className="bg-[#FDFAF3]">
      <Main />
      <About />
    </div>
  );
}

export default App;
