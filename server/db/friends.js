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

export const fetchFriends = async (req, res) => {
  const userUID = auth.currentUser.uid;
  console.log(userUID);
  try {
    const q = query(collection(db, "Friends"));
    await getDocs(q)
      .then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({
            messages: doc.data().messages,
            users: doc.data().users,
            usersData: doc.data().usersData,
            id: doc.id,
          });
        });
        console.log(result);
        return res.status(200).json(JSON.stringify(result));
      })
      .catch((error) => {
        return res.status(500).json(error.code);
      });
  } catch (error) {
    return res.status(500).json(error.code);
  }
};
export const sendMessageFriend = async (req, res) => {
  const { userUID, message, chatID, type } = req.body;
  var datetime = getDate();
  try {
    const docRef = doc(db, "Friends", chatID);
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
        console.log(error.code + " 66");
        return res.status(500).json(error.code);
      });
  } catch (error) {
    console.log(error.code + " 70");
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
