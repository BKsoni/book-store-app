import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import Result from "./Result";
import { useStyles } from "../../assets/Style";
import { Button, FormControl, InputLabel, Select, MenuItem, Typography } from "@material-ui/core";

const END_POINT = "/api/book/all";
const ITEMS_PER_PAGE = 6; // Number of books to display per page

const DisplayAll = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(END_POINT);
        if (response.status === 200) {
          setBooks(response.data.result);
        }
      } catch (error) {
        toast.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Calculate the index range for the current page
  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentBooks = books.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

  // Sort the books based on the selected order
  let sortedBooks = [...currentBooks];
  if (sortOrder === "asc") {
    sortedBooks.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "desc") {
    sortedBooks.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Change the sort order
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.heading} gutterBottom>Find your favorite book</Typography>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className={classes.filterContainer}>
            <FormControl variant="outlined" className={classes.sortOrderSelect}>
              <InputLabel id="filter-label">Sort Order</InputLabel>
              <Select
                labelId="filter-label"
                id="filter-select"
                value={sortOrder}
                onChange={handleSortOrderChange}
                label="Sort Order"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="asc">A-Z</MenuItem>
                <MenuItem value="desc">Z-A</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.cardContainer}>
            {sortedBooks.map((book) => (
              <Result
                bookId={book.id}
                name={book.name}
                img={book.base64image}
                desc={book.description}
                price={book.price}
              />
            ))}
          </div>
          <div className={classes.pagination}>
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                color="primary"
                disabled={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayAll;
