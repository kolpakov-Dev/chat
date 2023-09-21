import { auth, db } from "../firebase.setup.js";
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
  const { title, userUID, friends } = req.body;
  const messages = [];
  var date = getDate();

  messages.push({
    text: "Chat created.",
    date: date,
    user: userUID,
    type: "info",
  });
  if (friends.length > 1) {
    messages.push({
      text: "Chat owner add new user.",
      date: date,
      user: userUID,
      type: "info",
    });
  }
  const usersID = friends.map((elem) => {
    return elem.id;
  });
  addDoc(collection(db, "Chats"), {
    title: title,
    owner: userUID,
    users: usersID,
    usersData: friends,
    messages: messages,
  })
    .then((snap) => {
      return res.status(200).json(
        JSON.stringify({
          id: snap.id,
          title,
          owner: userUID,
          users: usersID,
          usersData: friends,
          messages: messages,
        })
      );
    })
    .catch((error) => {
      return res.status(500).json(error.code);
    });
};
export const fetchChats = async (req, res) => {
  const userUID = auth.currentUser.uid;
  console.log(userUID);
  try {
    const q = query(
      collection(db, "Chats"),
      where("users", "array-contains", userUID)
    );
    await getDocs(q)
      .then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({ data: doc.data(), id: doc.id });
        });
        return res.status(200).json(JSON.stringify(result));
      })
      .catch((error) => {
        return res.status(500).json(error.code);
      });
  } catch (error) {
    return res.status(500).json(error.code);
  }
};
export const sendMessage = async (req, res) => {
  const { userUID, message, chatID, type } = req.body;
  var datetime = getDate();
  try {
    const docRef = doc(db, "Chats", chatID);
    const docSnap = await getDoc(docRef);
    await updateDoc(docRef, {
      messages: [
        ...docSnap.data().messages,
        { text: message, date: datetime, user: userUID, type: type },
      ],
    })
      .then(async () => {
        const ndSnap = await getDoc(docRef);
        return res.status(200).json(
          JSON.stringify({
            message: {
              text: message,
              date: datetime,
              user: userUID,
              type: type,
            },
            id: chatID,
          })
        );
      })
      .catch((error) => {
        console.log(error.code);
        return res.status(500).json(error.code);
      });
  } catch (error) {
    console.log(error.code);
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

export const fetchUsers = async (req, res) => {
  const userUID = auth.currentUser.uid;
  console.log(userUID);
  try {
    const q = query(collection(db, "Users"), where("id", "!=", userUID));
    await getDocs(q)
      .then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({
            id: doc.data().id,
            name: doc.data().name,
            image: doc.data().image,
          });
        });
        return res.status(200).json(JSON.stringify(result));
      })
      .catch((error) => {
        return res.status(500).json(error.code);
      });
  } catch (error) {
    return res.status(500).json(error.code);
  }
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
