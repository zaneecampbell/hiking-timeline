import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCZbEfwtSYWkBdFphve-nDNdDg3alEzl0c',
  authDomain: 'hiking-timeline-cc06e.firebaseapp.com',
  projectId: 'hiking-timeline-cc06e',
  storageBucket: 'hiking-timeline-cc06e.appspot.com',
  messagingSenderId: '1080586058790',
  appId: '1:1080586058790:web:a073fd9dab9a428f21fae7',
  measurementId: 'G-P10D9BE8HE'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
