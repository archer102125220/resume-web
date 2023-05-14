export const buttonLayout = {
  display: 'block',
  marginTop: '10px',
  marginBottom: '10px'
};
export const buttonColor = {
  background: '#fbc780',
  '&:active': {
    background: '#dfa14d'
  },
  '&:hover': {
    background: '#f8cd92'
  }
};
export const buttonStyle = {
  ...buttonLayout,
  ...buttonColor
};

export default buttonStyle;
