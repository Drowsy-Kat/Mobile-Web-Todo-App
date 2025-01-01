import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, Platform } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, (player) => {});

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={true}
        allowsPictureInPicture={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgb(22, 22, 22)",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
});
