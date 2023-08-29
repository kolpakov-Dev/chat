import { auth } from "../firebase.setup.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export const createUser = (req, res) => {
  const { email, password, userName } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: userName,
      })
        .then(() => {
          res.status(200).json(JSON.stringify(user));
          // ...
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
export const signIn = (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.status(200).json(JSON.stringify(user));
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
  res.status(200).json(JSON.stringify(user));
};
