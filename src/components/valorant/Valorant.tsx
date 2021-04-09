import React, {useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import valorant_background from "../../assets/valorant-background.jpg";
import {Button, Card, Container, Row} from "react-bootstrap";
import './Valorant.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const {remote, shell} = window.require('electron');
const request = require('request');

const jumbotron_height = 350;
const size = remote.getCurrentWindow().getSize()
const max_height = size[1] - jumbotron_height;

const newsLang = "en-us";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jumboBackground: {
            height: jumbotron_height,
            backgroundImage: `url(${valorant_background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        }
    }));

export default function Valorant() {
    const classes = useStyles();
    const [vNews, setVNews] = useState([]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        request(
            'https://playvalorant.com/page-data/' + newsLang + '/news/page-data.json',
            { json: true }, (err:any, res:any, body:any) => {
                if (err) { return console.log(err); }
                try {
                    console.log(body['result']['data'])
                    // let news = [...body['result']['data']['contentstackNews']['featured_news']['reference']];
                    setVNews(body['result']['data']['contentstackNews']['featured_news']['reference']);

                } catch (error) {
                    console.error(error);
                }
            });
    };
    console.log(max_height)
    return (
        <div>
            <div className={`jumbotron rounded-0 p-0 ${classes.jumboBackground}`}>

                {/*<img src={jumbo_background} className={classes.jumboBackground} />*/}
            </div>
            <SimpleBar style={{ maxHeight: max_height }}>
                <Container className={"mb-5"}>
                {/*<Container className={"mb-5 mt-4"}>*/}
                    <Row>
                        {vNews.map((element) => {
                            console.log(element)
                            return (
                                <div className={"col-6"}>
                                    <Card className={'text-white mb-4 mr-4 mr-4 col-12 p-0 border-0 valorant-card'}>
                                        <Card.Img variant={"top"} className={"w-100 border-0"} src={element['banner']['url']} />
                                        <Card.Body>
                                            <Card.Title>
                                                <Container className={"p-0"}>
                                                    <span>{element['title']}</span>
                                                </Container>
                                            </Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{new Date(element['date']).toLocaleString(undefined).replaceAll(":00", "")}</Card.Subtitle>
                                            <Card.Text>
                                                {element['description']}
                                            </Card.Text>
                                            {/*<a href={`https://playvalorant.com/en-us/${element['url']['url']}`}>Go somewhere</a>*/}
                                            <h5>
                                                <button
                                                    onClick={() => shell.openExternal(`https://playvalorant.com/en-us/${element['url']['url']}`)}
                                                    className={"card-button left ml-2"}
                                                >Read more
                                                </button>
                                            </h5>
                                            {/*<Button variant="primary"*/}
                                            {/*        className={"card-button"}*/}
                                            {/*        onClick={() => shell.openExternal(`https://playvalorant.com/en-us/${element['url']['url']}`)}*/}
                                            {/*>Read on Valorant News</Button>*/}
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </Row>
                </Container>
            </SimpleBar>
        </div>
    );
}
