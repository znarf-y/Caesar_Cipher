# 🔐 Caesar Cipher - Elegant Cryptography App

<div align="center">
  <img src="./assets/images/icon.png" alt="Caesar Cipher App Icon" width="120" height="120">
  
  **✨ Simple Shift Encryption ✨**
  
  *Elegant cryptography at your fingertips*
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.2-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-53.0.0-black.svg)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
</div>

## 📖 Overview

Caesar Cipher is a beautifully designed cross-platform mobile application that brings the ancient art of Caesar cipher encryption to modern devices. Built with React Native and Expo, this app features an interactive cipher wheel, stunning animations, and an intuitive glassmorphism UI design.

## ✨ Features

### 🎯 Core Functionality

- **Interactive Cipher Wheel**: Rotate the beautiful animated wheel to select shift values (0-25)
- **Dual Mode Operation**: Seamlessly switch between encrypt and decrypt modes
- **Real-time Processing**: Instant encryption/decryption as you type
- **Copy to Clipboard**: One-tap copying with haptic feedback
- **Preserves Formatting**: Maintains spaces, punctuation, and character case

### 🎨 Design & UX

- **Glassmorphism UI**: Modern glass-like interface with beautiful transparency effects
- **Responsive Design**: Optimized layouts for phones and tablets
- **Smooth Animations**: Powered by Reanimated for 60fps animations
- **Haptic Feedback**: Tactile responses for enhanced user experience
- **Pink/Purple Theme**: Elegant color scheme with gradients and shadows
- **Custom Typography**: Poppins font family for premium feel

### 📱 Cross-Platform Support

- **iOS**: Native iOS app with full feature support
- **Android**: Native Android app with adaptive icons
- **Web**: Progressive web app version
- **Tablet Optimized**: Special layouts for larger screens

### 🎭 Visual Elements

- **Animated Pixel Background**: Floating particles with grid overlay
- **Interactive Components**: Touch-responsive elements with visual feedback
- **Status Indicators**: Clear visual feedback for current mode and shift value
- **Elegant Icons**: Lucide React Native icons throughout

## 🛠️ Tech Stack

### Frontend Framework

- **React Native** 0.79.2 - Cross-platform mobile development
- **Expo** 53.0.0 - Development platform and runtime
- **TypeScript** 5.8.3 - Type-safe JavaScript

### UI/UX Libraries

- **NativeWind** 4.1.23 - TailwindCSS for React Native
- **TailwindCSS** 3.4.17 - Utility-first CSS framework
- **React Native Reanimated** 3.17.4 - Smooth animations
- **React Native SVG** 15.11.2 - Scalable vector graphics
- **Lucide React Native** 0.479.0 - Beautiful icons

### Device Integration

- **Expo Haptics** 14.1.4 - Tactile feedback
- **Expo Clipboard** 8.0.7 - Clipboard operations
- **Expo Linear Gradient** 14.1.5 - Gradient backgrounds
- **Expo Blur** 14.1.4 - Glass blur effects

### Typography & Assets

- **@expo-google-fonts/poppins** 0.4.1 - Custom font family
- **Expo Font** 13.3.1 - Font loading and management

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/caesar-cipher-app.git
   cd caesar-cipher-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on specific platforms**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

### Development Scripts

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run web version
npm run web

# Run tests
npm test

# Lint code
npm run lint

