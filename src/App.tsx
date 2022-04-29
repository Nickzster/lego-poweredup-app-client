import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <div
      className='App'
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MainScreen />
    </div>
  );
}

export default App;
