import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

interface Props {
    thumbnail: string;
    id: string;
    heroName: string;
    description: string;
}

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      maxWidth: 345,
      margin: '10px',
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
  });
});

export default function MediaCard({
  thumbnail, id, heroName, description,
}: Props) {
  const classes = useStyles();
  const fullThmb: string = `${thumbnail}.jpg`;

  return (
    <Card className={classes.root} key={id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={fullThmb}
          title={heroName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {heroName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
