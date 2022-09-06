import PropTypes from 'prop-types';
import Footer from '@/components/Footer';

function DefalutLayout(props) {
  return (
    <>
      <main>
        {props.children}
      </main>
      <Footer />
    </>
  );
}

DefalutLayout.propTypes = {
  children: PropTypes.any,
};

export default DefalutLayout;