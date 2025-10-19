import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

interface GlassModeToggleProps {
  mode: "encrypt" | "decrypt";
  onModeChange: (mode: "encrypt" | "decrypt") => void;
}

const GlassModeToggle: React.FC<GlassModeToggleProps> = ({
  mode,
  onModeChange,
}) => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 24,
        backgroundColor: "rgba(255, 228, 225, 0.3)",
        borderRadius: 25,
        padding: 4,
        marginHorizontal: isTablet ? 128 : 24,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.4)",
        shadowColor: "#FF69B4",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          paddingVertical: 12,
          borderRadius: 20,
          backgroundColor:
            mode === "encrypt" ? "rgba(255, 192, 203, 0.6)" : "transparent",
          borderWidth: mode === "encrypt" ? 1 : 0,
          borderColor:
            mode === "encrypt" ? "rgba(255, 255, 255, 0.5)" : "transparent",
          shadowColor: mode === "encrypt" ? "#FF69B4" : "transparent",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: mode === "encrypt" ? 0.3 : 0,
          shadowRadius: mode === "encrypt" ? 8 : 0,
          elevation: mode === "encrypt" ? 4 : 0,
        }}
        onPress={() => onModeChange("encrypt")}
        activeOpacity={0.8}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            color: mode === "encrypt" ? "#FFFFFF" : "#FF69B4",
            fontSize: isTablet ? 18 : 16,
            letterSpacing: 0.5,
            textShadowColor:
              mode === "encrypt" ? "rgba(255, 105, 180, 0.8)" : "transparent",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: mode === "encrypt" ? 2 : 0,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          Encrypt
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 1,
          paddingVertical: 12,
          borderRadius: 20,
          backgroundColor:
            mode === "decrypt" ? "rgba(255, 192, 203, 0.6)" : "transparent",
          borderWidth: mode === "decrypt" ? 1 : 0,
          borderColor:
            mode === "decrypt" ? "rgba(255, 255, 255, 0.5)" : "transparent",
          shadowColor: mode === "decrypt" ? "#FF69B4" : "transparent",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: mode === "decrypt" ? 0.3 : 0,
          shadowRadius: mode === "decrypt" ? 8 : 0,
          elevation: mode === "decrypt" ? 4 : 0,
        }}
        onPress={() => onModeChange("decrypt")}
        activeOpacity={0.8}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            color: mode === "decrypt" ? "#FFFFFF" : "#FF69B4",
            fontSize: isTablet ? 18 : 16,
            letterSpacing: 0.5,
            textShadowColor:
              mode === "decrypt" ? "rgba(255, 105, 180, 0.8)" : "transparent",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: mode === "decrypt" ? 2 : 0,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          Decrypt
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GlassModeToggle;
