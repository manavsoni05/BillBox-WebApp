import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  orderBy,
  limit
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";
import { db, storage } from "./firebase";

export const uploadReceiptImage = async (file, userId) => {
  try {
    const storageRef = ref(storage, `receipts/${userId}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading receipt image:", error);
    throw error;
  }
};

export const saveReceiptMetadata = async (receiptData) => {
  try {
    const docRef = await addDoc(collection(db, "receipts"), {
      ...receiptData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving receipt metadata:", error);
    throw error;
  }
};

export const getReceipts = async (userId) => {
  try {
    const q = query(
      collection(db, "receipts"), 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching receipts:", error);
    throw error;
  }
};

export const getRecentReceipts = async (userId, count = 5) => {
  try {
    const q = query(
      collection(db, "receipts"), 
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching recent receipts:", error);
    throw error;
  }
};
