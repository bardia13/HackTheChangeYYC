import {useRouter} from 'next/router'
import YouTube from "react-youtube";
import {getSummary} from "../call/ml";
import {SUMMARYV1} from "../call/ml";
import {useState, useEffect} from 'react'
import {Card} from "react-bootstrap";

function secondsToClockFormat(seconds) {
    if (seconds < 3600)
        return new Date(seconds * 1000).toISOString().slice(14, 19);
    else
        return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function createHighlightedKeyword(keyword) {
    return `<span style='color:red'>${keyword.keyword}</span>`
}

function highlightKeywords(summary) {
    let text = summary.text
    summary.keywords.forEach(keyword => {
        console.log(createHighlightedKeyword(keyword))
        text = text.replaceAll(keyword.keyword, createHighlightedKeyword(keyword))
    })
    return <div dangerouslySetInnerHTML={{__html: text}} />
}

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

    const cardStyle = {
        marginTop: "20px"
    }

    const cardTitleStyle = {
        marginTop: "15px"
    }

    return (
        <div>
            <div>
                <YouTube videoId={videoId} opts={opts} onReady={_onReady}/>
            </div>
            <div className='p-8 justify-center h-screen flex'>
                <div>
                    <Card bg='dark' text='white'>
                        <Card.Body>
                            <Card.Title>Summary</Card.Title>
                        </Card.Body>
                    </Card>
                    {data.summaries.map((s) => (
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title>{secondsToClockFormat(s.start)} - {secondsToClockFormat(s.end)}</Card.Title>
                                <Card.Subtitle style={cardTitleStyle} className="mb-2 text-muted">{highlightKeywords(s)}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    ))}</div>
            </div>
        </div>
    );
}

function _onReady(event) {
    event.target.pauseVideo();
}