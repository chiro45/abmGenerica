import { Button } from "@mui/material";
import { useAppDispatch } from "../../../hooks/redux";
import { openModalPersonaWithPersona } from "../../../redux/slices/ModalReducer";

export const ButtonsTable = ({ el }: any) => {
  const dispatch = useAppDispatch();
  const handleModalSelected = () => {
    dispatch(openModalPersonaWithPersona(el));
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Button variant="contained">
        <span className="material-symbols-outlined">delete_forever</span>
      </Button>

      <Button variant="contained" onClick={handleModalSelected}>
        <span className="material-symbols-outlined">edit</span>
      </Button>
    </div>
  );
};
