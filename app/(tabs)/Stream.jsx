import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Video from "react-native-video";

const LiveSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const Stream = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <View style={styles.contentContainer}>
      <Video
        source={{ uri: LiveSource }}
        controls={true}
        style={styles.video}
        resizeMode="contain"
        paused={!isPlaying}
      />
    </View>
  );
};

export default Stream;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
});
