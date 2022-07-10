import "./App.css";
import { useState } from "react";
import Axios from 'axios';

function App() {
  const [link, setLink] = useState("");

  const displayInfo = () => {
    console.log(link);
  }
  const addLink = () => {
    console.log(link);
    Axios.post(
      'http://localhost:3001/getlink', {link: link}
    ).then((res) => console.log(res));
  }

  return (
    <div className="App">
      <div className="information">
        <label>Input Link:</label>
        <input
          type="link"
          onChange={(event) => {
            setLink(event.target.value);
          }}
        />
        <button onClick={addLink}>Shorten URL</button>
        <label>Shortened URL:</label>
      </div>
    </div>
  );
}

export default App;
