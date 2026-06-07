import type { JSX } from "react";

export const isEmbeddable = (url: string) => {
  return getEmbedUrl(url) !== null;
};

export const getEmbedUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);

    // YouTube Video
    if (urlObj.hostname.includes("youtube.com") && urlObj.pathname === "/watch") {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (urlObj.hostname.includes("youtu.be")) {
      const videoId = urlObj.pathname.slice(1);
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }

    // Spotify Track/Album/Playlist
    if (urlObj.hostname.includes("spotify.com")) {
      // Example: https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp
      // Embed: https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp
      const parts = urlObj.pathname.split("/").filter(Boolean);
      if (parts.length >= 2 && ["track", "album", "playlist", "episode"].includes(parts[0])) {
        return `https://open.spotify.com/embed/${parts[0]}/${parts[1]}?utm_source=generator`;
      }
    }

    return null;
  } catch (e) {
    return null;
  }
};

export const EmbedWidget = ({ url }: { url: string }) => {
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) return null;

  if (embedUrl.includes("youtube.com")) {
    return (
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 my-4">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  if (embedUrl.includes("spotify.com")) {
    const isTrackOrEpisode = embedUrl.includes("/track/") || embedUrl.includes("/episode/");
    return (
      <div className="w-full rounded-xl overflow-hidden shadow-lg border border-white/10 my-4">
        <iframe
          src={embedUrl}
          width="100%"
          height={isTrackOrEpisode ? "152" : "352"}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    );
  }

  return null;
};
