# Paack App

## Prerequisites

- [Node.js > 14](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [react-native](https://reactnative.dev/) base library.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-redux](https://react-redux.js.org/) for state management.
- [redux-toolkit](https://https://redux-toolkit.js.org/) to simplify redux usage.
- [jest](https://facebook.github.io/jest/) and [react-native-testing-library](https://callstack.github.io/react-native-testing-library/) for testing.

## Folder structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  - `locales`: Folder to store text used on each screen or component.
  - `navigation`: Folder to store the navigators.
  - `routes`: Folder that contains all your application screens/features.
    - `Screen`: Each screen should be stored inside its folder
      - `__Tests__`: All test related to this screen
      - `Components`: Components used for this screen
      - `Screen.tsx`
      - `styles.ts`
  - `store`: Folder to put all redux logic.
    - `services`: Here you define the services using createApi from redux-toolkit to simplify the creation of triggers, loading and error states, and caching.
    - `hooks`: Here you will store the hooks and selectors related to Redux.
    - `slices`: Here you will define slices using createSlice from redux-toolkit to simplify the creation of reducers and actions
    - `testUtils`: Here you will define utils to test redux logic
  - `App.txs`: Main component that starts your whole app.
  - `index.js`: Entry point of your application as per React-Native standards.

## Getting Started

#### 1. Clone and Install

```bash
# Clone the repo
git clone https://github.com/hernanG89/paack-app.git

# Navigate to clonned folder and Install dependencies
cd folder_name && yarn install

# Install Pods
cd ios && pod install
```

#### 2. Open RNS in your iOS simulator

Run this command to start the development server and to start your app on iOS simulator:

```
yarn run:ios
```

Or, if you prefer Android:

```
yarn run:android
```
