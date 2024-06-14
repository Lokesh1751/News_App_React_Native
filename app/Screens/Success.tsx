import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_AUTH } from "../../Firebase.config"; // Adjust the path as needed
import { signOut } from "firebase/auth";

const Success = ({ navigation }: any) => {
  const [news, setNews] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("science");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (searchQuery: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=b3be9c6f734b42168d0b5d4eceab99f4`
      );
      const data = await res.json();
      setNews(data.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(query); // Fetch default query on mount
  }, []);

  const handleSearch = () => {
    fetchData(query);
  };

  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error(`Don't know how to open URL: ${url}`);
      }
    } catch (error) {
      console.error("Failed to open URL: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.navigate("Login");
      Alert.alert("Logout Successful");
    } catch (error) {
      console.error("Error logging out: ", error);
      Alert.alert("Logout Failed");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News Express</Text>
        <Text style={styles.headerIcon}>📰</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for news..."
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
        <Button title="Search" color={"#012540"} onPress={handleSearch} />
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : news.length > 0 ? (
        news.map((item, index) => (
          <View key={index} style={styles.newsItem}>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            )}
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.desc}>Author: {item.author}</Text>
            <Text style={styles.desc}>
              Date: {new Date(item.publishedAt).toLocaleDateString()}
            </Text>
            <Text style={styles.desc}>
             Source: {item.source.name}
            </Text>
            <Text style={styles.readMore} onPress={() => openLink(item.url)}>
              Read more...
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.loadingText}>No news found.</Text>
      )}
    </ScrollView>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: "#012540",
    padding: 13,
    borderRadius: 30,
  },
  headerTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  headerIcon: {
    fontSize: 30,
    marginLeft: 10,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 5,
  },
  newsItem: {
    marginBottom: 16,
    backgroundColor: "#012540",
    padding: 16,
    borderRadius: 30,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  loadingText: {
    fontSize: 18,
    color: "black",
  },
  desc: {
    color: "white",
  },
  readMore: {
    color: "white",
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});
