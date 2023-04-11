import React from "react";
import {Button} from "@mui/material";
import SearchBar from "./SearchBar";
import ClothingItemSelectionModal from "../clothing-selection/ClothingItemSelectionModal";
import {ActionBarWrapper} from "./ActionBar.style";

const ActionBar = ({goToRecommendation, searchBar}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <ActionBarWrapper>
            {
                goToRecommendation === true ?
                    (
                        <Button className="primary-btn" variant="contained" style={{float: "left"}} onClick={handleOpen}>Go To
                            Recommendation</Button>
                    ) : null}
            <ClothingItemSelectionModal open={open} handleClose={handleClose}/>
            {
                searchBar === true ?
                    (
                        <SearchBar/>
                    ) : null
            }
        </ActionBarWrapper>
    )
}

export default ActionBar