import Data from "./Data";
import Navbar from "./Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="homeBase">
        <Data />
      </div>
    </>
  );
};

export default App;
