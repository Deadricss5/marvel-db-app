import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Grow';
import './card.css';

interface IProps {
    thumbnail: string;
    id: string;
    name: string;
    timeout: number;
}

export default function MediaCard({
  thumbnail, id, name, timeout,
}: IProps): JSX.Element {
  const fullThumb = `${thumbnail}.jpg`;

  return (
    <Zoom in={Boolean(id)} timeout={timeout}>
      <Card className="card" key={id}>
        <CardActionArea>
          <CardMedia
            className="card-media"
            image={fullThumb}
            title={name}
            aria-label={id}
          />
          <CardContent>
            <Typography className="card-title" gutterBottom variant="h5" aria-label={id} component="h2">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Zoom>
  );
}
