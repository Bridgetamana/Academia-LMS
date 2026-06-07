import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 
import { sendCustomVerificationEmail, sendCustomPasswordResetEmail } from '@/app/actions/authEmails';
import { verifyStudentInvite, acceptStudentInvites } from '@/app/actions/studentManagement';

export const handleSignUp = async (name, email, password, role) => {
  if (role === 'student') {
    try {
      const inviteResult = await verifyStudentInvite(email);
      if (!inviteResult.success) {
        return {
          success: false,
          message: inviteResult.message || 'You must be invited by an instructor to join an Academy. No invitation was found for this email.',
        };
      }
    } catch (err) {
      console.error('Error checking invitations:', err);
      return {
        success: false,
        message: 'Could not verify your invitation status. Please try again.',
      };
    }
  }

  const auth = getAuth();
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {
      displayName: name,
    });

    const emailResult = await sendCustomVerificationEmail(user.email, name);
    if (!emailResult.success) {
      throw new Error('Account created, but failed to send verification email: ' + emailResult.error);
    }

    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
      emailVerified: false, 
      academies: [],
    });

    // If student, link them to the academies they were invited to
    if (role === 'student') {
      try {
        const acceptResult = await acceptStudentInvites(email);
        if (acceptResult.success && acceptResult.academies.length > 0) {
          await setDoc(doc(db, 'users', user.uid), { academies: acceptResult.academies }, { merge: true });
        }
      } catch (err) {
        console.error('Failed to link student academies:', err);
      }
    }

    return {
      success: true,
      message: 'Registration completed successfully! Please check your email for verification.',
    };
  } catch (error) {
    let errorMessage = 'Failed to create account';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered. Try signing in instead.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address you entered is invalid. Please double-check it.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Your password is too weak. It must be at least 6 characters long.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/password accounts are not enabled. Please contact support.';
        break;
      case 'permission-denied':
        errorMessage = 'Database access denied. Your Firebase Firestore security rules are blocking the connection.';
        console.error('Firestore Permission Error:', error);
        break;
      default:
        errorMessage = 'Something went wrong while creating your account. Please try again.';
        console.error('Firebase Auth Error:', error);
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const handleSignIn = async (email, password) => {
  const auth = getAuth();
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    if (!user.emailVerified) {
      await auth.signOut();
      throw {
        success: false,
        message: "Please verify your email before logging in. Check your inbox for the verification link.",
        code: "auth/email-not-verified",
      };
    }

    const userDoc = await getDoc(doc(db, 'users', user.uid));

    let userData;

    if (!userDoc.exists()) {
      userData = {
        name: user.displayName || 'Educator',
        email: user.email,
        role: 'educator', 
        createdAt: new Date().toISOString(),
        emailVerified: user.emailVerified, 
        academies: [],
      };
      await setDoc(doc(db, 'users', user.uid), userData);
    } else {
      userData = userDoc.data();
    }

    if (userData.emailVerified !== user.emailVerified) {
      await setDoc(
        doc(db, 'users', user.uid),
        { emailVerified: user.emailVerified },
        { merge: true }
      );
    }

    return {
      success: true,
      user: userData,
      message: 'Signed in successfully!'
    };
  } catch (error) {
    let errorMessage = 'Failed to sign in';
    
    switch (error.code) {
      case 'auth/email-not-verified':
        errorMessage = error.message; 
        break;
      case 'auth/user-not-found':
        errorMessage = 'We couldn’t find an account with that email. Please check for typos or sign up.';
        break;
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
        errorMessage = 'The email or password you entered is incorrect.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address format is invalid.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed login attempts. Please reset your password or try again later.';
        break;
      case 'permission-denied':
        errorMessage = 'Database access denied. Your Firebase Firestore security rules are blocking the connection.';
        console.error('Firestore Permission Error:', error);
        break;
      default:
        errorMessage = 'Something went wrong while signing in. Please try again.';
        console.error('Firebase Auth Error:', error);
    }

    return {
      success: false,
      message: errorMessage
    };
  }
};
export const resetPassword = async (email) => {
  const auth = getAuth();
  try {
    await sendCustomPasswordResetEmail(email);
    return {
      success: true,
      message: 'Password reset email sent successfully!'
    };
  } catch (error) {
    let errorMessage = 'Failed to send reset email';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'We couldn’t find an account associated with that email address.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address format is invalid. Please double-check it.';
        break;
      default:
        errorMessage = 'Something went wrong while sending the reset email. Please try again.';
        console.error('Firebase Auth Error:', error);
    }

    return {
      success: false,
      message: errorMessage
    };
  }
};