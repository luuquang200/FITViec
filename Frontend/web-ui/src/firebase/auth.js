import {
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithPopup,
    updatePassword,
    confirmPasswordReset,
} from "firebase/auth";
import { auth } from "./firebase";

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

// Gửi email ResetPassWord
export const doSendEmailPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/sign_in",
    });
};
// You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.

export const doResetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
};

// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// }
