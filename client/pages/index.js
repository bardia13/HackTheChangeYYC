import {useRouter} from 'next/router'
import {Alert, Button, Card, InputGroup} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

export default function Home() {
    const router = useRouter()
    const submitContact = async (event) => {
        event.preventDefault();
        const link = event.target[0].value;
        console.log(link)
        const parts = link.substring(link.lastIndexOf('?') + 1, link.length).split("&")
        parts.forEach(part => {
            if (part.startsWith("v=")) {
                const vid_id = part.substring(part.lastIndexOf('=') + 1, part.length)
                router.push({pathname: '/video', query: {vid: vid_id}})
            }
        })
    }

    const divStyle = {
        background: `url("/background.jpeg") no-repeat center center fixed`,
        backgroundSize: 'cover',
        height: '100vh',
        overflow: 'hidden'
    }

    const cardStyle = {
        width: '30%'
    }
    return (
        <div className='p-8 justify-center items-center h-screen flex' style={divStyle}>
            <Card className="text-center" style={cardStyle}>
                <Card.Header>App Name</Card.Header>
                <Card.Body>
                    <Card.Title>Please enter the Youtube URL:</Card.Title>
                        <form className='flex' onSubmit={submitContact}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="https://youtube.com/?v=1234"
                                    aria-label="https://youtube.com/?v=1234"
                                    aria-describedby="basic-addon2"
                                    type='text'
                                    id='video-link'
                                />
                                <Button variant="dark" id="button-addon2" type='submit'>
                                    Button
                                </Button>
                            </InputGroup>
                        </form>
                </Card.Body>
            </Card>
        </div>
    )
}
