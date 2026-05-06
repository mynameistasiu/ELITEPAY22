# GoldTrust Wallet - Mobile Setup & Appflow Deployment Guide

This guide explains how to build and deploy the GoldTrust Wallet as an APK using Ionic Appflow.

## Prerequisites

- Node.js 16+ installed
- Capacitor CLI: `npm install -g @capacitor/cli`
- Android SDK (for local builds)
- Ionic Appflow account: https://ionicframework.com/appflow

## Local Build (Development)

### 1. Build for Web Export
```bash
npm run build
```
This creates a static export in the `out/` directory that Capacitor will use.

### 2. Sync with Android
```bash
npm run build:mobile
```
This copies the web assets to the Android project.

### 3. Build APK Locally
```bash
npm run build:apk
```
This creates a release APK at `android/app/build/outputs/apk/release/app-release.apk`

## Appflow Setup (Recommended for Production)

### Step 1: Connect Repository

1. Go to [Ionic Appflow](https://ionicframework.com/appflow)
2. Sign in or create an account
3. Click **"New App"** and select **"Connect existing app"**
4. Connect your GitHub/GitLab repository
5. Select the branch containing this code

### Step 2: Configure Build Settings

1. In Appflow dashboard, go to **Settings > Build**
2. Set the following:
   - **Framework**: Next.js
   - **Build command**: `npm run build && cap copy android`
   - **Output directory**: `out`
   - **Node version**: 18 (or higher)

### Step 3: Create Build Credentials

1. Go to **Settings > Build Credentials**
2. Create a new Android signing certificate:
   - Certificate type: Android
   - Generate a new keystore or upload existing one
   - Store credentials securely

### Step 4: Configure Environment Variables (if needed)

1. Go to **Settings > Environment Variables**
2. Add any environment variables required by your app
3. Click **"Encrypt & Save"**

### Step 5: Build & Sign Android APK

1. Go to **Builds** tab
2. Click **"Start Build"** or configure automated builds
3. Select:
   - **Platform**: Android
   - **Build type**: Release
   - **Target**: APK (or AAB for Play Store)
4. Appflow will:
   - Clone your repository
   - Install dependencies
   - Build the web assets
   - Sync with Capacitor
   - Build and sign the APK
   - Provide download link

### Step 6: Download & Test

1. Once build completes, download the APK
2. Test on device: `adb install app-release.apk`
3. Or upload to Google Play Store

## Project Structure for Mobile

```
GOLDTRUSTNEW-main/
├── pages/               # React pages
├── components/          # React components
├── styles/              # CSS files
├── utils/               # Utilities
├── public/              # Static assets
├── out/                 # Generated web export (for mobile)
├── android/             # Capacitor Android project
├── capacitor.config.json # Capacitor configuration
├── ionic.config.json    # Ionic Appflow configuration
├── next.config.js       # Next.js export configuration
└── package.json         # Dependencies and scripts
```

## Important Notes

1. **Static Export**: The app uses Next.js static export (`output: 'export'`). Ensure all pages can be statically generated.

2. **Storage API**: All app data uses localStorage for persistence. No backend API calls in production build.

3. **WebView**: The app runs in Android/iOS WebView with Capacitor bridge for native features.

4. **Asset Size**: Appflow has size limits. Optimize images and assets if needed.

5. **Versioning**: Update version in `capacitor.config.json` before each release:
   ```json
   {
     "appVersion": "1.0.0",
     "webDir": "out"
   }
   ```

## Troubleshooting

### Build fails: "out directory not found"
- Run `npm run build` first to generate the `out/` directory

### APK won't install on device
- Ensure Android version is 5.0+ (API 21+)
- Check `capacitor.config.json` minSdkVersion matches device

### App crashes on launch
- Check browser console in Chrome DevTools (chrome://inspect)
- Verify localStorage isn't disabled
- Check for JavaScript errors in `pages/_app.js`

### Appflow build timeout
- Increase build timeout in Appflow settings
- Ensure all dependencies are listed in `package.json`
- Remove unused files from repository

## Security Best Practices

1. Never commit sensitive keys to the repository
2. Use Appflow's encrypted environment variables
3. Sign APKs with a secure keystore
4. Keep Capacitor and dependencies updated
5. Test thoroughly before production release

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Ionic Appflow Guide](https://ionic.io/docs/appflow)
- [Next.js Static Exports](https://nextjs.org/docs/advanced-features/static-html-export)
- [Android App Signing](https://developer.android.com/studio/publish/app-signing)
