import { useRouter } from 'next/router'
import YouTube from "react-youtube";

export default function Home(props) {
   const router = useRouter();
   const data = router.query;

   const opts = {
      height: "500",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    };

   return (
      <div>
          <YouTube videoId={data.vid} opts={opts} onReady={_onReady} />
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary</label>
          <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
      </div>
   );
}

function _onReady(event) {
  event.target.pauseVideo();
}