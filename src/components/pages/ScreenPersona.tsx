import { useEffect, useState } from "react";
import { PersonaService } from "../../services/PersonaService";
import { IPersona } from "../../types/IPersona";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { Button, CircularProgress } from "@mui/material";
import { ModalPersona } from "../ui/modals/ModalPersona/ModalPersona";
import { useAppDispatch } from "../../hooks/redux";

const API_URL = import.meta.env.VITE_API_URL;

export const ScreenPersona = () => {
  const personaService = new PersonaService();
  const [personas, setPersonas] = useState<IPersona[]>([]);
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(false);

  const getPersonas = async () => {
    await personaService
      .getAll(API_URL + "api/personas")
      .then((personaData) => {
        setPersonas(personaData);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getPersonas();
  }, []);

  const ColumnsTablePersona = [
    {
      label: "id",
      key: "id",
      render: (persona: IPersona) => (persona?.id ? persona.id : 0),
    },
    { label: "Nombre", key: "firstName" },
    { label: "Apellido", key: "lastName" },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Telefono",
      key: "phoneNumber",
    },
    {
      label: "Direccion",
      key: "adress",
    },
    {
      label: "Fecha de Nacimiento",
      key: "birthdate",
      render: (persona: IPersona) => {
        const dateFormatOptions: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const date = new Date(persona.birthdate);
        const formatedDate = date.toLocaleDateString(
          "es-AR",
          dateFormatOptions
        );
        return formatedDate;
      },
    },
    { label: "Acciones", key: "acciones" },
  ];

  return (
    <>
      <div>
        <div
          style={{
            padding: ".4rem",
            display: "flex",
            justifyContent: "flex-end",
            width: "90%",
          }}
        >
          <Button onClick={() => {}} variant="contained">
            Agregar
          </Button>
        </div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "2vh",
              height: "100%",
            }}
          >
            <CircularProgress color="secondary" />
            <h2>Cargando...</h2>
          </div>
        ) : (
          <TableGeneric<IPersona>
            columns={ColumnsTablePersona}
            dataTable={personas}
          />
        )}
      </div>

      <ModalPersona getPersonas={getPersonas} />
    </>
  );
};
