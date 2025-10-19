import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions } from "react-native";

interface PixelProps {
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  animationDuration: number;
  delay: number;
}

const AnimatedPixel: React.FC<PixelProps> = ({
  size,
  color,
  initialX,
  initialY,
  animationDuration,
  delay,
}) => {
  const translateY = useRef(new Animated.Value(initialY)).current;
  const translateX = useRef(new Animated.Value(initialX)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const startAnimation = () => {
      // Reset values
      translateY.setValue(initialY);
      translateX.setValue(initialX);
      opacity.setValue(0);
      scale.setValue(0.5);

      // Create staggered animations
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
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
          Animated.timing(translateY, {
            toValue: initialY - 200,
            duration: animationDuration,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: initialX + (Math.random() - 0.5) * 100,
            duration: animationDuration,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.8,
              duration: animationDuration * 0.3,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: animationDuration * 0.7,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start(() => {
        // Restart animation after completion
        setTimeout(startAnimation, Math.random() * 2000);
      });
    };

    startAnimation();
  }, [
    translateY,
    translateX,
    opacity,
    scale,
    initialX,
    initialY,
    animationDuration,
    delay,
  ]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        width: size,
        height: size,
        backgroundColor: color,
        transform: [{ translateX }, { translateY }, { scale }],
        opacity,
        borderRadius: 2,
      }}
    />
  );
};

const PixelBackground: React.FC = () => {
  const { width, height } = Dimensions.get("window");

  // Create pixel configurations
  const pixels = React.useMemo(() => {
    const pixelConfigs = [];
    const colors = [
      "#FFE4E1", // Light pink
      "#FFC0CB", // Pink
      "#FFB6C1", // Light pink
      "#FF69B4", // Hot pink (more transparent)
      "#DDA0DD", // Plum
      "#E6E6FA", // Lavender
    ];

    const pixelCount = 20;

    for (let i = 0; i < pixelCount; i++) {
      pixelConfigs.push({
        id: i,
        size: Math.random() * 12 + 8, // 8-20px
        color: colors[Math.floor(Math.random() * colors.length)] + "40", // Add transparency
        initialX: Math.random() * width,
        initialY: height + Math.random() * 100, // Start below screen
        animationDuration: Math.random() * 5000 + 8000, // 8-13 seconds
        delay: Math.random() * 5000, // 0-5 second delay
      });
    }

    return pixelConfigs;
  }, [width, height]);

  // Create floating geometric shapes
  const shapes = React.useMemo(() => {
    const shapeConfigs = [];
    const shapeColors = ["#FFE4E1", "#FFC0CB", "#FFB6C1", "#FF69B4"];

    for (let i = 0; i < 8; i++) {
      shapeConfigs.push({
        id: i,
        size: Math.random() * 20 + 15,
        color:
          shapeColors[Math.floor(Math.random() * shapeColors.length)] + "30",
        initialX: Math.random() * width,
        initialY: height + Math.random() * 50,
        animationDuration: Math.random() * 8000 + 10000,
        delay: Math.random() * 3000,
      });
    }

    return shapeConfigs;
  }, [width, height]);

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
      {/* Render pixels */}
      {pixels.map((pixel) => (
        <AnimatedPixel
          key={pixel.id}
          size={pixel.size}
          color={pixel.color}
          initialX={pixel.initialX}
          initialY={pixel.initialY}
          animationDuration={pixel.animationDuration}
          delay={pixel.delay}
        />
      ))}

      {/* Render larger shapes */}
      {shapes.map((shape) => (
        <AnimatedPixel
          key={`shape-${shape.id}`}
          size={shape.size}
          color={shape.color}
          initialX={shape.initialX}
          initialY={shape.initialY}
          animationDuration={shape.animationDuration}
          delay={shape.delay}
        />
      ))}
    </View>
  );
};

export default PixelBackground;
