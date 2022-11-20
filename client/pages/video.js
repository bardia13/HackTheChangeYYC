import {useRouter} from 'next/router'
import YouTube from "react-youtube";
import {getSummary} from "../call/ml";
import {SUMMARYV1} from "../call/ml";
import {useState, useEffect} from 'react'
import {loadavg} from "os";

export default function Home(props) {
    const router = useRouter();
    const videoId = router.query.vid;
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const postData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"video_id": videoId})
    }
    useEffect(() => {
        if (!videoId) return
        setLoading(true)
        fetch(`${SUMMARYV1}`, postData)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [videoId])

    if (isLoading) return <p>Loading...</p>
    if (!data || !data.summaries) return <p>No profile data</p>
    const opts = {
        height: "500",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    return (
        <div>
            <YouTube videoId={videoId} opts={opts} onReady={_onReady}/>
            <label htmlFor="message"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary</label>
            <ol>{data.summaries.map((s) => (<li>{s.text}</li>))}</ol>
        </div>
    );
}

function _onReady(event) {
    event.target.pauseVideo();
}