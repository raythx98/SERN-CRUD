import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("Error");
  const [newLink, setNewLink] = useState("");
  const [visible, setVisible] = useState(true);

  const displayInfo = () => {
    console.log(link);
  };

  const addLink = () => {
    setLinkError("");
    setVisible(true);
    if (link.length < 1) {
      setLinkError("Input link should not be empty");
      return;
    }
    setVisible(false);
    console.log(link);
    Axios.post("http://localhost:3001/getlink", { link: link }).then((res) => {
      console.log(res);
      setNewLink(res.data)    
    });
  };

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
        <div className="error">{linkError}</div>
        <button onClick={addLink}>Shorten URL</button>
      </div>
      {visible ? null : (
        <div className="newlink information">
          <label>Your shortened link is: </label>
          <p>{newLink}</p>
        </div>
      )}
    </div>
  );
}

export default App;
