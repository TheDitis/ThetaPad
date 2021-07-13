/** App.tsx
 * @file The root component of the ThetaPad app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import './App.css';
import ThetaPad from "../ThetaPad/ThetaPad";

const App = () => {
  return (
      <div className="App">
        <ThetaPad/>
      </div>
  );
}

export default App;
