import { useEffect, useState } from "react";

const useObjectUrl = (file: FileList | null) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (file && file.length > 0) {
      const objectUrl = URL.createObjectURL(file[0]);
      setUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [file]);

  return url;
};

export default useObjectUrl; 