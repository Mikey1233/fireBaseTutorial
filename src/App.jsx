import "./App.css";
import Auth from "./component/Auth";
import { db } from "./config/firebase-config";
import { useState, useEffect ,useRef} from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [movieList, setmovieList] = useState([]);
  const movieCollectionRef = collection(db, "movies");
  //initialising userefs
 const inputRef = useRef('')
 const inputRef2 = useRef('')
 const inputRef3 = useRef('')
const arrRef = [inputRef,inputRef2,inputRef3]
  //new movie state
  const [newMovie, setNewmovie] = useState("");
  const [newReleasedate, setNewreleseDate] = useState(0);
  const [isOscar, setIsOscar] = useState(false);
  //update state
  const [updateTitle, setUpdateTitle] = useState("");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = await data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setmovieList(filteredData);
    } catch (err) {
      console.log("error : " + err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const submitData = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovie,
        release_date: newReleasedate,
        received_oscar: isOscar,
      });
      getMovieList();
      setNewmovie("");
      setIsOscar(false);
      setNewreleseDate("");
    } catch (err) {
      console.log(err);
    }
  };
  const deleteData = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };
  const updateData = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateTitle });
    getMovieList();
  };
  return (
    <div className="app">
      <h2>Firebase Course</h2>
      <Auth />
      {/* sending data to the fierstore dataBase */}
      <div>
        <input
          onChange={(e) => setNewmovie(e.target.value)}
          type="text"
          placeholder="enter movie name"
          value={newMovie}
        />
        <input
          onChange={(e) => {
            setNewreleseDate(Number(e.target.value));
            e.target.value = "";
          }}
          placeholder="enter release date"
          type="number"
          value={newReleasedate}
        />
        <input
          onChange={(e) => setIsOscar(e.target.checked)}
          type="checkbox"
          checked={isOscar}
          value={!isOscar}
        />
        <label>recieved an oscar</label>
        <button type="submit" onClick={submitData}>
          submit movie
        </button>
      </div>

      {movieList.map((arr,i) => (
        <div key={arr.id}>
          <h1 style={{ color: arr.received_oscar ? "green" : "red" }}>
            {arr.title}
          </h1>
          <span>{arr.release_date}</span>
          <p>{arr.received_oscar}</p>
          <button onClick={() => deleteData(arr.id)}>delete movie</button>
          <input
            type="text"
            placeholder="change movie title"
            onChange={(e) => setUpdateTitle(e.target.value)}
            ref={arrRef[i]}
          />
          <button
            onClick={() => {
              updateData(arr.id);
              arrRef[i].current.value = ''
            }}
          >
            Update movie title
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
