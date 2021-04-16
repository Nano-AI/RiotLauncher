import { Card, Container } from 'react-bootstrap';

const { shell } = window.require('electron');

export default function ValorantCard(props: any) {
  return (
    <Card className={'text-white mb-4 mr-4 mr-4 col-12 p-0 border-0 valorant-card'}>
      <Card.Img
        variant={'top'}
        className={'w-100 border-0 unselectable'}
        src={props['news']['banner']['url']}
      />
      <Card.Body>
        <Card.Title className={'valorant-font'}>
          <Container className={'p-0'}>
            <span>{props['news']['title']}</span>
          </Container>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(props['news']['date']).toLocaleString(undefined).replaceAll(':00', '')}
        </Card.Subtitle>
        <Card.Text>{props['news']['description']}</Card.Text>
        <h5>
          <button
            onClick={() =>
              shell.openExternal(`https://playvalorant.com/en-us/${props['news']['url']['url']}`)
            }
            className={'card-button valorant-button left ml-2 valorant-font unselectable'}
          >
            Read more
          </button>
        </h5>
      </Card.Body>
    </Card>
  );
}
