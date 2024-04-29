import { useEffect, useState } from "react";
import { PersonaService } from "../../services/PersonaService";
import { IPersona } from "../../types/IPersona";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { Button, CircularProgress } from "@mui/material";
import { ModalPersona } from "../ui/modals/ModalPersona/ModalPersona";
import { useAppDispatch } from "../../hooks/redux";

import { setDataTable } from "../../redux/slices/TablaReducer";
import { toggleModal } from "../../redux/slices/ModalReducer";
import Swal from "sweetalert2";

// Definición de la URL base de la API
const API_URL = import.meta.env.VITE_API_URL;

export const ScreenPersona = () => {
  const personaService = new PersonaService();
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // Función para obtener las personas
  const getPersonas = async () => {
    await personaService
      .getAll(API_URL + "api/personas")
      .then((personaData) => {
        dispatch(setDataTable(personaData));
        setLoading(false);
      });
  };

  // Efecto para cargar los datos al inicio
  useEffect(() => {
    setLoading(true);
    getPersonas();
  }, []);

  // Columnas de la tabla de personas
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

  // Función para manejar el borrado de una persona
  const handleDelete = async (id: number) => {
    // Mostrar confirmación antes de eliminar
    Swal.fire({
      title: "¿Estas seguro?",
      text: `¿Seguro que quieres eliminar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar la persona si se confirma
        personaService.delete(API_URL + `api/personas`, `${id}`).then(() => {
          getPersonas();
        });
      }
    });
  };

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
          {/* Botón para abrir el modal de agregar persona */}
          <Button
            onClick={() => {
              dispatch(toggleModal({ modalName: "modalPersona" }));
            }}
            variant="contained"
          >
            Agregar
          </Button>
        </div>
        {/* Mostrar indicador de carga mientras se cargan los datos */}
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
          // Mostrar la tabla de personas una vez que los datos se han cargado
          <TableGeneric<IPersona>
            handleDelete={handleDelete}
            columns={ColumnsTablePersona}
          />
        )}
      </div>

      {/* Modal para agregar o editar una persona */}
      <ModalPersona getPersonas={getPersonas} />
    </>
  );
};
