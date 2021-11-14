import Grid from "./pages/grid/index";
import Clock from "./pages/clock/index";
import Fox from "./assets/fox.svg";
function App() {
  return (
    <>
      <img src={Fox} />
      <Clock timeDuration="60" />
      <Grid width="40" height="15" timeDuration="60" rabits="5" foxes="1" />
    </>
  );
}

export default App;
