import {Card, Container} from "react-bootstrap";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import league_background from "../../assets/league-background.jpg";
import borderImage from "../../assets/league-border.png";

const {shell} = window.require('electron');

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        leagueBorder: {
            border: '5px solid transparent !important',
            borderSpacing: '0 !important',
            borderImage: `url(${borderImage}) 30 round !important`
        }
    }));

export default function LeagueCard(props: any) {
    const classes = useStyles();
    return (
        <Card
            className={`p-0 m-0 ${classes.leagueBorder} text-white mb-4 mr-4 mr-4 col-12 border-0 league-card`}>
            <Card.Img variant={"top"} className={"w-100 border-0 unselectable"}
                      src={props['news']['imageUrl']}/>
            <Card.Body>
                <Card.Title>
                    <Container className={"p-0 league-font"}>
                        <span>{props['news']['title']}</span>
                    </Container>
                </Card.Title>
                <Card.Subtitle
                    className="mb-2 text-muted">{new Date(props['news']['date']).toLocaleString(undefined).replaceAll(":00", "")}</Card.Subtitle>
                <Card.Text>
                    {props['news']['description']}
                </Card.Text>
                <h5>
                    <button
                        onClick={() =>
                            shell.openExternal(
                                (props['news']['link']['internal'] ?
                                    'https://na.leagueoflegends.com/en-us/' : '')
                                + props['news']['link']['url'])
                        }
                        // className={"league-font league-button card-button left ml-2 unselectable"}
                        className={"card-button league-button left ml-2 league-font unselectable"}
                    >Read more
                    </button>
                </h5>
            </Card.Body>
        </Card>
    );
}