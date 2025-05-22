import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { db, provider } from "./firebase";
import "./App.css";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";

const auth = getAuth();
function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  const handleGoogleAuth = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);
    } catch (error) {
      toast.error("Google sign-in error:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "messages"), {
        uid: user?.uid,
        photoURL: user.photoURL,
        message,
        createdAt: Date.now(),
      });
      setMessage("");
      toast.success("Message Sent");
    } catch (error) {
      toast.error(error);
    }
  };

  const handlelogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="container">
        {user ? (
          <div className="box">
            <button className="btnSignout" onClick={handlelogout}>
              Logout
            </button>
            <div className="messageContainer"></div>
            <form className="messageForm" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Enter a message..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        ) : (
          <button className="googlBtn" onClick={handleGoogleAuth}>
            <GoogleIcon />
            Google
          </button>
        )}
      </div>
    </>
  );
}

export default App;
