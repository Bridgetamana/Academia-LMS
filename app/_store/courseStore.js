import { collection, doc, setDoc, getDocs, getDoc, query, where, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export const getEducatorCourses = async (academyId) => {
  try {
    const q = query(
      collection(db, 'courses'),
      where('academyId', '==', academyId)
    );
    const snapshot = await getDocs(q);
    const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return courses.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
  } catch (error) {
    console.error("Error fetching courses: ", error);
    throw error;
  }
};

// Get a single course by ID
export const getCourse = async (courseId) => {
  try {
    const docRef = doc(db, 'courses', courseId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching course: ", error);
    throw error;
  }
};

// Create a new course
export const createCourse = async (academyId, courseData) => {
  try {
    const docRef = await addDoc(collection(db, 'courses'), {
      ...courseData,
      academyId,
      status: 'draft',
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating course: ", error);
    return { success: false, error: error.message };
  }
};

// Add a lesson to a course
export const addLessonToCourse = async (courseId, lessonData) => {
  try {
    const docRef = await addDoc(collection(db, `courses/${courseId}/lessons`), {
      ...lessonData,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding lesson: ", error);
    return { success: false, error: error.message };
  }
};

// Get all lessons for a course
export const getCourseLessons = async (courseId) => {
  try {
    const q = query(
      collection(db, `courses/${courseId}/lessons`),
      orderBy('order', 'asc') // Assuming we will pass an 'order' field to sort lessons
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching lessons: ", error);
    throw error;
  }
};
