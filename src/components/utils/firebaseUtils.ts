import { FirebaseError } from "firebase/app";

export function getFriendlyErrorMessageForSignup(error: FirebaseError): string {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already in use by another account.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled.";
    case "auth/weak-password":
      return "The password is too weak.";
    default:
      return "An error occurred while creating your account.";
  }
}

export function getFriendlyErrorMessageForLogin(error: FirebaseError): string {
  switch (error.code) {
    case "auth/popup-closed-by-user":
      return "The popup has been closed by the user before finalizing the operation.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "The user corresponding to the given email has been disabled.";
    case "auth/user-not-found":
      return "There is no user corresponding to the given email.";
    case "auth/wrong-password":
      return "The password is invalid for the given email.";
    default:
      return "An error occurred while logging in.";
  }
}
