// Importamos el tipo de dato IPersona y la clase AbstractClassApiServiceGeneric
import { IPersona } from "../types/IPersona";
import { AbstractClassApiServiceGeneric } from "./AbstractClassApiServiceGeneric";

// Clase PersonaService que extiende AbstractClassApiServiceGeneric para interactuar con la API de personas
export class PersonaService extends AbstractClassApiServiceGeneric<IPersona> {}
