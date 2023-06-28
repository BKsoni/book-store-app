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
import UpdateCategoryForm from "./UpdateCategoryForm"; 
import AddCategoryForm from "./AddCategoryForm";
import { useStyles } from "../../assets/Style";

const END_POINT = "/api/category/all"; // Update with the category API endpoint

const CategoryMng = () => {
  const [categories, setCategories] = useState([]); // Rename 'books' to 'categories'
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); // Rename 'selectedBook' to 'selectedCategory'
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // Rename 'deleteBookId' to 'deleteCategoryId'
  const classes = useStyles();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(END_POINT);
        if (response.status === 200) {
          setCategories(response.data.result); // Update 'books' to 'categories'
        }
      } catch (error) {
        toast.error("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setSelectedCategory(category); 
    setEditDialogOpen(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    setDeleteCategoryId(categoryId); 
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteCategory = async () => {
    try {
      console.log(deleteCategoryId)
      await axios.delete(`/api/category?id=${deleteCategoryId}`); 
      setCategories(categories.filter((category) => category.id !== deleteCategoryId)); 
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setDeleteConfirmationOpen(false);
    }
  };

  const cancelDeleteCategory = () => {
    setDeleteConfirmationOpen(false);
    setDeleteCategoryId(null); // Rename 'deleteBookId' to 'deleteCategoryId'
  };

  const handleEditDialogClose = () => {
    setSelectedCategory(null); // Rename 'selectedBook' to 'selectedCategory'
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
      <Typography variant="h4" className={classes.heading} gutterBottom>
        Category Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddDialogOpen} className={classes.addButton}>
        Add Category
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
              {categories.map((category) => (
                <TableRow key={category.id} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableBodyCell}>{category.name}</TableCell>
                  <TableCell className={classes.tableBodyCell}>{category.description}</TableCell>
                  <TableCell className={classes.actionButtons}>
                    <Button variant="contained" color="primary" onClick={() => handleEditCategory(category)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteCategory(category.id)}>
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
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          {selectedCategory && <UpdateCategoryForm category={selectedCategory} onClose={handleEditDialogClose} />} 
        </DialogContent>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleAddDialogClose} className={classes.addDialog}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <AddCategoryForm onClose={handleAddDialogClose} />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDeleteCategory} className={classes.confirmationDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category?</Typography>
          <div className={classes.confirmationButtons}>
            <Button variant="contained" color="secondary" onClick={confirmDeleteCategory}>
              Delete
            </Button>
            <Button variant="contained" color="default" onClick={cancelDeleteCategory}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryMng;
