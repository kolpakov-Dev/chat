import { db } from "../firebase.setup.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const createChat = async (req, res) => {
  const { title, userUID } = req.body;
  try {
    const docRef = await addDoc(collection(db, "Chats"), {
      title: title,
      owner: userUID,
      users: [userUID],
      messages: [],
    });

    return res
      .status(200)
      .json(JSON.stringify({ title, owner: userUID, users: [userUID] }));
  } catch (e) {
    return res.status(500).json(e.message);
  }
};
export const fetchChats = async (req, res) => {
  const { userUID } = req.body;
  try {
    const q = query(
      collection(db, "Chats"),
      where("users", "array-contains", userUID)
    );
    const querySnapshot = await getDocs(q);
    let result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data(), doc.id);
    });
    return res.status(200).json(JSON.stringify(result));
  } catch (error) {
    return res.status(500).json(error.code);
  }
};
export const sendMessage = async (req, res) => {
  const { userUID, message, chatID } = req.body;
  var datetime = getDate();
  try {
    const docRef = doc(db, "Chats", chatID);
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, {
      messages: [
        ...docSnap.data().messages,
        { text: message, date: datetime, user: userUID },
      ],
    })
      .then(async () => {
        const ndSnap = await getDoc(docRef);
        return res.status(200).json(JSON.stringify(ndSnap.data(), ndSnap.id));
      })
      .catch((error) => {
        return res.status(500).json(error.code);
      });
  } catch (error) {
    return res.status(500).json(JSON.stringify(error));
  }
};
export const deleteMessage = async (req, res) => {
  const { messageDate, chatID } = req.body;
  try {
    const docRef = doc(db, "Chats", chatID);
    const messages = (await getDoc(docRef)).data().messages;
    const updatetMessages = messages.filter((element) => {
      return element.date !== messageDate;
    });
    await updateDoc(docRef, {
      messages: updatetMessages,
    })
      .then(async () => {
        const ndSnap = await getDoc(docRef);
        return res.status(200).json(JSON.stringify(ndSnap.data(), ndSnap.id));
      })
      .catch((error) => {
        return res.status(500).json(error.code);
      });
  } catch (error) {
    return res.status(500).json(JSON.stringify(error));
  }
};

const getDate = () => {
  const currentdate = new Date();
  return (
    currentdate.getDate() +
    "." +
    (currentdate.getMonth() + 1) +
    "." +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds()
  );
};
