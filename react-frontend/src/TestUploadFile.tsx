import { useState } from 'react';
import { uploadFile } from './shared/api/lib/user';

export function TestUploadFile() {
  const [file, setFile] = useState(null);

  return (
    <div>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>{' '}
    </div>
  );

  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onFileUpload() {
    const formData = new FormData();

    formData.append('in_file', file, file.name);

    uploadFile(formData);
  }
}
