import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, PanResponder, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import Svg, { Circle, Text as SvgText, Line, G } from "react-native-svg";
import * as Haptics from "expo-haptics";

interface CipherWheelProps {
  size?: number;
  value?: number;
  onChange?: (shift: number) => void;
  maxShift?: number;
}

const CipherWheel = ({
  size,
  value = 3,
  onChange = () => {},
  maxShift = 25,
}: CipherWheelProps) => {
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  // Responsive size calculation - made bigger
  const wheelSize =
    size ||
    (isTablet ? Math.min(width * 0.5, 420) : Math.min(width * 0.85, 340));

  const [currentShift, setCurrentShift] = useState(value);
  const rotation = useSharedValue(value * (360 / 26));
  const previousAngle = useRef(0);

  // Function to handle shift changes with haptic feedback
  const handleShiftChange = (newShift: number) => {
    if (newShift !== currentShift) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCurrentShift(newShift);
      onChange(newShift);
    }
  };

  const center = wheelSize / 2;
  const outerRadius = wheelSize / 2 - (isTablet ? 30 : 25);
  const innerRadius = outerRadius - (isTablet ? 50 : 40);
  const outerTextRadius = outerRadius - (isTablet ? 15 : 12);
  const innerTextRadius = innerRadius + (isTablet ? 15 : 12);

  // Responsive font sizes
  const letterFontSize = isTablet ? 14 : 11;
  const shiftFontSize = isTablet ? 18 : 14;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Create alphabet wheel with both original and shifted letters
  const outerWheelLetters = [];
  const innerWheelLetters = [];

  for (let i = 0; i < 26; i++) {
    const angle = ((i * 360) / 26) * (Math.PI / 180) - Math.PI / 2; // Start from top
    const letterAngle = angle + ((360 / 26) * (Math.PI / 180)) / 2; // Offset letters to center between lines

    // Outer ring - original alphabet (rotates)
    const outerX = center + outerTextRadius * Math.cos(letterAngle);
    const outerY = center + outerTextRadius * Math.sin(letterAngle);

    // Inner ring - shifted alphabet (stays fixed)
    const innerX = center + innerTextRadius * Math.cos(letterAngle);
    const innerY = center + innerTextRadius * Math.sin(letterAngle);

    // Calculate shifted letter for inner ring (fixed position)
    const shiftedIndex = (i + currentShift) % 26;
    const shiftedLetter = alphabet[shiftedIndex];

    // Outer wheel elements (will rotate)
    outerWheelLetters.push(
      <G key={i}>
        {/* Divider lines */}
        <Line
          x1={center + innerRadius * Math.cos(angle)}
          y1={center + innerRadius * Math.sin(angle)}
          x2={center + outerRadius * Math.cos(angle)}
          y2={center + outerRadius * Math.sin(angle)}
          stroke="rgba(255, 105, 180, 0.4)"
          strokeWidth="1.5"
        />

        {/* Highlight for letter at top (aligned with pointer) */}
        {i === 0 && (
          <Circle
            cx={outerX}
            cy={outerY}
            r={isTablet ? 16 : 14}
            fill="rgba(255, 0, 128, 0.2)"
            stroke="rgba(255, 0, 128, 0.5)"
            strokeWidth="2"
          />
        )}

        {/* Original alphabet (outer, rotates) */}
        <SvgText
          x={outerX}
          y={outerY}
          fill={i === 0 ? "#FF0080" : "#FF1493"}
          fontSize={i === 0 ? letterFontSize + 2 : letterFontSize}
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="central"
          fontFamily="Poppins-Bold"
        >
          {alphabet[i]}
        </SvgText>
      </G>
    );

    // Inner wheel elements (stay fixed)
    innerWheelLetters.push(
      <G key={i}>
        {/* Highlight for letter at top (aligned with pointer) */}
        {i === 0 && (
          <Circle
            cx={innerX}
            cy={innerY}
            r={isTablet ? 16 : 14}
            fill="rgba(255, 0, 128, 0.2)"
            stroke="rgba(255, 0, 128, 0.5)"
            strokeWidth="2"
          />
        )}

        <SvgText
          x={innerX}
          y={innerY}
          fill={i === 0 ? "#FF0080" : "#FF1493"}
          fontSize={i === 0 ? letterFontSize + 2 : letterFontSize}
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="central"
          fontFamily="Poppins-Bold"
        >
          {shiftedLetter}
        </SvgText>
      </G>
    );
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      // Calculate initial angle when touch starts
      const { locationX, locationY } = evt.nativeEvent;
      const dx = locationX - center;
      const dy = locationY - center;
      previousAngle.current = Math.atan2(dy, dx);
    },
    onPanResponderMove: (evt, gestureState) => {
      const { locationX, locationY } = evt.nativeEvent;

      // Calculate angle from center of wheel to touch point
      const dx = locationX - center;
      const dy = locationY - center;
      const angle = Math.atan2(dy, dx);

      // Calculate the difference from previous angle for smooth rotation
      let angleDiff = angle - previousAngle.current;

      // Handle angle wrapping (crossing 0/2π boundary)
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

      // Update the rotation smoothly
      rotation.value = rotation.value + (angleDiff * 180) / Math.PI;

      // Normalize rotation value to 0-360 range
      let normalizedRotation = rotation.value % 360;
      if (normalizedRotation < 0) normalizedRotation += 360;

      // Calculate shift value based on normalized rotation (0-25)
      const newShift = Math.round((normalizedRotation / 360) * 26) % 26;

      if (newShift !== currentShift) {
        runOnJS(handleShiftChange)(newShift);
      }

      // Update previous angle for next iteration
      previousAngle.current = angle;
    },
    onPanResponderRelease: () => {
      // Snap to nearest letter position with smooth animation
      const snapAngle = (currentShift * 360) / 26;
      rotation.value = withSpring(snapAngle, {
        damping: 12,
        stiffness: 120,
        mass: 0.6,
        restSpeedThreshold: 0.01,
        restDisplacementThreshold: 0.01,
      });
    },
  });

  const wheelStyle = useAnimatedStyle(() => {
    // Smooth interpolation for rotation
    const smoothRotation = interpolate(
      rotation.value,
      [0, 360],
      [0, 360],
      Extrapolate.IDENTITY
    );

    return {
      transform: [{ rotate: `${smoothRotation}deg` }],
    };
  });

  const dynamicStyles = StyleSheet.create({
    container: {
      width: wheelSize,
      height: wheelSize,
      backgroundColor: "rgba(255, 240, 245, 0.25)",
      borderRadius: wheelSize / 2,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      elevation: 8,
      shadowColor: "#FF69B4",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      marginVertical: 30,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    pointer: {
      position: "absolute",
      width: 0,
      height: 0,
      borderLeftWidth: isTablet ? 12 : 10,
      borderRightWidth: isTablet ? 12 : 10,
      borderBottomWidth: isTablet ? 30 : 25,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "#FF0080",
      top: "50%",
      left: "50%",
      marginTop: isTablet ? -35 : -30,
      marginLeft: isTablet ? -12 : -10,
      zIndex: 15,
      shadowColor: "#FF0080",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.6,
      shadowRadius: 6,
      elevation: 8,
    },
    shiftIndicator: {
      position: "absolute",
      bottom: -50,
      marginTop: 40,
      left: "45%",
      marginLeft: -30,
      backgroundColor: "rgba(255, 192, 203, 0.4)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.5)",
      shadowColor: "#FF69B4",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
      backdropFilter: "blur(10px)",
    },
    shiftText: {
      color: "#FFFFFF",
      fontSize: isTablet ? 16 : 14,
      fontWeight: "bold",
      textAlign: "center",
      textShadowColor: "rgba(139, 0, 139, 0.8)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
      fontFamily: "Poppins-Bold",
    },
  });

  return (
    <View style={dynamicStyles.container} {...panResponder.panHandlers}>
      {/* Static pointer at the center */}
      <View style={dynamicStyles.pointer} />

      {/* Fixed elements (inner ring and base circles) */}
      <Svg width={wheelSize} height={wheelSize}>
        {/* Outer circle */}
        <Circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="rgba(255, 192, 203, 0.4)"
          stroke="rgba(255, 105, 180, 0.6)"
          strokeWidth="2"
        />

        {/* Middle separator circle */}
        <Circle
          cx={center}
          cy={center}
          r={(outerRadius + innerRadius) / 2}
          fill="none"
          stroke="rgba(255, 105, 180, 0.5)"
          strokeWidth="1.5"
        />

        {/* Inner circle */}
        <Circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="rgba(255, 182, 193, 0.4)"
          stroke="rgba(255, 105, 180, 0.6)"
          strokeWidth="2"
        />

        {/* Fixed inner alphabet letters */}
        {innerWheelLetters}

        {/* Center dot */}
        <Circle
          cx={center}
          cy={center}
          r={isTablet ? "8" : "6"}
          fill="#FF1493"
        />
      </Svg>

      {/* Rotating outer wheel */}
      <Animated.View style={[wheelStyle, { position: "absolute" }]}>
        <Svg width={wheelSize} height={wheelSize}>
          {/* Rotating outer alphabet and dividers */}
          {outerWheelLetters}
        </Svg>
      </Animated.View>

      {/* Shift indicator - positioned at bottom with spacing */}
      <View style={dynamicStyles.shiftIndicator}>
        <Text style={dynamicStyles.shiftText}>Shift: {currentShift}</Text>
      </View>
    </View>
  );
};

export default CipherWheel;
