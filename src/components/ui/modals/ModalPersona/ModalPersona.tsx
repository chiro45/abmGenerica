// Importación de las dependencias necesarias
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";

import { IPersona } from "../../../../types/IPersona";
import TextFieldValue from "../../TextFildValue/TextFildValue";
import { Form, Formik } from "formik";
import { PersonaService } from "../../../../services/PersonaService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { toggleModal } from "../../../../redux/slices/ModalReducer";
const urlapi = import.meta.env.VITE_API_URL;

interface IModalPersona {
  getPersonas: Function;
}

// Definición del componente ModalFormulario
export const ModalPersona = ({ getPersonas }: IModalPersona) => {
  // Valores iniciales para el formulario
  const initialValues: IPersona = {
    id: 0,
    phoneNumber: "",
    adress: "",
    birthdate: "" as any,
    email: "",
    firstName: "",
    lastName: "",
  };

  // URL de la API obtenida desde las variables de entorno
  const actualDate: string = new Date().toISOString().split("T")[0];
  const apiPersona = new PersonaService();
  // Renderizado del componente ModalFormulario

  const modal = useAppSelector((state) => state.modalReducer.modalPersona);
  const elementActive = useAppSelector(
    (state) => state.tablaReducer.elementActive
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(toggleModal({ modalName: "modalPersona" }));
  };

  return (
    <div>
      <Modal
        id={"modal"}
        show={modal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {elementActive ? (
            <Modal.Title>Editar una persona:</Modal.Title>
          ) : (
            <Modal.Title>Añadir una persona:</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              phoneNumber: Yup.string().required("Campo requerido"),
              adress: Yup.string().required("Campo requerido"),
              birthdate: Yup.date()
                .required("Campo requerido")
                .max(
                  actualDate,
                  "La fecha no puede ser mayor a la fecha actual"
                ),
              email: Yup.string()
                .email("Tiene que ser un correo electrónico válido")
                .required("Campo requerido"),
              firstName: Yup.string().required("Campo requerido"),
              lastName: Yup.string().required("Campo requerido"),
            })}
            initialValues={elementActive ? elementActive : initialValues}
            enableReinitialize={true}
            onSubmit={async (values: IPersona) => {
              if (elementActive) {
                await apiPersona.put(
                  urlapi + `api/personas`,
                  `${elementActive?.id}`,
                  values
                );
              } else {
                await apiPersona.post(urlapi + "api/personas", values);
              }
              getPersonas();
              handleClose();
            }}
          >
            {() => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    <TextFieldValue
                      label="Nombre:"
                      name="firstName"
                      type="text"
                      placeholder="Nombre"
                    />
                    <TextFieldValue
                      label="Apellido:"
                      name="lastName"
                      type="text"
                      placeholder="Apellido"
                    />

                    <TextFieldValue
                      label="Correo electrónico:"
                      name="email"
                      type="text"
                      placeholder="Mail"
                    />

                    <TextFieldValue
                      label="Dirección:"
                      name="adress"
                      type="text"
                      placeholder="Direccion"
                    />
                    <TextFieldValue
                      label="Número de teléfono:"
                      name="phoneNumber"
                      type="number"
                      placeholder="Numero de telefono"
                    />
                    <TextFieldValue
                      label="Fecha de nacimiento:"
                      name="birthdate"
                      type="date"
                      placeholder="Fecha de nacimiento"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit">
                      Enviar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
