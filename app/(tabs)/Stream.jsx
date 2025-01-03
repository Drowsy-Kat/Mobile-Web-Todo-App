import { useVideoPlayer, VideoView } from "expo-video";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
const videoSource = "http://drowsykat.dev:8088/hls/stream.m3u8";

export default function VideoScreen() {
  const [currentTime, setCurrentTime] = useState(0);

  const player = useVideoPlayer(videoSource, (player) => {});

  useEffect(() => {
    // Automatically play the video when the player is ready
    if (player && player.play) {
      player.play();
    }
  }, [player]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player && player.currentTime) {
        setCurrentTime(player.currentTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [player]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.liveBar}>
        <Text style={styles.live}> ● Live</Text>
      </View>

      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={true}
        allowsPictureInPicture={true}
        showNowPlayingNotification={true}
        playing={true}
      />
      <View style={styles.titleBar}>
        <Image
          style={styles.profilePhoto}
          source={require("../../assets/images/pfp.png")}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.user}>DrowsyKat</Text>
          <Text style={styles.title}>Live Demo</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{formatTime(currentTime)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "rgb(22, 22, 22)",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  liveBar: {
    width: "100%",
    backgroundColor: "rgb(50,50,50)",
    alignContent: "flex-start",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  live: {
    color: "red",
    padding: 2,
  },
  titleBar: {
    backgroundColor: "rgb(50,50,50)",
    width: "100%",
    flexDirection: "row",
    padding: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  profilePhoto: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 4,
  },
  user: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginTop: -12,
  },
  title: {
    color: "#3073ee",
    marginBottom: -4,
  },
  time: {
    color: "rgb(150,150,150)",
    fontWeight: "600",
  },
  timeContainer: {
    justifyContent: "center",
  },
});
