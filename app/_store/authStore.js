import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 

export const handleSignUp = async (name, email, password, role) => {
  const auth = getAuth();
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {
      displayName: name,
    });

    await setDoc(doc(db, role + 's', user.uid), {
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return {
      success: true,
      message: 'Account created successfully!'
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
      message: errorMessage
    };
  }
};

export const handleSignIn = async (email, password, role) => {
  const auth = getAuth();
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    
    const userDoc = await getDoc(doc(db, role + 's', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error(`No ${role} account found with these credentials`);
    }

    const userData = userDoc.data();

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