import { useEffect, useState } from "react";
import { PersonaService } from "../../services/PersonaService";
import { IPersona } from "../../types/IPersona";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { Button, CircularProgress } from "@mui/material";
import { ModalPersona } from "../ui/modals/ModalPersona/ModalPersona";

const API_URL = import.meta.env.VITE_API_URL;

export const ScreenPersona = () => {
  const personaService = new PersonaService();
  const [personas, setPersonas] = useState<IPersona[]>([
    {
      id: 1,
      email: "ejemplo1@example.com",
      firstName: "Juan",
      lastName: "Pérez",
      phoneNumber: "123456789",
      adress: "Calle Principal 123",
      birthdate: "1990-01-01",
    },
    {
      id: 2,
      email: "ejemplo2@example.com",
      firstName: "María",
      lastName: "González",
      phoneNumber: "987654321",
      adress: "Avenida Central 456",
      birthdate: "1995-05-15",
    },
    {
      id: 3,
      email: "ejemplo3@example.com",
      firstName: "Luis",
      lastName: "Martínez",
      phoneNumber: "555666777",
      adress: "Plaza Principal 789",
      birthdate: "1988-11-20",
    },
  ]);

  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(false);

  // Estado para la edición de una persona
  const [personaEdit, setPersonaEdit] = useState<IPersona>();

  //estado para abrir o cerrar el modal
  const [showModal, setShowModal] = useState(false);

  // Estado para controlar si se está editando
  const [editing, setEditing] = useState(false);

  // Función para cerrar el modal de edición/agregación
  function handleClose() {
    setShowModal(false);
    setEditing(false);
    setPersonaEdit(undefined);
  }

  const getPersons = async () => {
    await personaService.get(API_URL + "api/personas").then((personaData) => {
      //setPersonas([personaData]);
      console.log(personaData);
      setLoading(false);
    });
  };

  useEffect(() => {
    // setLoading(true);
    // getPersons();
  }, []);

  const ColumnsTablePersona = [
    {
      label: "id",
      key: "id",
      render: (persona: IPersona) => (persona.id ? persona.id : 0),
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
          <Button
            onClick={() => {
              setShowModal(true);
            }}
            variant="contained"
          >
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
            urlFetch=""
            dataTable={personas}
          />
        )}
      </div>

      <ModalPersona
        getPersonas={getPersons}
        handleClose={handleClose}
        showModal={showModal}
        editing={editing}
        persona={personaEdit}
      />
    </>
  );
};
