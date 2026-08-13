# TODO — Saving Adventure

Last updated: 2026-08-13

## Current status
- Project is on branch `main` and tracks `origin/main`.
- Firebase Authentication is wired into the app.
- The first screen is now an authentication screen instead of the old landing page.

## Completed this round
- Added a full Login screen.
- Added a visible `สมัครสมาชิก` tab/button on the Login screen.
- Added registration form fields: display name, email, password, confirm password.
- Added Firebase Email/Password registration with `createUserWithEmailAndPassword`.
- Added Firebase login with `signInWithEmailAndPassword`.
- Added Firebase auth session monitoring with `onAuthStateChanged`.
- Added logout support.
- Added Thai error messages for common Firebase Auth errors.
- Added responsive/mobile-first styling for Login/Register.
- Protected the main app so it is shown only after successful authentication.
- Verified production build successfully with `npm run build`.

## Important Firebase setting
For registration/login to work in production, Firebase Console must have Authentication > Sign-in method > Email/Password enabled. If it is disabled, the app will display a Thai message explaining that Email/Password authentication is not enabled.

## Pending / next round
- Test real account registration against Firebase Authentication on the deployed site.
- Decide whether user profiles should also be saved in Firestore (student/teacher role, class, avatar, level, etc.).
- Add forgot-password flow.
- Continue building the post-login Saving Adventure dashboard and student saving features.

## Workflow rule
At the end of every work round:
1. Update this TODO.md.
2. Record completed work and remaining work.
3. Run relevant checks/build.
4. Commit the completed round.
5. Push to `origin/main`.
