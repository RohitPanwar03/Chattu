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
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Message from "./Message";

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
      getMessages();
      toast.success("Message Sent");
    } catch (error) {
      toast.error(error);
    }
  };

  const handlelogout = async () => {
    try {
      const msg = await getDocs(collection(db, "messages"));
      const deletions = msg.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletions);
      await signOut(auth);
      setUser(null);
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error);
    }
  };
  const getMessages = () => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    // Real-time listener
    return onSnapshot(q, (snapshot) => {
      const msg = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msg);
    });
  };

  useEffect(() => {
    const unsubscribe = getMessages();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <>
      <div className="container">
        {user ? (
          <div className="box">
            <button className="btnSignout" onClick={handlelogout}>
              Logout
            </button>
            <div className="messageContainer">
              {messages &&
                messages.map((msg) => (
                  <Message
                    key={msg.id}
                    message={msg.message}
                    user={msg.uid === user?.uid}
                    photo={msg?.photoURL}
                  />
                ))}
            </div>
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
