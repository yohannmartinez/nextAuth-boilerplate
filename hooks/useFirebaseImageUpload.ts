import { useState } from "react";
import {
  ref,
  uploadString,
  getDownloadURL,
  UploadResult,
} from "firebase/storage";
import { storage } from "@/lib/firebase"; // Assurez-vous que le chemin est correct

interface FirebaseImageUploadState {
  uploading: boolean;
  error: Error | null;
  url: string | null;
}

const useFirebaseImageUpload = (): {
  state: FirebaseImageUploadState;
  uploadImage: (imageSrc: string) => Promise<void>;
} => {
  const initialState: FirebaseImageUploadState = {
    uploading: false,
    error: null,
    url: null,
  };

  const [state, setState] = useState<FirebaseImageUploadState>(initialState);

  const uploadImage = async (imageSrc: string): Promise<void> => {
    setState({ ...initialState, uploading: true });

    const storageRef = ref(storage, `images/${Date.now()}.jpg`);

    try {
      const uploadResult: UploadResult = await uploadString(
        storageRef,
        imageSrc,
        "data_url"
      );
      const downloadURL: string = await getDownloadURL(uploadResult.ref);
      setState({ ...initialState, url: downloadURL });
    } catch (error) {
      setState({ ...initialState, error: error as Error });
    } finally {
      setState((prevState) => ({ ...prevState, uploading: false }));
    }
  };

  return { state, uploadImage };
};

export default useFirebaseImageUpload;
