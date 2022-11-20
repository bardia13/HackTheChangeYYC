import {useRouter} from 'next/router'
import YouTube from "react-youtube";
import {getSummary, KEYWORDV1} from "../call/ml";
import {SUMMARYV1} from "../call/ml";
import {useState, useEffect, useRef} from 'react'
import {Button, Card, Image, Modal} from "react-bootstrap";
import reactStringReplace from 'react-string-replace';

function secondsToClockFormat(seconds) {
    if (seconds < 3600)
        return new Date(seconds * 1000).toISOString().slice(14, 19);
    else
        return new Date(seconds * 1000).toISOString().slice(11, 19);
}

export default function Home(props) {
    const router = useRouter();
    const videoId = router.query.vid;
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isPlayerSetSet, setPlayerSet] = useState(false)
    const [currentSecond, setCurrentSecond] = useState(0)
    const [modalContent, setModalContent] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setModalContent(null)
        setShow(false);
    }
    const handleShow = (keyword) => {
        setShow(true)
        if (ytRef.current != undefined)
            ytRef.current.getInternalPlayer().pauseVideo()

        // setLoading(true)
        fetch(`${KEYWORDV1}/${keyword.id}/`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setModalContent({
                    title: keyword.keyword,
                    text: data.detailedDescription.articleBody,
                    imageUrl: data.image ? data.image.contentUrl : null
                })
            })
    }

    const ytRef = useRef(null)

    const spanize = (summary) => {
        const highlightStyle = {
            color: 'red',
            cursor: 'pointer'
        }

        let res = [summary.text]

        summary.keywords.forEach((keyword) => {
            let result = []
            res.forEach(part => {
                if (!part.split)
                    result.push(part)
                else {
                    part.split(keyword.keyword).forEach(p => {
                        result.push(p)
                        result.push(<span onClick={() => handleShow(keyword)} style={highlightStyle}>{keyword.keyword}</span>)
                    })
                    result.pop()
                }
            })
            res = result
        })

        return (<div>{res}</div>)
    }

    useEffect(() => {
        let timeId = 0
        if (!videoId) return
        if (isPlayerSetSet)
            timeId = setInterval(() => {
                if (ytRef.current != undefined) {
                    ytRef.current.getInternalPlayer().getCurrentTime().then((r) => {
                        setCurrentSecond(r)
                    })
                }
            }, 1000)
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"video_id": videoId})
        }
        setLoading(true)
        fetch(`${SUMMARYV1}`, postData)
            .then((res) => res.json())
            .then((data) => {
                data.summaries.forEach(d => {
                    d["keywordsSTR"] = d.keywords.map(k => k.keyword).join("|")
                })
                console.log(data)
                setData(data)
                setLoading(false)
            })
        return () => {
            clearInterval(timeId)
        }
    }, [videoId, isPlayerSetSet])

    if (isLoading) return <p>Loading...</p>
    if (!data || !data.summaries) return <p>No data</p>
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

    const _onReady = (event) => {
        setPlayerSet(true)
    }

    const highlightStyle = {
        color: 'red'
    }

    return (
        <div>
            <div>
                <YouTube ref={ytRef} id={videoId} videoId={videoId} opts={opts} onReady={_onReady}/>
            </div>
            <div className='p-8 justify-center h-screen flex'>
                <div>
                    <Card bg='dark' text='white'>
                        <Card.Body>
                            <Card.Title>Summary</Card.Title>
                        </Card.Body>
                    </Card>
                    {data.summaries.map((s) => (
                        <Card style={cardStyle}
                              bg={(currentSecond >= s.start && currentSecond < s.end) ? "info" : "light"}>
                            <Card.Body>
                                <Card.Title>{secondsToClockFormat(s.start)} - {secondsToClockFormat(s.end)}</Card.Title>
                                <Card.Subtitle style={cardTitleStyle}
                                               className="mb-2 text-muted">{spanize(s)}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    ))}</div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent ? modalContent.title : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { modalContent && modalContent.imageUrl ? <Image fluid={true} src={modalContent.imageUrl} alt={modalContent.title}/> : ""}
                    {modalContent ? modalContent.text : 'Loading...'}
                </Modal.Body>
            </Modal>
        </div>
    );
}
