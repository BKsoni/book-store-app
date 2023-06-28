import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import UpdateBookForm from "./UpdateBookForm";
import AddBookForm from "./AddBookForm";
import { useStyles } from "../../assets/Style";

const END_POINT = "/api/book/all";

const BookManagementPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
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

  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditDialogOpen(true);
  };

  const handleDelete = async (bookId) => {
    setDeleteBookId(bookId);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/book?id=${deleteBookId}`);
      setBooks(books.filter((book) => book.id !== deleteBookId));
      toast.success("Book deleted successfully");
    } catch (error) {
      toast.error("Failed to delete book");
    } finally {
      setDeleteConfirmationOpen(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteBookId(null);
  };

  const handleEditDialogClose = () => {
    setSelectedBook(null);
    setEditDialogOpen(false);
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  return (
    <div className={classes.container}>
     <Typography variant="h4"className={classes.heading} gutterBottom>
        Book Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddDialogOpen} className={classes.addButton}>
        Add Book
      </Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableHeadCell}>Name</TableCell>
                <TableCell className={classes.tableHeadCell}>Description</TableCell>
                <TableCell className={classes.tableHeadCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableBodyCell}>{book.name}</TableCell>
                  <TableCell className={classes.tableBodyCell}>{book.description}</TableCell>
                  <TableCell className={classes.actionButtons}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(book)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(book.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

<Dialog open={editDialogOpen} onClose={handleEditDialogClose} className={classes.editDialog}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          {selectedBook && <UpdateBookForm book={selectedBook} onClose={handleEditDialogClose} />}
        </DialogContent>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleAddDialogClose} className={classes.addDialog}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <AddBookForm onClose={handleAddDialogClose} />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete} className={classes.confirmationDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this book?</Typography>
          <div className={classes.confirmationButtons}>
            <Button variant="contained" color="secondary" onClick={confirmDelete}>
              Delete
            </Button>
            <Button variant="contained" color="default" onClick={cancelDelete}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookManagementPage;
