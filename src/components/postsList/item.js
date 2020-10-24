import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Button, CardActions, ListItem, ListItemText, Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      width: '100%',
      padding: theme.spacing(0, 0, 2)
    },
    card: {
      width: '100%',
    },
    text: {
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }
  }),
)

const PostsListItem = ({ item, onOpenModal }) => {
  const classes = useStyles()
  const title = item.text.substring(0, 200)

  const handleOpen = () => {
    onOpenModal(item)
  }

  return (
    <ListItem className={classes.list}>
      <Card className={classes.card}>
        <CardContent>
          <ListItemText className={classes.text}>
            {title}
          </ListItemText>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen} color="primary">
            Open
          </Button>
        </CardActions>
      </Card>
    </ListItem>
  )
}

export default PostsListItem
