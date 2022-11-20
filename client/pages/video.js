import {useRouter} from 'next/router'
import YouTube from "react-youtube";
import {getSummary, KEYWORDV1} from "../call/ml";
import {SUMMARYV1} from "../call/ml";
import {useState, useEffect, useRef} from 'react'
import {Button, Card, Image, InputGroup, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

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
    const [notes, setNotes] = useState([
        {
            author: "Bardia Abhari",
            authorAvatar: "https://img.icons8.com/color/512/person-male.png",
            creationDate: "November 20, 2022 - 04:31",
            text: "Depends on what you want to do.\n" +
                "Want to be a web dev? HTML/Javascript/CSS\n" +
                "Want to learn a simple programming language that will work for many things? Python\n" +
                "Want to become a game developer? C# or C++\n" +
                "Want to learn a programming language that will be a little painful to learn but will help you a lot and works in embedded systems, Operating Systems, Drivers, and smart electronics? "
        },
        {
            author: "Sara Jack",
            authorAvatar: "https://img.icons8.com/color/512/person-female.png",
            creationDate: "November 20, 2022 - 05:27",
            text: "I work for a huge company, recently started a web dev boot camp in addition to self study, " +
                "I mainly needed additional structure and guidance. I was on a work call ( i manage the support of 7 different software projects in production)," +
                " one of the senior devs was talking about assigning various tasks to freshies ie new devs. After the call I pinged him on skype and explained to him" +
                " that I've been coding for about 2 months and was really interested in learning more and if he had any advice on what I should focus on etc.. , dude this guy proceeded to just destroy me. I actually got nervous on the call because I wasn't prepared for it to turn so confrontational , since i wasn't even asking for a job."
        }
    ])
    // TODO: fetch list of notes from server

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
                        result.push(<span onClick={() => handleShow(keyword)}
                                          style={highlightStyle}>{keyword.keyword}</span>)
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

    const avatarStyle = {
        float: 'left',
        width: '200px',
        marginRight: '20px'
    }

    const submitNote = async (event) => {
        event.preventDefault();
        const noteText = event.target[0].value;
        // TODO: create a note
    }

    return (
        <div>
            <div>
                <YouTube ref={ytRef} id={videoId} videoId={videoId} opts={opts} onReady={_onReady}/>
            </div>
            <div className='p-8 justify-center  flex'>
                <div>
                    <Card bg='dark' text='white'>
                        <Card.Body>
                            <Card.Title>Summary</Card.Title>
                        </Card.Body>
                    </Card>
                    {data.summaries.map((s, idx) => (
                    <Card key={idx} style={cardStyle} bg={(currentSecond >= s.start && currentSecond < s.end) ? "info" : "light"}>
                        <Card.Body>
                            <Card.Title>{secondsToClockFormat(s.start)} - {secondsToClockFormat(s.end)}</Card.Title>
                            <Card.Subtitle style={cardTitleStyle}
                                           className="mb-2 text-muted">{spanize(s)}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                    ))}</div>
            </div>
            <div className='p-8 justify-center  flex'>
                <div>
                    <Card bg='dark' text='white'>
                        <Card.Body>
                            <Card.Title>Notes</Card.Title>
                        </Card.Body>
                    </Card>
                    {notes.map((note, idx) => (
                        <Card key={idx} style={cardStyle} bg="light">
                            <Card.Body>
                                <Card.Title>
                                    <Image thumbnail src={note.authorAvatar} style={avatarStyle}/>
                                    {note.author}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{note.creationDate}</Card.Subtitle>
                                <Card.Text>{note.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                    <Card style={cardStyle} bg="light">
                        <Card.Body>
                            <Card.Text>
                                <form onSubmit={submitNote}>
                                    <InputGroup>
                                        <InputGroup.Text>Have an idea?</InputGroup.Text>
                                        <Form.Control as="textarea" aria-label="With textarea"/>
                                        <Button variant="outline-secondary" id="button-addon2" type={"submit"}>
                                            Publish
                                        </Button>
                                    </InputGroup>
                                </form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent ? modalContent.title : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent && modalContent.imageUrl ?
                        <Image fluid={true} src={modalContent.imageUrl} alt={modalContent.title}/> : ""}
                    {modalContent ? modalContent.text : 'Loading...'}
                </Modal.Body>
            </Modal>
        </div>
    );
}
