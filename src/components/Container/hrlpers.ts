import DATA from "../../../data";
import { PostData } from "./types";

export const searchNames = async (postData: PostData): Promise<Partial<typeof DATA>> => {
    const response = await fetch(
      'https://develop.sarmad.sa/api/v1/integration/focal/screen/individual',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(postData),
      },
    );

    if (!response.ok) {
      throw new Error('Error');
    }

    return response.json();
  };
