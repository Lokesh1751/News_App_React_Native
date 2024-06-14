import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { FIREBASE_AUTH } from "../../Firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setrPassword] = useState("");

  const auth = FIREBASE_AUTH;

  const SignUp = async () => {
    try {
      if (password === rpassword) {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        Alert.alert("Sign Up Successful");
        setEmail("");
        setPassword("");
      } else {
        Alert.alert("Passwords are not matching!!");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Sign Up Failed");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          margin: 20,
          backgroundColor: "#012540",
          padding: 13,
          borderRadius: 30,
        }}
      >
        <Text style={[{ fontSize: 30, color: "white", fontWeight: "bold" }]}>
          News Express
        </Text>
        <Text style={{ fontSize: 30 }}>📰</Text>
      </View>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        secureTextEntry={true}
        onChangeText={setrPassword}
        value={rpassword}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          color="#012540"
          onPress={() => navigation.navigate("Login")}
        />
        <Button title="Sign Up" color="#012540" onPress={SignUp} />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Light gray background
    paddingHorizontal: 20,
  },
  title: {
    color: "#012540",
    fontSize: 30,
    margin: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: "90%",
    backgroundColor: "#fff", // White background for inputs
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 30,
    marginTop: 20,
  },
});
