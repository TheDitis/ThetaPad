/** App.tsx
 * @file The root component of the ThetaPad app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import './App.css';
import ThetaPad from "../ThetaPad/ThetaPad";
import Navbar from "../Navbar/Navbar";

const App = () => {
  return (
      <div className="App">
          <Navbar/>
          <ThetaPad/>
      </div>
  );
}

export default App;
