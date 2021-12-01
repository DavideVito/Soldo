import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

import { default as MM } from "@mui/material/Modal";
import Button from "@mui/material/Button";

import { useSpring, animated } from "react-spring/dist/react-spring.cjs";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div {...other} style={style}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Modal({
  children,
  bottone = {
    text: "Open Modal",
    callback: () => {},
    style: {},
  },
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <div style={bottone.style}>
          {/* c <Fab
            onClick={() => {
              bottone.callback && bottone.callback();
              handleOpen();
            }}
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
          >
            <Add />
          </Fab>
          */}

          <Button
            variant="contained"
            onClick={() => {
              bottone.callback && bottone.callback();
              handleOpen();
            }}
          >
            {bottone.text}
          </Button>
        </div>
      </div>
      <MM
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </MM>
    </>
  );
}
