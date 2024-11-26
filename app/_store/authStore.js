import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  sendEmailVerification, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 

export const handleSignUp = async (name, email, password, role) => {
  const auth = getAuth();
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {
      displayName: name,
    });

    await sendEmailVerification(user);

    await setDoc(doc(db, role + 's', user.uid), {
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
      emailVerified: false, 
    });

    return {
      success: true,
      message: 'Registration completed successfully! Please check your email for verification.',
    };
  } catch (error) {
    let errorMessage = 'Failed to create account';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email already in use';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters';
        break;
      default:
        errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const handleSignIn = async (email, password, role) => {
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

    const userDoc = await getDoc(doc(db, role + 's', user.uid));

    if (!userDoc.exists()) {
      throw {
        success: false,
        message: 'User data not found in the database.',
      };
    }

    const userData = userDoc.data();

    if (userData.emailVerified !== user.emailVerified) {
      await setDoc(
        doc(db, role + 's', user.uid),
        { emailVerified: user.emailVerified },
        { merge: true }
      );
    }

    return {
      success: true,
      user: { ...userData, role },
      message: 'Signed in successfully!'
    };
  } catch (error) {
    let errorMessage = 'Failed to sign in';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email or password';
        break;
      default:
        errorMessage = error.message;
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
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent successfully!'
    };
  } catch (error) {
    let errorMessage = 'Failed to send reset email';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      default:
        errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage
    };
  }
};