import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import {Search, SearchIconWrapper, StyledInputBase} from "./searchBar.style";

export default function SearchBar(props) {
    let navigate = useNavigate()

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate('/searchResult?keyword=' + e.target.value)
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                onChange={props.onChange}
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
                style={{height: "30px"}}
                value={props.value}
                onKeyDown={handleKeyDown}
            />
        </Search>
    );
}
