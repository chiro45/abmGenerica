// Importamos el tipo de dato IPersona y la clase AbstractClassApiServiceGeneric
import { IPersona } from "../types/IPersona";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende AbstractClassApiServiceGeneric para interactuar con la API de personas
export class PersonaService extends BackendClient<IPersona> {}
