# Pomodoro App

This is an [Expo](https://expo.dev) Pomodoro timer application project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). For now, only released for Android, but that's subject to change.

## Features

- Full Pomodoro cycle for focused studying with breaks. It consists of 25 minute active sessions followed by 5 minute breaks. When we hit the fourth cycle, the break will last 15 minutes for optimal recovery.

<p align="center">
<img width="209" height="435" src="https://github.com/user-attachments/assets/22604979-4510-4f4a-ac62-d2d1e00c1db6">
</p>

- Themes for customizing your Pomodoro experience. For now, there are only 5 themes, but feel free to add/request more! The 'system' theme reacts to the user system setting regarding Dark Mode.

<p align="center">
<img width="209" height="435" src="https://github.com/user-attachments/assets/4a10bbd6-6368-4b41-8999-7065981c6308">
</p>

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
