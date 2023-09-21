import { auth, db } from "../firebase.setup.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export const createUser = (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;

  const imagePath = req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : null;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: userName,
      })
        .then(async () => {
          await setDoc(doc(db, "Users", user.uid), {
            id: user.uid,
            name: userName,
            email: email,
            image: imagePath,
            friends: [],
          })
            .then(() => {
              res.status(200).json(
                JSON.stringify({
                  id: user.uid,
                  name: userName,
                  email: email,
                  image: imagePath,
                  friends: [],
                })
              );
            })
            .catch((error) => {
              console.log(error.code + " 44");
              res.status(500).json(error.code);
            });
        })
        .catch((error) => {
          res.status(500).json(error.code);
          console.log(error);
        });
    })
    .catch((error) => {
      res.status(500).json(error.code);
      console.log(error.code + " 55");
      // ..
    });
};
export const signIn = (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const docRef = doc(db, "Users", user.uid);
      getDoc(docRef)
        .then((snap) => {
          res.status(200).json(
            JSON.stringify({
              id: snap.data().id,
              name: snap.data().name,
              email: snap.data().email,
              image: snap.data().image,
              friends: snap.data().friends,
            })
          );
        })
        .catch((error) => {
          res.status(500).json(error.code);
        });
    })
    .catch((error) => {
      res.status(500).json(error.code);
      // ..
    });
};
export const signOutFunc = (req, res) => {
  signOut(auth)
    .then(() => {
      res.status(200).json("OK");
    })
    .catch((error) => {
      res.status(500).json(error.code);
    });
};
export const getCurrent = (req, res) => {
  const user = auth.currentUser;
  if (!user) {
    res.status(200).json(null);
    return;
  }
  const docRef = doc(db, "Users", user.uid);
  getDoc(docRef)
    .then((snap) => {
      res.status(200).json(
        JSON.stringify({
          id: snap.data().id,
          name: snap.data().name,
          email: snap.data().email,
          image: snap.data().image,
          friends: snap.data().friends,
        })
      );
    })
    .catch((error) => {
      return res.status(500).json(error.code);
    });
};
export const addNewFriends = async (req, res) => {
  const { user, friends } = req.body;
  try {
    const docRef = doc(db, "Users", user.id);
    await updateDoc(docRef, {
      friends: friends,
    })
      .then(async () => {
        friends.forEach((friend) => {
          const res = createFriendRoom(user, friend);
          if (res != "OK") {
            console.log(res);
          }
        });
        return res.status(200).json(
          JSON.stringify({
            id: user.id,
            name: user.iname,
            email: user.email,
            image: user.image,
            friends: friends,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error.code);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json(JSON.stringify(error));
  }
};
const createFriendRoom = (user, friend) => {
  const messages = [];
  var date = getDate();

  messages.push({
    text: "Chat created.",
    date: date,
    user: "",
    type: "info",
  });
  addDoc(collection(db, "Friends"), {
    usersData: [{ id: user.id, image: user.image, name: user.name }, friend],
    users: [user.id, friend.id],
    messages: messages,
  })
    .then((snap) => {
      return "OK";
    })
    .catch((error) => {
      return error.code;
    });
};
const getDate = () => {
  const currentdate = new Date();
  const minutes = currentdate.getMinutes();
  const resMin = minutes > 9 ? minutes : "0" + minutes;
  return (
    currentdate.getDate() +
    "." +
    (currentdate.getMonth() + 1) +
    "." +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    resMin
  );
};
