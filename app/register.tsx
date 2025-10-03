import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://167.96.161.195:4000";

  const handleRegister = async () => {
    if (!displayName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: displayName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Register failed", data.error || "Something went wrong");
      } else {
        Alert.alert("Success", "Account created! You can now log in.");
        router.replace("/"); // go back to login page
      }
    } catch (err) {
      console.error("❌ Error registering:", err);
      Alert.alert("Error", "Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Reuse Welcome Branding */}
      <Text style={styles.title}>
        Welcome to{"\n"}
        <Text style={styles.brand}>Universal Fitness</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Registering..." : "Register"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => router.replace("/")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A1A",
    padding: 30,
    justifyContent: "flex-start",
    paddingTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#00B8D4",
    marginBottom: 20,
    textAlign: "left",
  },
  brand: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#00E5FF",
    textShadowColor: "#00E5FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  input: {
    width: "85%",
    height: 55,
    borderWidth: 2,
    borderColor: "#00B8D4",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
    color: "#EAEAEA",
    backgroundColor: "#102030",
    alignSelf: "center",
  },
  button: {
    width: "85%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#00E5FF",
  },
  buttonText: {
    color: "#0A0A1A",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#00E5FF",
    fontSize: 16,
    fontWeight: "600",
  },
});