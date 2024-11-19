import React, { useState } from "react";
import { SlSocialSpotify } from "react-icons/sl";
import axios from "axios";

function App() {
  const [URL, setURL] = useState("");

  const handleURL = (e) => {
    e.preventDefault();
    setURL(e.target.value);
  };

  const downloadSong = async () => {
    if (!URL) {
      console.log("Please enter a valid URL.");
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: {
        songId: URL,  // using the actual URL value
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com',
      },
    };

    try {
      const resp = await axios.request(options);
      // Initiate download by setting the window location to the download link
      window.location.href = resp.data.data.downloadLink;
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-600 via-emerald-600 to-amber-500 flex items-center justify-center flex-col gap-y-5">
      <div className="flex items-center justify-center gap-x-2 text-xl font-bold">
        <SlSocialSpotify size={50} />
        <p>Song Downloader</p>
        
      </div>
      <div className="flex gap-x-2">
        <input
          type="url"
          placeholder="Enter Spotify URL"
          className="h-10 w-[450px] border-none outline-none px-2 rounded-lg"
          onChange={handleURL}
        />
        <button
          className="bg-white h-10 px-2 rounded-lg font-bold hover:bg-black hover:text-white"
          onClick={downloadSong}  // call downloadSong on button click
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
