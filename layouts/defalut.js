import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Footer from '@/components/layout/Footer';

function DefalutLayout({ children }) {
  return (
    <>
      <Typography component='main'>
        {children}
      </Typography>
      <Footer />
    </>
  );
}

DefalutLayout.propTypes = {
  children: PropTypes.any,
};

export default DefalutLayout;