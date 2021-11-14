import Grid from "./pages/grid/index";
import Clock from "./pages/clock/index";
function App() {
  return (
    <>
      <Clock timeDuration="60" />
      <Grid width="40" height="15" timeDuration="60" rabits="5" foxes="0" />
    </>
  );
}

export default App;
