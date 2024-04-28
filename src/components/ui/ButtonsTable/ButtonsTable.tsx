import { Button } from "@mui/material";
import { useAppDispatch } from "../../../hooks/redux";
import { toggleModal } from "../../../redux/slices/ModalReducer";
import { setElementActive } from "../../../redux/slices/TablaReducer";
import { IPersona } from "../../../types/IPersona";

interface IButtonsTable {
  el: IPersona;
  handleDelete: (id: number) => void;
}

export const ButtonsTable = ({ el, handleDelete }: IButtonsTable) => {
  const dispatch = useAppDispatch();
  const handleModalSelected = () => {
    dispatch(setElementActive({ element: el }));
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
