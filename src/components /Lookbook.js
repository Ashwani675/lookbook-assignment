import React, { useEffect, useState } from 'react';
import { looksData } from '../utills/data';
function Lookbook() {
    const [currentLook, setCurrentLook] = useState(0);
    const [currentMedia, setCurrentMedia] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isVideo, setIsVideo] = useState(false);
    const [muted, setMuted] = useState(true);
  
    const nextMedia = () => {
      if(looksData[currentLook].media.length - 1 > currentMedia){
        setCurrentMedia(currentMedia + 1);
      }else{
        nextLook();
      }
    };
  
    const prevMedia = () => {
      setCurrentMedia(currentMedia > 0 ? currentMedia - 1 : currentMedia);
    };
  
    const nextLook = () => {
      setCurrentLook((prev) => (prev < looksData.length - 1 ? prev + 1 : prev));
      setCurrentMedia(0);
    };
  
    const prevLook = () => {
      setCurrentLook((prev) => (prev > 0 ? prev - 1 : prev));
      setCurrentMedia(0);
    };

    useEffect(() => {
        if (!looksData[currentLook]) return;
        const media = looksData[currentLook].media[currentMedia];
        setIsVideo(media.type === "video");
        setProgress(0);
    
        if (media.type === "image") {
          const interval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 20 : 100));
          }, 1000);
          setTimeout(() => nextMedia(), 5000);
          return () => clearInterval(interval);
        }
      }, [currentLook, currentMedia]);

    return (
        <div className="lookbook-container">
      {looksData[currentLook] && (
        <div className="lookbook-content">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
         {
            progress > 0 &&  <p className='text-end'>{progress} % </p>
         }
          <div className="media-container mt-5">
            {isVideo ? (
              <video
                src={looksData[currentLook].media[currentMedia].src}
                autoPlay
                muted={muted}
                onEnded={nextMedia}
              />
            ) : (
                <div className="container">
                    <div className="card">
                    <img
                src={looksData[currentLook].media[currentMedia].src}
                alt="Look"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
                    </div>

                </div>
               
            )}
          </div>
          {looksData[currentLook].media[currentMedia].annotations?.map((a, i) => (
            <button
              key={i}
              className="annotation-dot"
              style={{ top: a.y + "%", left: a.x + "%" }}
              onClick={() => window.location.href = a.productLink}
            />
          ))}
          <button onClick={prevMedia} className="nav-button left">	&#8592;</button>
          <button onClick={nextMedia} className="nav-button right">&#8594;</button>
          <button onClick={prevLook} className="nav-button up">&#8593;</button>
          <button onClick={nextLook} className="nav-button down">&#8595;</button>
          {isVideo && (
            <button
              onClick={() => setMuted(!muted)}
              className="mute-button"
            >
              {muted ? <p>&#x1F507;</p> : <p>&#9662;</p>}
            </button>
          )}
        </div>
      )}
    </div>
    );
}

export default Lookbook;