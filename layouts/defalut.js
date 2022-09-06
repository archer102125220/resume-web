import PropTypes from 'prop-types';
import Footer from '@/components/Footer';

function DefalutLayout({children}) {
  return (
    <>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

DefalutLayout.propTypes = {
  children: PropTypes.any,
};

export default DefalutLayout;