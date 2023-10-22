import "../css/App.css";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <div>
      <Header />
      <Main />

      <About />
      <Footer />
    </div>
  );
}

export default App;
