import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import Hls from "hls.js";

// the source of the HLS Stream
const videoSource = "https://drowsykat.dev:8088/mystream.m3u8";

export default function VideoScreen() {
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const player =
    Platform.OS !== "web" ? useVideoPlayer(videoSource, (player) => {}) : null;

  // sets the page title to Stream on the web
  if (Platform.OS === "web") {
    document.title = "Stream";
  }

  useEffect(() => {
    if (Platform.OS === "web") {
      const videoElement = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSource);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoElement.play();
        });

        videoElement.addEventListener("timeupdate", () => {
          setCurrentTime(videoElement.currentTime);
        });

        return () => {
          hls.destroy();
          videoElement.removeEventListener("timeupdate", () => {});
        };
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = videoSource;
        videoElement.play();

        videoElement.addEventListener("timeupdate", () => {
          setCurrentTime(videoElement.currentTime);
        });
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player?.currentTime) {
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

  const handleError = (error) => {
    console.error("Video player error:", error);
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.videoContainer}>
        <View style={styles.liveBar}>
          <Text style={styles.live}> ● Live</Text>
        </View>

        {Platform.OS === "web" ? (
          <video
            ref={videoRef}
            style={styles.video}
            controls
            onError={handleError}
            muted={false}
          />
        ) : (
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen={true}
            allowsPictureInPicture={true}
            showNowPlayingNotification={true}
            playing={true}
            onError={handleError}
          />
        )}

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
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 5,
    alignItems: "baseline",
    width: "100%",
    justifyContent: "flex-start",
    height: "100%",
    backgroundColor: "rgb(22, 22, 22)",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  liveBar: {
    width: "100%",
    alignItems: "flex-start",
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
  videoContainer: {
    width: Platform.OS === "web" ? "70%" : "100%",
  },
});
