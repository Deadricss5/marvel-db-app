import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Grow';

interface Props {
    thumbnail: string;
    id: string;
    name: string;
    timeout: number;
}

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      width: 345,
      margin: '10px',
    },
    media: {
      height: '150px',
      paddingTop: '56.25%',
    },
    title: {
      height: '65px',
    },
  });
});

export default function MediaCard({
  thumbnail, id, name, timeout,
}: Props) {
  const classes = useStyles();
  const fullThmb: string = `${thumbnail}.jpg`;

  return (
    <Zoom in={Boolean(id)} timeout={timeout}>
      <Card className={classes.root} key={id}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={fullThmb}
            title={name}
          />
          <CardContent>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Zoom>
  );
}
