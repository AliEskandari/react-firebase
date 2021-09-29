import { useState, useEffect } from "react";
import { getUserVideosByUserId } from "../services/firebase";

export default function useVideos(user) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getUserVideos() {
      const results = await getUserVideosByUserId(user.uid);
      // re-arrange array to be newest videos first by dateCreated
      results.sort((a, b) => b.dateCreated - a.dateCreated);
      setVideos(results);
    }

    getUserVideos();
  }, [user?.uid]);

  return { videos };
}
