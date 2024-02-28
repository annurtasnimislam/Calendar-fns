import Calendar from "./components/Calendar";

const App = () => {
  const currentDate = new Date();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Calendar currentDate={currentDate} />
    </div>
  );
};

export default App;
