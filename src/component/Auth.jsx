import { auth,googleProvider} from "../config/firebase-config";
import { createUserWithEmailAndPassword ,signInWithPopup,signOut} from "firebase/auth";

import { useState } from "react";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
console.log(auth.currentUser?.email)
console.log(auth.currentUser?.photoURL)
  const signInWithGoogle =async () =>{
   try{
    await signInWithPopup(auth,googleProvider)
   }catch(err){
    console.log(err)
   }
  }
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      SetPassword("");
    } catch (err) {
        console.log(err)
    }
  };
  const logout = async () =>{
    await signOut(auth)
  };
  return (
    <div>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="email"
        value={email}
        id="input"
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => SetPassword(e.target.value)}
        placeholder="password..."
      />
      <button onClick={signInWithGoogle}>sign-in with google </button>
      <button onClick={signIn}>Sign-in</button>
      <button onClick={logout}>Sign-out</button>
    </div>
  );
}

export default Auth;
