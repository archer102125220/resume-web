import PropTypes from 'prop-types';
import Footer from '@/components/Footer';

function DefalutLayout(props) {
  return (
    <>
      {props.children}
      <Footer />
    </>
  );
}

export default DefalutLayout;

DefalutLayout.propTypes = {
  children: PropTypes.any,
};