import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const UFbackground = require("@/assets/images/UFbackground.png");

export default function RegisterScreen() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://167.96.189.94:4000";

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
      console.error("Error registering:", err);
      Alert.alert("Error", "Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={UFbackground} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome to{"\n"}
          <Text style={styles.brand}>Universal Fitness</Text>
        </Text>

        <View style={styles.form}>
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
        </View>

        <LinearGradient
          colors={['#3da7ff', '#007BFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientButton}
        >
          <TouchableOpacity
            style={styles.buttonInner}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity style={styles.loginButton} onPress={() => router.replace("/")}>
          <Text style={styles.loginText}>Already have an account? Login here</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "flex-start",
    paddingTop: 150,
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#b5c4d3ff",
    textAlign: "left",
  },
  brand: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#00AFFF",
    textShadowColor: "#00AFFF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
    form: {
    marginTop: 40,
  },
  input: {
    width: "100%",
    height: 55,
    borderWidth: 2,
    borderColor: "#00AFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
    color: "#EAEAEA",
  },
   gradientButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  buttonInner: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 25,
    alignItems: "center",
  },
  loginText: {
    color: '#00AFFF',
    fontSize: 16,
  },
});