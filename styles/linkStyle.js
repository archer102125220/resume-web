export const linkStyleLayout = {
  margin: '0 8px'
};
export const outboundLinkStyle = {
  '&[target="_blank"]::after': {
    display: 'inline-block',
    content: '""',
    marginLeft: '4px',
    width: '10px',
    height: '10px',
    backgroundImage: 'url("/img/icon/outbound-link-icon.png")',
    backgroundSize: '10px'
  }
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
  ...linkStyleColor,
  ...outboundLinkStyle
};

export default linkStyle;
