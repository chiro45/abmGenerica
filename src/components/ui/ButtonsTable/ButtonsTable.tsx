import { Button } from "@mui/material";
import { useAppDispatch } from "../../../hooks/redux";
import { toggleModal } from "../../../redux/slices/ModalReducer";
import { setElementActive } from "../../../redux/slices/TablaReducer";

export const ButtonsTable = ({ el, handleDelete }: any) => {
  const dispatch = useAppDispatch();
  const handleModalSelected = () => {
    dispatch(setElementActive(el));
    dispatch(toggleModal({ modalName: "modalPersona" }));
  };
  const handleDeleteItem = () => {
    handleDelete(el.id);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Button variant="contained" onClick={handleDeleteItem}>
        <span className="material-symbols-outlined">delete_forever</span>
      </Button>

      <Button variant="contained" onClick={handleModalSelected}>
        <span className="material-symbols-outlined">edit</span>
      </Button>
    </div>
  );
};
