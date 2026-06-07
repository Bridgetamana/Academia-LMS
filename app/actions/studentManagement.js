'use server';

import { adminDb } from '@/lib/firebaseAdmin';

export async function removeStudentFromAcademy(studentId, academyId, isPending) {
  try {
    if (isPending) {
      await adminDb.collection('invitations').doc(studentId).delete();
    } else {
      const userRef = adminDb.collection('users').doc(studentId);
      const userDoc = await userRef.get();
      
      if (!userDoc.exists) {
        throw new Error("Student not found.");
      }

      const userData = userDoc.data();
      const newAcademies = (userData.academies || []).filter(id => id !== academyId);
      
      await userRef.update({
        academies: newAcademies
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to remove student:', error);
    return { success: false, error: error.message };
  }
}
