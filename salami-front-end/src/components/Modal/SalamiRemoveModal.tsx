import React, { useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { salamiRemoveModalContext } from "../UserContext";
import axios from "axios";

interface IProps {
  open: {
    status: boolean;
    id?: String;
  };
  whatIDid: string;
}

function SalamiRemoveModal({ open, whatIDid }: IProps) {
  const { removeOpen, setRemoveOpen } = useContext(salamiRemoveModalContext);

  // Salami Remove Handler
  const salamiRemoveHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Remove salami from the database
    const removeSalamiById = async () => {
      if (whatIDid === "earn") {
        const response = await axios.post("http://localhost:3500/earn/id", {
          id: open.id,
        });
        if (response.data.data.deletedCount > 0) {
          setRemoveOpen({
            status: false,
          });
        }
      }

      if (whatIDid === "spend") {
        const response = await axios.post("http://localhost:3500/spend/id", {
          id: open.id,
        });
        if (response.data.data.deletedCount > 0) {
          setRemoveOpen({
            status: false,
          });
        }
      }
    };
    removeSalamiById();
  };

  // Salami close Handler
  const salamiCloseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRemoveOpen({
      status: false,
    });
  };

  return (
    <Modal
      open={open.status}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper" style={{ width: "300px" }}>
        <h3>সত্যি মুছে ফেলতে চাও?</h3>
        <div className="buttons-list">
          <Button
            type="button"
            onClick={salamiRemoveHandler}
            variant="contained"
            color="secondary"
            style={{ margin: "20px" }}
          >
            হ্যাঁ
          </Button>
          <Button
            type="button"
            onClick={salamiCloseHandler}
            variant="contained"
            color="primary"
            style={{ margin: "20px" }}
          >
            না
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SalamiRemoveModal;
