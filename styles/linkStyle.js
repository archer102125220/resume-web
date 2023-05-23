export const linkStyleLayout = {
  margin: '0 8px'
};
export const linkStyleColor = {
  color: '#c97d36',
  '&:active': {
    color: '#915115'
  },
  '&:hover': {
    color: '#ffa857'
  }
};
export const linkStyle = {
  ...linkStyleLayout,
  ...linkStyleColor
};

export default linkStyle;
