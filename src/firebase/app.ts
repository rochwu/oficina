import {initializeApp} from 'firebase/app';

const config = {
  apiKey: 'AIzaSyA9XPPMsH55-9o689aqs_IaB4jHA9yY0Dk',
  // authDomain: 'dame-follow.firebaseapp.com',
  authDomain: location.hostname.includes('rolando.ooo')
    ? 'rolando.ooo/oficina'
    : '127.0.0.1:3000/oficina',
  projectId: 'dame-follow',
  storageBucket: 'dame-follow.firebasestorage.app',
  messagingSenderId: '992894988444',
  appId: '1:992894988444:web:c1dce7a4f86814748b3d59',
  measurementId: 'G-5ZRPR1PP8N',
};

export const app = initializeApp(config);
