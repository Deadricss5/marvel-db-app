import React from 'react';
import Card from '@material-ui/core/Card';
import {
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Zoom,
} from '@material-ui/core/';
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
    <Zoom in timeout={timeout}>
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
