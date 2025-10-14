import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";

const UFbackground = require("@/assets/images/uflastbackground.png");

export default function HomeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://167.96.189.94:4000";

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Login failed", data.error || "Something went wrong");
      } else {
        Alert.alert("Success", `Welcome back ${data.user.display_name || data.user.email}`);
        console.log("JWT Token:", data.token);
        router.replace("/(tabs)/home");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      Alert.alert("Error", "Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <ImageBackground source={UFbackground} resizeMode="cover" style={styles.background}>
      <View style={styles.overlay}>
        {/* Title */}
        <Text style={styles.title}>
          Welcome to{"\n"}
          <Text style={styles.brand}>Universal Fitness</Text>
        </Text>

        {/* Login Form */}
        <View style={styles.form}>
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

          <LinearGradient
            colors={['#4facfe', '#007BFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              style={styles.buttonInner}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>Don’t have an account? Register here</Text>
          </TouchableOpacity>
        </View>
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
  overlay: {
    flex: 1,
    paddingHorizontal: 30,
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
  },
  buttonInner: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerButton: {
    marginTop: 25,
    alignItems: "center",
  },
  registerText: {
    color: '#00AFFF',
    fontSize: 16,
  },
});