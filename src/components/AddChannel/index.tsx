import FormCreateChannel from "../FormCreateChannel";
import React, { useState } from "react";

export default function AddChannel() {
  const [modalCreateCn, setModalCreateCn] = useState<boolean>(false);

  const handleOpenModalCreateCn = () => {
    setModalCreateCn(true);
  };

  const handleCloseModalCreateCn = () => {
    setModalCreateCn(false);
  };
  return (
    <>
      <div>
        <img
          height={30}
          onClick={handleOpenModalCreateCn}
          src="https://cdn-icons-png.flaticon.com/512/8922/8922789.png"
        />
      </div>
      <FormCreateChannel
        show={modalCreateCn}
        handleClose={handleCloseModalCreateCn}
      />
      
    </>
  );
}
