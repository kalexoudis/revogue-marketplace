import {
    Modal,
    Box,
    Grid,
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
    Container,
    Typography
} from '@mui/material'
import * as React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    ColorCheckbox,
    ColorSelectBoxGroup
} from '../StyledComponents/StyledComponents'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1
}

function valuetext(value) {
    return `€ ${value}`
}

const coloursArray = ['red', 'green', 'brown', 'yellow', 'white', 'black']

const ClothingItemSelectionModal = props => {
    let navigate = useNavigate()
    const [selectedData, setSelectedData] = useState([
        {
            title: 'Coats',
            isSelected: false,
            price: {
                max: null,
                min: null
            },
            colour: coloursArray[0]
        },
        {
            title: 'Skirts',
            isSelected: false,
            price: {
                max: null,
                min: null
            },
            colour: coloursArray[0]
        },
        {
            title: 'Trousers',
            isSelected: false,
            price: {
                max: null,
                min: null
            },
            colour: coloursArray[0]
        }
    ])

    const handleClothingSelection = clothIndex => {
        const newData = [...selectedData]
        newData[clothIndex].isSelected = !selectedData[clothIndex].isSelected

        setSelectedData(newData)
    }

    const handleColorSelection = (clothIndex, colour) => {
        const newData = [...selectedData]
        newData[clothIndex].colour = colour

        setSelectedData(newData)
    }

    const handlePriceSelection = (clothIndex, type, e) => {
        const value = e.target.value

        const newData = [...selectedData]
        newData[clothIndex].price[type] = value
        setSelectedData(newData)
    }

    const handleProceedAction = () => {
        navigate('/outfit-recommendation', {
            state: selectedData
        })
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Container sx={style} maxWidth='md'>
                <Grid
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <h2 style={{fontStyle: 'Italic'}}>Clothing Items Selection</h2>
                </Grid>
                <Grid>
                    {selectedData.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Grid
                                    container
                                    key={'cloth_' + index}
                                    marginBottom='7px'
                                    display='flex'
                                    width='100%'
                                    border='1px solid'
                                    p={3}
                                    alignItems='center'
                                    justifyContent='space-between'
                                >
                                    <Box flexGrow={1} display='flex' justifyContent='center'>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={() => handleClothingSelection(index)}
                                                />
                                            }
                                            label={item.title}
                                        />
                                    </Box>
                                    <Box
                                        flexGrow={1}
                                        display='flex'
                                        flexWrap='wrap'
                                        justifyContent='center'
                                    >
                                        <ColorSelectBoxGroup
                                            colours={coloursArray}
                                            value={selectedData[index].colour}
                                            handleChangeColor={colour =>
                                                handleColorSelection(index, colour)}
                                        />
                                    </Box>

                                    <Box
                                        m={1}
                                        flexGrow={1}
                                        display='flex'
                                        flexDirection='column'
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <Box
                                            display='flex'
                                            maxWidth={250}
                                            justifyContent='center'
                                            alignItems='center'
                                        >
                                            <TextField
                                                type='number'
                                                size='small'
                                                id='outlined-required'
                                                InputProps={{
                                                    inputProps: {
                                                        min: 0
                                                    }
                                                }}
                                                label='min'
                                                value={item.price.min}
                                                onChange={e => handlePriceSelection(index, 'min', e)}
                                            />
                                            <Box m={1}>€</Box>
                                            <TextField
                                                type='number'
                                                size='small'
                                                id='outlined-required'
                                                label='max'
                                                InputProps={{
                                                    inputProps: {
                                                        min: 0
                                                    }
                                                }}
                                                value={item.price.max}
                                                onChange={e => handlePriceSelection(index, 'max', e)}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
                <Grid
                    style={{
                        padding: '10px 0px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        variant='contained'
                        onClick={handleProceedAction}
                        size='small'
                        style={{backgroundColor: 'black', color: 'white'}}
                    >
                        Proceed
                    </Button>
                </Grid>
            </Container>
        </Modal>
    )
}

export default ClothingItemSelectionModal
