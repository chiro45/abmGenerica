import { Button } from "@mui/material";

export const ButtonsTable = ({ el }: any) => {
  console.log(el);
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

      <Button variant="contained">
        <span className="material-symbols-outlined">edit</span>
      </Button>
    </div>
  );
};
