import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "./firebase";
import "./App.css";
import GoogleIcon from "@mui/icons-material/Google";

const auth = getAuth();
function App() {
  console.log(auth);
  const handleGoogleAuth = async () => {
    signInWithPopup(auth, provider);
  };
  return (
    <>
      <div className="container">
        <button className="googlBtn" onClick={handleGoogleAuth}>
          <GoogleIcon />
          Google
        </button>
        <div className="box">
          <button className="btnSignout">Logout</button>
          <div className="messageContainer"></div>
          <form className="messageForm">
            <div>
              <input type="text" placeholder="Enter a message..." />
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
