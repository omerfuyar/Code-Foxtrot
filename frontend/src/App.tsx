import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// This is the main function component for your application.
function App() {
  // This line creates a state variable 'message'.
  // 'message' will hold our string from the backend,
  // and 'setMessage' is the function we use to update it.
  const [message, setMessage] = useState("");

  // This is a 'useEffect' hook. The code inside it runs after the component renders.
  // The empty array '[]' at the end means it will only run once, like 'componentDidMount'.
  useEffect(() => {
    // We use axios to make a GET request to our backend's API endpoint.
    axios
      .get("http://localhost:3001/api/hello")
      .then((response) => {
        // When the request is successful, we get a response. 
        // The actual data is in 'response.data'.
        // We then use 'setMessage' to update our state variable 
        // with the message from the backend.
        setMessage(response.data.message);
      })
      .catch((error) => {
        // If there's an error (e.g., the backend is not running), we log it to the console.
        console.error("There was an error fetching the data!", error);
      });
  }, []); // The empty dependency array ensures this effect runs only once.

  // This is the JSX that gets rendered to the screen.
  return (
    <div className="App">
      <header className="App-header">
        {/* We display the 'message' state variable here. It will be empty at first, then update to "Hello from the backend!" once the API call finishes. */}
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