# Reset project (if needed)
npm run reset-project
```

## 📁 Project Structure

```
caesar-cipher-app/
├── app/                          # Main app screens
│   ├── _layout.tsx              # Root layout with navigation
│   └── index.tsx                # Home screen with cipher functionality
├── components/                   # Reusable UI components
│   ├── CipherWheel.tsx          # Interactive rotating cipher wheel
│   ├── MessageProcessor.tsx     # Text input/output processing
│   ├── GlassModeToggle.tsx      # Encrypt/decrypt mode switcher
│   ├── EnhancedPixelBackground.tsx # Animated background effects
│   └── PixelBackground.tsx      # Basic background component
├── assets/                      # Static assets
│   ├── fonts/                   # Custom fonts
│   └── images/                  # App icons and images
├── global.css                   # Global Tailwind styles
├── tailwind.config.js           # Tailwind configuration
├── app.json                     # Expo app configuration
└── package.json                 # Dependencies and scripts
```

## 🎮 How to Use

### Basic Operation

1. **Launch the app** - You'll see the beautiful cipher wheel interface
2. **Choose mode** - Toggle between "Encrypt" and "Decrypt" at the top
3. **Set shift value** - Rotate the cipher wheel to select your desired shift (0-25)
4. **Enter text** - Type your message in the input field
5. **Get results** - The processed text appears instantly in the output field
6. **Copy results** - Tap the copy button to save to clipboard

### Understanding the Cipher Wheel

- **Outer ring**: Original alphabet (rotates with your selection)
- **Inner ring**: Shifted alphabet (shows the cipher mapping)
- **Pointer**: Indicates the currently selected letter alignment
- **Shift indicator**: Shows the current shift value

### Encryption Example

- **Original**: "HELLO WORLD"
- **Shift 3**: "KHOOR ZRUOG"
- **Shift 13 (ROT13)**: "URYYB JBEYQ"

## 🔧 Configuration

### Customizing the App

#### Colors and Themes

Edit the color scheme in your components or extend Tailwind config:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#FF69B4",
        secondary: "#FFB6C1",
        // Add your custom colors
      },
    },
  },
};
```

#### App Icon and Splash Screen

Replace images in `assets/images/`:

- `icon.png` - App icon
- `adaptive-icon.png` - Android adaptive icon
- `splash-icon.png` - Splash screen icon
- `favicon.png` - Web favicon

#### App Configuration

Modify `app.json` for:

- App name and slug
- Bundle identifier
- Version information
- Platform-specific settings

## 📱 Platform-Specific Features

### iOS

- Haptic feedback integration
- Native iOS design patterns
- Tablet support with optimized layouts

### Android

- Adaptive icons
- Material Design elements
- Hardware back button support

### Web

- Progressive Web App capabilities
- Responsive breakpoints
- Keyboard navigation

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The app includes:

- Unit tests for cipher algorithms
- Component testing with Jest
- Visual regression testing capabilities

## 🚀 Deployment

### Building for Production

#### iOS App Store

```bash
expo build:ios
```

#### Google Play Store

```bash
expo build:android
```

#### Web Deployment

```bash
expo export:web
```

### Using EAS Build (Recommended)

```bash
npm install -g @expo/cli
expo install expo-dev-client
eas build --platform all
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Maintain the existing code style
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Julius Caesar** - For the original cipher technique
- **Expo Team** - For the amazing development platform
- **React Native Community** - For the robust ecosystem
- **Tailwind Team** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon set

## 📞 Support

If you encounter any issues or have questions:

- 🐛 **Bug Reports**: [Create an issue](https://github.com/yourusername/caesar-cipher-app/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/yourusername/caesar-cipher-app/discussions)
- 📧 **Email**: your.email@example.com

## 🔮 Roadmap

### Version 2.0 Features

- [ ] Multiple cipher algorithms (Vigenère, Atbash, etc.)
- [ ] Custom alphabet support
- [ ] File encryption/decryption
- [ ] Password protection
- [ ] History of encrypted messages
- [ ] Dark/light theme toggle
- [ ] Export/import functionality
- [ ] Advanced settings panel

### Long-term Goals

- [ ] Educational mode with cipher history
- [ ] Multiplayer cipher challenges
- [ ] Integration with messaging apps
- [ ] Advanced cryptographic algorithms

---

<div align="center">
  
**Made with ❤️ and lots of ☕**

_Star ⭐ this repo if you found it helpful!_

</div>
