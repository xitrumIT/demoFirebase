import {GoogleSignin} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

// Calling this function will open Google for login.
export async function googleLogin() {
  try {
    // add any configuration settings here:
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken,
    );
    // login with credential
    const firebaseUserCredential = await auth().signInWithCredential(
      credential,
    );

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
  } catch (e) {
    console.error(e);
  }
}
