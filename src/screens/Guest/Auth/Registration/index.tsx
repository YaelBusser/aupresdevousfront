import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInput, Button } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import styles from "./styles.tsx";

type ConnectionProps = {
  navigation: StackNavigationProp<any>;
};

const AuthRegistration: React.FC<ConnectionProps> = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const handleNomChange = (nom: string) => setNom(nom);
  const handlePrenomChange = (prenom: string) => setPrenom(prenom);
  const handleEmailChange = (email: string) => setEmail(email);
  const handleMdpChange = (mdp: string) => setMdp(mdp);

  const handleRegistration = async () => {
    try {
      const response = await fetch("http://192.168.78.112:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nom, prenom, mail: email, mdp })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Inscription réussie", "Vous pouvez maintenant vous connecter.");
        navigation.navigate("Login"); // Rediriger vers la page de connexion
      } else {
        Alert.alert("Erreur", data.message || "Une erreur est survenue lors de l'inscription.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête d'inscription : ", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la requête d'inscription.");
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.containerForm}>
          <Text style={styles.title}>S'inscrire</Text>
          <TextInput
            label="Nom"
            placeholder="Nom"
            placeholderTextColor="#8391A1"
            outlineColor={Colors.red}
            value={nom}
            onChangeText={handleNomChange}
            mode="outlined"
            style={styles.textInputs}
          />
          <TextInput
            label="Prénom"
            placeholder="Prénom"
            placeholderTextColor="#8391A1"
            outlineColor={Colors.red}
            value={prenom}
            onChangeText={handlePrenomChange}
            mode="outlined"
            style={styles.textInputs}
          />
          <TextInput
            label="Adresse mail"
            placeholder="Adresse mail"
            placeholderTextColor="#8391A1"
            outlineColor={Colors.red}
            value={email}
            onChangeText={handleEmailChange}
            mode="outlined"
            style={styles.textInputs}
          />
          <TextInput
            label="Mot de passe"
            placeholder="Mot de passe"
            placeholderTextColor="#8391A1"
            outlineColor={Colors.red}
            secureTextEntry
            value={mdp}
            onChangeText={handleMdpChange}
            mode="outlined"
            style={styles.textInputs}
          />
          <Button mode="contained" style={styles.buttonForm} onPress={handleRegistration}>
            S'inscrire
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AuthRegistration;
