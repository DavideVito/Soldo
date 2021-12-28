import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "../../Components/Modal";
import { Button, TextField } from "@mui/material";
import richiesta from "../../Utils/Functions/richiesta";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function UploadComponent(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (!acceptedFiles.length) return;

    toBase64(acceptedFiles[0]).then(setFileUrl);

    //setFileUrl();
  }, [acceptedFiles]);

  const acceptedFileItems = acceptedFiles.map(() => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img src={fileUrl} alt="Immagine" width="150" height="150" />
    </div>
  ));

  const upload = () => {
    console.log(acceptedFiles[0]);

    const data = new FormData();

    data.append("immagine", acceptedFiles[0]);
    data.append("nome", nomeProdotto);
    data.append("prezzo", prezzoUnitario);
    data.append("tipo", tipo);

    richiesta("/prodotti/", {
      method: "POST",
      body: data,
    });
  };

  const [nomeProdotto, setnomeProdotto] = useState("");
  const [prezzoUnitario, setprezzoUnitario] = useState(0);
  const [tipo, setTipo] = useState(1);

  return (
    <Modal
      bottone={{
        text: "Aggiungi Prodotto",
        style: {
          display: "flex",
          justifyContent: "center",
          marginTop: "25px",
        },
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <section className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button>Clicca per aggiungere un'immagine</Button>
            </div>
          </div>
          <div>{acceptedFileItems}</div>
        </section>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            placeholder="Nome Prodotto"
            value={nomeProdotto}
            onChange={(e) => setnomeProdotto(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            placeholder="Prezzo Unitario"
            value={prezzoUnitario}
            onChange={(e) => setprezzoUnitario(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={upload}>Carica</Button>
        </div>
      </div>
    </Modal>
  );
}

export default UploadComponent;
