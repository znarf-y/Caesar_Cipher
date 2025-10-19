import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Grid pattern component
const PixelGrid: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    const animateGrid = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]).start(() => animateGrid());
    };

    animateGrid();
  }, [opacity]);

  const gridSize = 40;
  const horizontalLines = Math.floor(screenHeight / gridSize);
  const verticalLines = Math.floor(screenWidth / gridSize);

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: screenWidth,
        height: screenHeight,
        opacity,
      }}
    >
      {/* Horizontal lines */}
      {Array.from({ length: horizontalLines }).map((_, index) => (
        <View
          key={`h-${index}`}
          style={{
            position: "absolute",
            top: index * gridSize,
            left: 0,
            width: screenWidth,
            height: 1,
            backgroundColor: "#FF69B4",
            opacity: 0.2,
          }}
        />
      ))}

      {/* Vertical lines */}
      {Array.from({ length: verticalLines }).map((_, index) => (
        <View
          key={`v-${index}`}
          style={{
            position: "absolute",
            top: 0,
            left: index * gridSize,
            width: 1,
            height: screenHeight,
            backgroundColor: "#FF69B4",
            opacity: 0.2,
          }}
        />
      ))}
    </Animated.View>
  );
};

// Floating pixel particle component
interface FloatingPixelProps {
  size: number;
  color: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
  shape: "square" | "circle" | "diamond";
}

const FloatingPixel: React.FC<FloatingPixelProps> = ({
  size,
  color,
  startX,
  startY,
  endX,
  endY,
  duration,
  delay,
  shape,
}) => {
  const translateX = useRef(new Animated.Value(startX)).current;
  const translateY = useRef(new Animated.Value(startY)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.3)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      // Reset position
      translateX.setValue(startX);
      translateY.setValue(startY);
      opacity.setValue(0);
      scale.setValue(0.3);
      rotation.setValue(0);

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: endX,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: endY,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(rotation, {
            toValue: 360,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 1,
              duration: duration * 0.3,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: duration * 0.7,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start(() => {
        setTimeout(animate, Math.random() * 3000 + 1000);
      });
    };

    animate();
  }, [
    translateX,
    translateY,
    opacity,
    scale,
    rotation,
    startX,
    startY,
    endX,
    endY,
    duration,
    delay,
  ]);

  const getShapeStyle = () => {
    const baseStyle = {
      width: size,
      height: size,
      backgroundColor: color,
    };

    switch (shape) {
      case "circle":
        return { ...baseStyle, borderRadius: size / 2 };
      case "diamond":
        return { ...baseStyle, transform: [{ rotate: "45deg" }] };
      default:
        return { ...baseStyle, borderRadius: 2 };
    }
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        transform: [
          { translateX },
          { translateY },
          { scale },
          {
            rotate: rotation.interpolate({
              inputRange: [0, 360],
              outputRange: ["0deg", "360deg"],
            }),
          },
        ],
        opacity,
      }}
    >
      <View style={getShapeStyle()} />
    </Animated.View>
  );
};

// Main enhanced pixel background component
const EnhancedPixelBackground: React.FC = () => {
  const pixels = React.useMemo(() => {
    const pixelConfigs = [];
    const colors = [
      "#FFE4E1",
      "#FFC0CB",
      "#FFB6C1",
      "#FF69B4",
      "#DDA0DD",
      "#E6E6FA",
      "#F0E68C",
      "#87CEEB",
    ];

    const shapes: Array<"square" | "circle" | "diamond"> = [
      "square",
      "circle",
      "diamond",
    ];

    // Create 25 floating pixels
    for (let i = 0; i < 25; i++) {
      const startX = Math.random() * screenWidth;
      const startY = screenHeight + Math.random() * 100;
      const endX = startX + (Math.random() - 0.5) * 200;
      const endY = -100 - Math.random() * 100;

      pixelConfigs.push({
        id: i,
        size: Math.random() * 16 + 6, // 6-22px
        color: colors[Math.floor(Math.random() * colors.length)] + "60", // Add transparency
        startX,
        startY,
        endX,
        endY,
        duration: Math.random() * 8000 + 6000, // 6-14 seconds
        delay: Math.random() * 5000, // 0-5 second delay
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    return pixelConfigs;
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
      pointerEvents="none"
    >
      {/* Subtle grid pattern */}
      <PixelGrid />

      {/* Floating pixels */}
      {pixels.map((pixel) => (
        <FloatingPixel
          key={pixel.id}
          size={pixel.size}
          color={pixel.color}
          startX={pixel.startX}
          startY={pixel.startY}
          endX={pixel.endX}
          endY={pixel.endY}
          duration={pixel.duration}
          delay={pixel.delay}
          shape={pixel.shape}
        />
      ))}
    </View>
  );
};

export default EnhancedPixelBackground;
