import React, {useState } from "react";
import { 
  Box,
  Modal,
  Button
} from '@material-ui/core';
import ModalTitle from './ModalTitle'

import { style } from './ModalStyles'

export default function ConfirmModal({handleCloseParent, title, subtitle, isYesDisabled}) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1,
            m: 1,
          }}>
          <Button onClick={() => handleCloseParent()} variant="text">No</Button>
          <Button onClick={() => setOpen(true)} disabled={isYesDisabled} variant="text">Yes</Button>
        </Box>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 300 }}>
            <ModalTitle title={title}/>
            <p id="child-modal-description">
              {subtitle}
            </p>
            <p id="child-modal-description">
              Do you want to procedure?
            </p>
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 1,
              m: 1,
            }}>
              <Button onClick={() => handleClose()} variant="text">No</Button>
              <Button onClick={() => { 
                        handleClose();
                        handleCloseParent();
                      }}
                      variant="text">
                Yes
              </Button>
          </Box>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }


