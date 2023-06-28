import React, { useState } from 'react';
import { useStyles } from "../../assets/Style";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import axios from '../../api/axios';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';

const END_POINT = '/api/cart';

const Result = ({ bookId, name, img, desc, price }) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const auth = useAuth();

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      const data = {
        "bookId": bookId,
        "userId": auth.user.id,
        "quantity": 1
      }
      console.log(data);
      const response = await axios.post(END_POINT,data);
      
      if (response.status === 200) {
        toast.success("Book added to cart");
      } else {
        toast.error("Failed to add book to cart");
      }
    } catch (error) {
      toast.error("Failed to add book to cart", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substr(0, maxLength) + '...';
  };

  const truncatedDesc = truncateDescription(desc, 50); // Change the number to set the desired maximum length

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleDialogOpen}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Book Cover"
          image={img}
          title="Book Cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {truncatedDesc}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            Price: ₹{price}/-
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button variant="contained" color="primary" onClick={handleAddToCart} disabled={addingToCart}>
        {addingToCart ? "Adding to Cart..." : "Add to Cart"}
      </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>About: {name}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Result;
