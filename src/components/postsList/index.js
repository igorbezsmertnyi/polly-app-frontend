import React, { useState } from "react"
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { List, Typography } from '@material-ui/core'

import PostModal from '../postModal/index'
import PostsListItem from './item'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      maxHeight: 500,
      padding: 0,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      overflow: 'scroll',
      padding: theme.spacing(1),
    },
  }),
)

const PostsList = ({ items }) => {
  const classes = useStyles()
  const [activeItem, setActiveItem] = useState(null)

  const handleOpen = (item) => {
    setActiveItem(item)
  }

  const handleClose = () => {
    setActiveItem(null)
  }

  return (
    <>
      <List className={classes.root}>
        {
          items.length ? items.map((item) => <PostsListItem key={item.id} item={item} onOpenModal={handleOpen} />) :
          <Typography variant="h3" component="p" color="textSecondary" align="center">No posts found</Typography>
        }

        <PostModal
          item={activeItem}
          onClose={handleClose}
        />
      </List>
    </>
  )
}

export default PostsList
