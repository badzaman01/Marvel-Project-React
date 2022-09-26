import React, { useState } from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useGetData } from "../../custom-hooks";
import { serverCalls } from "../../api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { MarvelForm } from "../../components/DroneForm";
import { getAuth } from "firebase/auth";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 390 },
  {
    field: "name",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 270,
    editable: true,
  },
  {
    field: "comics_appeared_in",
    headerName: "Comics Appeared In",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "super_power",
    headerName: "Super Power",
    sortable: false,
    width: 418,
  },
];

interface gridData {
  data: {
    id?: string;
  };
}

export const DataTable = () => {
  const auth = getAuth();
  let { marvelData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([]);
  let handleOpen = () => {
    setOpen(true);
  };

  let handleClose = () => {
    setOpen(false);
  };

  let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`);
    getData();
  };

  console.log(gridData);

  if (auth.currentUser) {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <h2>Heroes In Inventory</h2>
        <DataGrid
          rows={marvelData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setData(newSelectionModel);
          }}
          {...marvelData}
        />
        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>
          Delete
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update A Hero</DialogTitle>
          <DialogContent>
            <DialogContentText>Hero id: {gridData[0]}</DialogContentText>
            <MarvelForm id={`${gridData[0]}`} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Sign In to View Your Heroes!</h3>
      </div>
    );
  }
};
