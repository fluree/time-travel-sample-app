import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';
/* const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
]; */

DiscreteSliderMarks.propTypes = {
    entities: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
  };

function valuetext(value) {
  return `${value}°C`;
}

export function DiscreteSliderMarks({
    entities,
  }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={entities.map((entity)=>
            entity['year'])}
      />
    </Box>
  );
}