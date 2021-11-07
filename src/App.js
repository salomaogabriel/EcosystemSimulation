import Grid from "./pages/grid/index";
import Clock from "./pages/clock/index";
function App() {
  return (
    <>
      <Clock timeDuration="10" />
      <Grid width="40" height="15" timeDuration="10" />
    </>
  );
}

export default App;
