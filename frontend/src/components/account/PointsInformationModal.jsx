import {Box, Modal, Typography} from "@mui/material";

const PointsInformationModal = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="points-info-modal-title" variant="h6" component="h2" style={{fontWeight: "bold"}}>
                    Buy and Save
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    You’ll earn 1 point for every euro spent on your purchase.
                    Points will be credited to your account once your products are delivered and you confirm that you
                    will keep the product.
                    After you confirm that you will keep the product, the product cannot be returned with any reasons.
                    (Or here we can just calculate the date, and if the product is not returned until the end of the
                    period when the product can be returned, the points will be provided).
                </Typography>
                <Typography style={{fontWeight: "bold", fontStyle: "Italic", marginTop: "10px"}}>
                    Please Note: Points are awarded in the Company's sole discretion and are subject to the Company's
                    Terms and Conditions which may be modified from time to time.
                </Typography>
                <Typography style={{fontWeight: "bold", marginTop: "10px"}}>
                    * 100 points = 1 Euro
                </Typography>
            </Box>
        </Modal>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '65%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default PointsInformationModal