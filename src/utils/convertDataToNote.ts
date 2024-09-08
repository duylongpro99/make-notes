import { TNote } from "../types/note";
import { bodyParser } from "./bodyParser";

export const convertDataToNote = (data: TNote): TNote => {
  return {
    $id: data.$id,
    body: bodyParser(data.body),
    colors: bodyParser(data.colors as unknown as string),
    position: bodyParser(data.position as unknown as string),
  };
};
