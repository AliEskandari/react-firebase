import { useState, useEffect } from "react";
import {
  getVideosByUserId,
  getNonExclusiveVideos,
  searchVideos,
} from "../services/firebase";

/**
 * Initializes videos to undefined until data is fetched
 * from backend.
 * @param {*} options filter videos by user or all; must choose one
 * @returns
 */
export default function useVideos({ user, all, searchQuery } = {}) {
  const [videos, setVideos] = useState();
  const [reload, setReload] = useState(null);

  useEffect(() => {
    async function fetchUserVideos() {
      const results = await getVideosByUserId(user.id);
      results.sort((a, b) => b.dateCreated - a.dateCreated); // newest first
      setVideos(results);
    }

    async function fetchNonExclusiveVideos() {
      const results = await getNonExclusiveVideos();
      results.sort((a, b) => b.dateCreated - a.dateCreated); // newest first
      setVideos(results);
    }

    async function fetchSearchVideos() {
      const results = await searchVideos(searchQuery);
      results.sort((a, b) => b.dateCreated - a.dateCreated); // newest first
      setVideos(results);
    }

    if (user) {
      fetchUserVideos();
      setReload(() => fetchUserVideos);
    } else if (all) {
      fetchNonExclusiveVideos();
    } else if (searchQuery) {
      fetchSearchVideos();
    }
  }, [user?.id, searchQuery]);

  return { videos, reload };
}
