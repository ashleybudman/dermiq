import { Amplify } from "aws-amplify";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { Storage } from "aws-amplify";
import { uploadData } from 'aws-amplify/storage';
import { API, graphqlOperation, Storage } from "aws-amplify";


import awsExports from "./aws-exports";
import { useEffect, useState } from "react";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [items, setItems] = useState([]);
  const [fileData, setFileData] = useState();
  const [fileStatus, setFileStatus] = useState(false);

  const uploadFile = async () => {
    const result = await Storage.put(fileData.name, fileData, {
      contentType: fileData.type,
    });
    setFileStatus(true);
    console.log(21, result);
  };

  return (
    <div className="App">
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>

      <div>
        <input type="file" onChange={(e) => setFileData(e.target.files[0])} />
      </div>
      <div>
        <button onClick={uploadFile}>Upload file</button>
      </div>
      {fileStatus ? "File uploaded successfully" : ""}
    </div>
  );
}

export default withAuthenticator(App);