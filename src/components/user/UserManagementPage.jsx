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
import UpdateUserForm from "./UpdateUserForm";

import { useStyles } from "../../assets/Style";

const END_POINT = "/api/user/all";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(END_POINT);
        if (response.status === 200) {
          setUsers(response.data.result);
        }
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDelete = async (userId) => {
    setDeleteUserId(userId);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/user?id=${deleteUserId}`);
      setUsers(users.filter((user) => user.id !== deleteUserId));
      toast.success("user deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setDeleteConfirmationOpen(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeleteUserId(null);
  };

  const handleEditDialogClose = () => {
    setSelectedUser(null);
    setEditDialogOpen(false);
  };

  return (
    <div className={classes.container}>
     <Typography variant="h4"className={classes.heading} gutterBottom>
        User Management
      </Typography>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableHeadCell}>FirstName</TableCell>
                <TableCell className={classes.tableHeadCell}>LastName</TableCell>
                <TableCell className={classes.tableHeadCell}>Email</TableCell>
                <TableCell className={classes.tableHeadCell}>Role</TableCell>
                <TableCell className={classes.tableHeadCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableBodyCell}>{user.firstName}</TableCell>
                  <TableCell className={classes.tableBodyCell}>{user.lastName}</TableCell>
                  <TableCell className={classes.tableBodyCell}>{user.email}</TableCell>
                  <TableCell className={classes.tableBodyCell}>{user.role}</TableCell>
                  <TableCell className={classes.actionButtons}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>
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
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
          {selectedUser && <UpdateUserForm user={selectedUser} onClose={handleEditDialogClose} />}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete} className={classes.confirmationDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
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

export default UserManagementPage;
