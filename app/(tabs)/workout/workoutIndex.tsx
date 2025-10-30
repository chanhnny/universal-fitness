import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/contexts/AuthContext";

export default function WorkoutScreen() {
  const { user } = useAuth();

  const categories = [
    "Powerlifting",
    "Bodybuilding",
    "Athletics",
    "Calisthenics",
    "Weight Loss",
  ];

  const handleCategoryPress = (category) => {
    console.log(`Selected: ${category}`);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#01030A", "#07182A", "#0B1F3A"]}
        style={styles.backgroundGradient}
      />

      <Text style={styles.welcome}>
        Welcome,{" "}
        <Text style={styles.username}>{user?.display_name || "User"}</Text>
      </Text>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={["#00AFFF", "#005CFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionGradient}
          >
            <Text style={styles.actionText}> Generate Workout</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={["#0E1830", "#102542"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionGradientAlt}
          >
            <Text style={styles.actionText}>📋 View My Plan</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Select Training Style</Text>
      <View style={styles.cardContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => handleCategoryPress(category)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#00AFFF", "#005CFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardBorder}
            >
              <View style={styles.cardInner}>
                <Text style={styles.cardText}>{category}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chatPrompt}>
        <Text style={styles.chatLabel}>Ask your UF Coach!</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.chatButton}>
          <LinearGradient
            colors={["#00AFFF", "#005CFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.chatGradient}
          >
            <Text style={styles.chatText}>"Quick high intensity workout"</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    alignItems: "center",
    backgroundColor: "#01030A",
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  welcome: {
    fontSize: 26,
    color: "#B5C4D3",
    fontWeight: "600",
    marginBottom: 30,
  },
  username: {
    color: "#00AFFF",
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 40,
  },
  actionButton: {
    borderRadius: 10,
    overflow: "hidden",
  },
  actionGradient: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  actionGradientAlt: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00AFFF",
  },
  actionText: {
    color: "#EAEAEA",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#B5C4D3",
    marginBottom: 20,
  },
  cardContainer: {
    alignItems: "center",
    gap: 18,
    marginBottom: 40,
  },
  cardBorder: {
    width: 350,
    height: 60,
    transform: [{ skewX: "-10deg" }],
    padding: 2,
  },
  cardInner: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    transform: [{ skewX: "10deg" }],
  },
  cardText: {
    color: "#EAEAEA",
    fontSize: 19,
    fontWeight: "600",
  },
  chatPrompt: {
    width: "85%",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 50,
  },
  chatLabel: {
    color: "#B5C4D3",
    fontSize: 15,
    marginBottom: 10,
  },
  chatButton: {
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
  },
  chatGradient: {
    paddingVertical: 14,
    borderRadius: 12,
  },
  chatText: {
    textAlign: "center",
    color: "#EAEAEA",
    fontSize: 15,
    fontWeight: "500",
  },
});