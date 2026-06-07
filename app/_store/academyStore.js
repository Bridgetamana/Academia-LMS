import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export const createAcademy = async (userId, academyData) => {
  try {
    const academyRef = doc(collection(db, 'academies'));
    
    const finalData = {
      name: academyData.name,
      subdomain: academyData.subdomain,
      primaryColor: academyData.primaryColor,
      timezone: academyData.timezone,
      supportEmail: academyData.supportEmail,
      logoUrl: academyData.logoBase64 || '', // Saving Base64 string directly to Firestore
      academyId: academyRef.id,
      ownerId: userId,
      createdAt: serverTimestamp(),
    };

    await setDoc(academyRef, finalData);

    await setDoc(doc(db, 'users', userId), {
      academies: [academyRef.id]
    }, { merge: true });

    return { success: true, academyId: academyRef.id };
  } catch (error) {
    console.error('Error creating academy:', error);
    return { success: false, message: error.message };
  }
};
