export enum TypeInfoMessage {
  error = "error",
  success = "success",
}

export interface InfoMessage {
  type: TypeInfoMessage;
  text: string;
}
