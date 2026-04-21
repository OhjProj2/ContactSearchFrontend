import { saveIdToColl } from "@/services/saveIdToColl";
import type { SaveParams } from "@/types";

export function useSave(params: SaveParams) {

  const save = async () => {
    try {
      const result = await saveIdToColl(params);
      console.log("Save successful: ", result);
    } catch (err) {
      console.error("Save failed: ", err);
    };
  }

  return save;
}