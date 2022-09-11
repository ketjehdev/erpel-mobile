import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  usState,
} from "react-native";

const movieApi = "https://reactnative.dev/movies.json";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState([]);
  const [data, setData] = useState([]);

  // fetching API data
  useEffect(() => {
    fetch(movieApi)
      .then((response) => response.json()) // if api give response executed code bottom
      .then((json) => {
        setTitle(json.title);
        setData(json.movies);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>
              {item.id}, {item.title}
            </Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
