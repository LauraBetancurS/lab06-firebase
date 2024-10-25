let db: any;

const getFirestoreInstance = async () => {
	if (!db) {

    // Import the functions you need from the SDKs you need
    const { initializeApp } = await import ('firebase/app');
    const { getFirestore } = await import ('firebase/firestore'); //Importar los modulos
  

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
		apiKey: "AIzaSyBq6mYm2NQX9Eos3CXviMQv4rfDF0TyWwU",
		authDomain: "lab6-d9eaa.firebaseapp.com",
		projectId: "lab6-d9eaa",
		storageBucket: "lab6-d9eaa.appspot.com",
		messagingSenderId: "412457802903",
		appId: "1:412457802903:web:d882a7f1cecff51ae05dd2",
		measurementId: "G-TJZY56GBZJ"
	  };
	  
    // Initialize Firebase

      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
  }

	return db;

};

export const addSongs = async (product: any) => {
	try {
		const db = await getFirestoreInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const where = collection(db, 'songs');
		await addDoc(where, product);
		console.log('Se añadió con exito');
	} catch (error) {
		console.error('Error adding document', error);
	}
};

export const getSongs = async () => {
	try {
		const db = await getFirestoreInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'songs');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};