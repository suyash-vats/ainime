import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'; 

type PlayerProps = {
  dataUrl: string; // Video URL
  serverName: string; // Server name
  frameStyle?: string; // Custom CSS class for styling
};

export const Player = ({ dataUrl, frameStyle }: PlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current) {
      // Initialize Plyr
      const player = new Plyr(playerRef.current, {
        
        autoplay: false
      });

      // Cleanup Plyr instance on unmount
      return () => {
        player.destroy();
      };
    }
  }, []);

  return (
    <div
      ref={playerRef}
      className={`plyr-container w-full xl:max-w-[45rem] ${frameStyle}`}
    >
      <video
        controls
        security='restricted'
        data-plyr-config={`{
          "type": "video",
          "sources": [{ "src": "${dataUrl}", "type": "video/mp4" }]
        }`}
      >
        {/* Fallback message */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
