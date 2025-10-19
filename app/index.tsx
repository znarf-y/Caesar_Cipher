import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heart } from "lucide-react-native";
import CipherWheel from "../components/CipherWheel";
import MessageProcessor from "../components/MessageProcessor";
import EnhancedPixelBackground from "../components/EnhancedPixelBackground";
import GlassModeToggle from "../components/GlassModeToggle";

export default function HomeScreen() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [shiftValue, setShiftValue] = useState(3);

  const { width, height } = Dimensions.get("window");
  const isTablet = width >= 768;
  const isLandscape = width > height;

  return (
    <SafeAreaView className="flex-1 bg-[#FFF0F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF0F5" />
      <EnhancedPixelBackground />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: isTablet ? 32 : 16,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center justify-center pt-6 pb-8">
          <View className="flex-row items-center justify-center mb-2">
            <Text
              className={`${
                isTablet ? "text-6xl" : "text-4xl"
              } font-extrabold text-[#FF69B4] tracking-wide text-center`}
              style={{ fontFamily: "Poppins-ExtraBold" }}
            >
              Caesar Cipher
            </Text>
            <View className="ml-3">
              <Heart size={isTablet ? 38 : 28} color="#FF69B4" fill="#FF69B4" />
            </View>
          </View>

          {/* Decorative underline */}
          <View className="h-1 w-32 bg-[#FF69B4] rounded-full mb-3 opacity-70 self-center" />

          <Text
            className={`${
              isTablet ? "text-2xl" : "text-xl"
            } text-[#FF69B4] font-medium italic tracking-wider text-center`}
            style={{ fontFamily: "Poppins-MediumItalic" }}
          >
            ✨ Simple Shift Encryption ✨
          </Text>

          {/* Subtitle enhancement */}
          <Text
            className={`${
              isTablet ? "text-base" : "text-sm"
            } text-[#FFB6C1] mt-2 font-light tracking-wide text-center`}
            style={{ fontFamily: "Poppins-Light" }}
          >
            Elegant cryptography at your fingertips
          </Text>
        </View>

        {/* Mode Toggle */}
        <GlassModeToggle mode={mode} onModeChange={setMode} />

        {/* Main Content - Responsive Layout */}
        {isTablet && isLandscape ? (
          // Tablet Landscape: Side by side layout
          <View className="flex-row flex-1 gap-8">
            <View className="flex-1 items-center justify-center">
              <CipherWheel
                value={shiftValue}
                onChange={setShiftValue}
                size={Math.min(width * 0.4, 350)}
              />
            </View>
            <View className="flex-1">
              <MessageProcessor mode={mode} shiftValue={shiftValue} />
            </View>
          </View>
        ) : (
          // Portrait or Phone: Vertical layout
          <View className="flex-1">
            {/* Cipher Wheel */}
            <View className="items-center mb-6">
              <CipherWheel
                value={shiftValue}
                onChange={setShiftValue}
                size={
                  isTablet
                    ? Math.min(width * 0.5, 400)
                    : Math.min(width * 0.8, 300)
                }
              />
            </View>

            {/* Message Processor */}
            <View className="flex-1">
              <MessageProcessor mode={mode} shiftValue={shiftValue} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
