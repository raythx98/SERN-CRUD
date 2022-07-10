import "./App.css";
import { useState } from "react";
import Axios from "axios";
import validator from 'validator'

function App() {
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [newLink, setNewLink] = useState("");
  const [visible, setVisible] = useState(true);
  const base_url = "https://urls.raythx.com/";

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
    if (!validator.isURL(link)) {
      setLinkError("Invalid URL");
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
          <p>{base_url}{newLink}</p>
        </div>
      )}
    </div>
  );
}

export default App;
