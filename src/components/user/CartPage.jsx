import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, CardMedia } from "@material-ui/core";
import { useAuth } from "../../context/auth";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { useStyles } from "../../assets/Style";

const END_POINT = "/api/cart";

const CartPage = () => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    fetchCartItems();
  });

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${END_POINT}?userId=${auth.user.id}`);
      if (response.status === 200) {
        setCartItems(response.data.result);
        //console.log(cartItems);
      }
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  const itemIncrease = async (item) => {
    try {
      const data = {
        id: item.id,
        bookId: item.bookId,
        userId: item.userId,
        quantity: item.quantity + 1,
      };
      const response = await axios.put(END_POINT, data);
      if (response.status === 200) {
        toast.success("Item Increased");
      }
    } catch (error) {
      toast.success("Failed", error);
    }
  };

  const itemDecrease = async (item) => {
    try {
      const data = {
        id: item.id,
        bookId: item.bookId,
        userId: item.userId,
        quantity: item.quantity - 1,
      };
      if (data.quantity === 0) {
        const response = await axios.delete(`${END_POINT}?id=${item.id}`);
        if (response.status === 200) {
          toast.success("Item Removed");
        }
      } else {
        const response = await axios.put(END_POINT, data);
        if (response.status === 200) {
          toast.success("Item Decreased");
        }
      }
    } catch (error) {
      toast.success("Failed", error);
    }
  };

  const placeOrder = async () => {
    try {
      const ids = cartItems.map((item) => item.id);
      console.log(ids)
      const data = {
        userId: auth.user.id,
        cartIds: ids
      };
      const response = await axios.post('/api/order', data);
      if (response.status === 200) {
        toast.success("Your Order Placed Successfully");
      }
    } catch (error) {
      toast.error("Failed", error);
    }
  }
  return (
    <div className={classes.container}>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        cartItems.map((item) => (
          <Card key={item.bookId} className={classes.card}>
            <CardMedia
              className={classes.media}
              component="img"
              alt="Book Cover"
              image={item.book.base64image}
              title="Book Cover"
            />
            <CardContent>
              <Typography variant="h6">{item.book.name}</Typography>
              <Typography variant="body1">Quantity: {item.quantity}</Typography>
              <Button onClick={() => itemIncrease(item)}>+</Button>
              <Button onClick={() => itemDecrease(item)}>-</Button>
            </CardContent>
          </Card>
        ))
      )}
      {cartItems.length !==0 ? (
        <Button onClick={() => placeOrder()}>Place Order</Button>) :(console.warn())}
      
    </div>
  );
};

export default CartPage;
