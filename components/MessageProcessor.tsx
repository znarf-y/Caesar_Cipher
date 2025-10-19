import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Copy, Lock, Unlock } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";

interface MessageProcessorProps {
  shiftValue: number;
  mode: "encrypt" | "decrypt";
}

const MessageProcessor = ({
  shiftValue = 3,
  mode = "encrypt",
}: MessageProcessorProps) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (inputText) {
      setOutputText(processText(inputText, shiftValue, mode));
    } else {
      setOutputText("");
    }
  }, [inputText, shiftValue, mode]);

  const processText = (text: string, shift: number, mode: string): string => {
    const actualShift = mode === "decrypt" ? 26 - (shift % 26) : shift;
    return text
      .split("")
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          return String.fromCharCode(((code - base + actualShift) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  const copyToClipboard = async () => {
    if (outputText) {
      try {
        await Clipboard.setStringAsync(outputText);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        Alert.alert("Copy Failed", "Unable to copy to clipboard");
      }
    }
  };

  const sparkleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const textAreaHeight = isTablet ? 120 : 100;
  const fontSize = isTablet ? 18 : 16;
  const titleFontSize = isTablet ? 22 : 18;
  const padding = isTablet ? 32 : 24;

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding,
        margin: 16,
        shadowColor: "#FF69B4",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8,
        borderWidth: 1,
        borderColor: "#FFE4E1",
      }}
    >
      {/* Header with Mode Indicator */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          paddingVertical: 16,
          paddingHorizontal: 24,
          backgroundColor: "#FFF0F5",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#FFB6C1",
        }}
      >
        {mode === "encrypt" ? (
          <Lock size={isTablet ? 26 : 22} color="#FF1493" />
        ) : (
          <Unlock size={isTablet ? 26 : 22} color="#FF1493" />
        )}
        <Text
          style={{
            fontSize: titleFontSize + 2,
            fontWeight: "800",
            color: "#FF1493",
            marginLeft: 12,
            letterSpacing: 0.5,
            fontFamily: "Poppins-ExtraBold",
          }}
        >
          {mode === "encrypt" ? "Encrypt Message" : "Decrypt Message"}
        </Text>
      </View>

      <View style={{ marginBottom: 24 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              width: 4,
              height: 20,
              backgroundColor: "#FF69B4",
              borderRadius: 2,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: titleFontSize - 2,
              fontWeight: "600",
              color: "#FF1493",
              letterSpacing: 0.3,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {mode === "encrypt" ? "Your Secret Message" : "Encrypted Message"}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#FAFAFA",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#FFE4E1",
          }}
        >
          <TextInput
            style={{
              padding: isTablet ? 20 : 16,
              minHeight: textAreaHeight,
              fontSize,
              textAlignVertical: "top",
              color: "#333333",
              lineHeight: fontSize * 1.4,
              fontWeight: "400",
              fontFamily: "Poppins-Regular",
            }}
            multiline
            placeholder={
              mode === "encrypt"
                ? "Type your secret message here..."
                : "Paste your encrypted text here..."
            }
            placeholderTextColor="#FFB6C1"
            value={inputText}
            onChangeText={setInputText}
          />
        </View>
      </View>

      <View style={{ marginBottom: 24 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              width: 4,
              height: 20,
              backgroundColor: "#FF69B4",
              borderRadius: 2,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: titleFontSize - 2,
              fontWeight: "600",
              color: "#FF1493",
              letterSpacing: 0.3,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {mode === "encrypt" ? "Encrypted Result" : "Decrypted Message"}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#F8F8FF",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#E6E6FA",
            padding: isTablet ? 20 : 16,
            minHeight: textAreaHeight,
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize,
              lineHeight: fontSize * 1.4,
              color: outputText ? "#333333" : "#999999",
              fontFamily: outputText ? "Poppins-Medium" : "Poppins-Regular",
              fontWeight: outputText ? "500" : "400",
            }}
          >
            {outputText ||
              `Your ${
                mode === "encrypt" ? "encrypted" : "decrypted"
              } message will appear here`}
          </Text>

          {outputText && (
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                backgroundColor: "#FF1493",
                borderRadius: 12,
                padding: isTablet ? 12 : 10,
                shadowColor: "#FF1493",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
              onPress={copyToClipboard}
              activeOpacity={0.8}
            >
              <Copy size={isTablet ? 24 : 18} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {copied && (
          <View
            style={{
              backgroundColor: "#E6FFE6",
              borderRadius: 12,
              padding: 10,
              marginTop: 8,
              alignSelf: "center",
              borderWidth: 1,
              borderColor: "#90EE90",
            }}
          >
            <Text
              style={{
                color: "#228B22",
                fontSize: isTablet ? 16 : 14,
                fontWeight: "600",
                textAlign: "center",
                fontFamily: "Poppins-SemiBold",
              }}
            >
              ✨ Successfully copied to clipboard!
            </Text>
          </View>
        )}
      </View>

      {/* Shift Display */}
      <View
        style={{
          backgroundColor: "#FF69B4",
          borderRadius: 20,
          alignSelf: "center",
          paddingHorizontal: isTablet ? 28 : 24,
          paddingVertical: isTablet ? 16 : 14,
          shadowColor: "#FF69B4",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: isTablet ? 18 : 16,
            fontWeight: "700",
            letterSpacing: 0.5,
            textAlign: "center",
            fontFamily: "Poppins-Bold",
          }}
        >
          Shift: {shiftValue}
        </Text>
      </View>
    </View>
  );
};

export default MessageProcessor;
