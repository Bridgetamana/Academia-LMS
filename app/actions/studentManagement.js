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

export async function verifyStudentInvite(email) {
  try {
    const invitesSnapshot = await adminDb.collection('invitations').where('email', '==', email).get();
    
    if (invitesSnapshot.empty) {
      return { success: false, message: 'No invitation was found for this email.' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Failed to verify invite:', error);
    return { success: false, error: error.message };
  }
}

export async function acceptStudentInvites(email) {
  try {
    const invitesSnapshot = await adminDb.collection('invitations').where('email', '==', email).get();
    const academies = [];
    
    const batch = adminDb.batch();
    
    invitesSnapshot.forEach((doc) => {
      academies.push(doc.data().academyId);
      batch.update(doc.ref, { status: 'accepted' });
    });
    
    await batch.commit();
    return { success: true, academies };
  } catch (error) {
    console.error('Failed to accept invites:', error);
    return { success: false, error: error.message };
  }
}
