import {useState} from 'react'
import {Box} from '@mui/material'

const ColorCheckbox = ({
                           handleColorSelection,
                           clothIndex,
                           colorIndex,
                           color,
                           isSelected = false
                       }) => {
    return (
        <Box m='5px'>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                width='2rem'
                height='2rem'
                bgcolor={isSelected ? '#1e74c8' : 'none'}
                borderRadius='50rem'
            >
                <Box
                    onClick={() => handleColorSelection(clothIndex, colorIndex)}
                    style={{
                        borderRadius: '50rem',
                        border: '2px solid',
                        borderColor: color == '#ffffff' ? '#aab2ba' : '#ffffff',
                        height: '1.5rem',
                        width: '1.5rem',
                        cursor: 'pointer'
                    }}
                    bgcolor={color}
                />
            </Box>
        </Box>
    )
}

const ColorCircle = ({color, isActive, handleColorClick}) => {
    return (
        <Box m='5px'>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                width='2rem'
                height='2rem'
                bgcolor={isActive ? '#1e74c8' : 'none'}
                borderRadius='50rem'
            >
                <Box
                    onClick={handleColorClick}
                    style={{
                        borderRadius: '50rem',
                        border: '2px solid',
                        borderColor: color == 'white' ? '#aab2ba' : '#ffffff',
                        height: '1.5rem',
                        width: '1.5rem',
                        cursor: 'pointer'
                    }}
                    bgcolor={color}
                />
            </Box>
        </Box>
    )
}
const ColorSelectBox = ({color}) => {
    const [isSelected, setIsSelected] = useState(false)

    const toggleSelection = () => {
        setIsSelected(!isSelected)
    }

    return (
        <ColorCircle
            color={color}
            isActive={isSelected}
            handleColorClick={toggleSelection}
        />
    )
}

const ColorSelectBoxGroup = ({colours, value, handleChangeColor}) => {
    const [selectedColorIndex, setSelectedColorIndex] = useState(0)

    const handleColorSelection = index => {
        setSelectedColorIndex(index)
        handleChangeColor(colours[index])
    }

    return (
        <Box sx={{display: 'flex'}}>
            {colours.map((color, index) => {
                return (
                    <ColorCircle
                        key={index}
                        color={color}
                        isActive={index === selectedColorIndex}
                        handleColorClick={() => handleColorSelection(index)}
                    />
                )
            })}
        </Box>
    )
}
export {ColorCheckbox, ColorSelectBox, ColorSelectBoxGroup}
