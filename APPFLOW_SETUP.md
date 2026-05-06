# GoldTrust Wallet - Ionic Appflow Build Configuration

This file contains configuration and instructions for building the APK using Ionic Appflow.

## Quick Start with Appflow

### 1. Connect Repository
```bash
# Ensure your repository is pushed to GitHub/GitLab
git remote -v  # Verify your remote repository
git push origin main
```

### 2. Create Appflow App

1. Go to https://ionicframework.com/appflow
2. Sign in with your Ionic account
3. Click **"New App"** → **"Connect existing app"**
4. Select your repository (GitHub/GitLab)
5. Choose the branch: `main` (or your deployment branch)
6. Click **"Connect"**

### 3. Configure Build

#### Web Build Settings
In Appflow Dashboard → **Settings** → **Build**:

- **Framework**: Next.js
- **Build command**: `npm run build && cap copy android`
- **Output directory**: `out`
- **Node version**: 18 or higher
- **Package manager**: npm

#### Build Environment Variables
Go to **Settings** → **Environment Variables** and add:
```
NEXT_PUBLIC_APP_NAME=GoldTrust Wallet
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 4. Set Up Android Signing

#### Option A: Generate New Certificate (Recommended)
1. Go to **Settings** → **Build Credentials** → **Certificates**
2. Click **"Create New Certificate"**
3. Choose **"Android"**
4. Generate new keystore
5. Save credentials securely (you'll need these for Play Store)

#### Option B: Upload Existing Keystore
1. If you have an existing signing keystore, upload it
2. Provide the keystore password and key alias
3. Save credentials

### 5. Build APK

1. Go to **Builds** tab
2. Click **"Start Build"** or configure auto-build
3. Select options:
   - **Platform**: Android
   - **Build Type**: Release
   - **Target**: APK (for testing) or AAB (for Play Store)
   - **Build Credentials**: Select your signing certificate
4. Click **"Build Now"**

### 6. Download & Deploy

Once the build completes:
- Download the APK/AAB file
- Test on device: `adb install app-release.apk`
- Or upload to Google Play Store

## Troubleshooting

### Build Error: "Cannot find capacitor.config.json"
**Solution**: Ensure `capacitor.config.json` is in the root directory

### Build Error: "out directory not found"
**Solution**: The build command must output to `out/` directory (see next.config.js)

### Build Timeout
**Solution**: Increase timeout in Appflow settings or optimize dependencies

### Android Build Fails
**Solution**: 
- Check minSdkVersion in capacitor.config.json (should be ≥ 21)
- Verify Android SDK version compatibility

### App Crashes on Launch
**Solution**: Check Chrome DevTools console (chrome://inspect) for JavaScript errors

## File Structure for Appflow

```
.
├── .github/
│   └── copilot-instructions.md     # Project documentation
├── android/                        # Capacitor Android project
├── components/                     # React components
├── pages/                          # Next.js pages
├── public/                         # Static assets
├── styles/                         # CSS files
├── utils/                          # Utility functions
├── capacitor.config.json          # Capacitor configuration (REQUIRED)
├── ionic.config.json              # Ionic Appflow configuration
├── next.config.js                 # Next.js export config
├── package.json                   # Dependencies & scripts
└── MOBILE_SETUP.md               # Setup instructions
```

## Build Scripts

```json
{
  "build": "next build && next export",           // Builds web assets
  "build:mobile": "npm run build && cap copy android",  // Syncs with Capacitor
  "build:apk": "npm run build:mobile && cd android && ./gradlew assembleRelease"  // Full APK build
}
```

## Version Management

Update version for each release:

**capacitor.config.json**:
```json
{
  "appVersion": "1.0.1",
  "appBuild": "2"
}
```

**package.json**:
```json
{
  "version": "1.0.1"
}
```

## Release Checklist

- [ ] Update version in capacitor.config.json
- [ ] Update version in package.json
- [ ] Update CHANGELOG
- [ ] Test on Android device
- [ ] Verify all features work in WebView
- [ ] Check localStorage persistence
- [ ] Test back button behavior
- [ ] Push changes to repository
- [ ] Trigger build in Appflow
- [ ] Download and test APK
- [ ] Upload to Play Store (if releasing)

## Security Notes

1. **Never commit keystore passwords** to the repository
2. **Use Appflow's encrypted environment variables** for secrets
3. **Keep Capacitor plugins updated** for security patches
4. **Sign APKs with production keystore** for releases
5. **Test thoroughly** before publishing to Play Store

## Play Store Submission

After building APK/AAB:

1. Go to Google Play Console: https://play.google.com/console
2. Create new app or select existing
3. Upload AAB/APK
4. Fill app details, privacy policy, screenshots
5. Submit for review

Typical review time: 24-48 hours

## Additional Appflow Features

- **Version Control**: Automatic builds on push
- **Live Updates**: Deploy web updates without app store review
- **Monitoring**: Track app crashes and performance
- **Pro Features**: Advanced signing, priority support

## Support

- **Appflow Docs**: https://ionic.io/docs/appflow
- **Capacitor Docs**: https://capacitorjs.com
- **GitHub Issues**: Create issue in your repository
