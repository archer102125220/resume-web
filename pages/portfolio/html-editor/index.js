import Head from 'next/head';
import Image from 'next/image';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import useGTMTrack from '@/hooks/useGTMTrack';

const styles = {
  htmlEditor: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  portfolioButton: {
    display: 'block',
    marginTop: '10px',
    marginBottom: '10px',
    background: '#fbc780',
    '&:active': {
      background: '#dfa14d'
    },
    '&:hover': {
      background: '#f8cd92'
    }
  }
};

const useStyles = makeStyles(styles);

function HTMLEditor() {
  const nextRouter = useRouter();

  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/htmlEditor' });

  function handleGoToCKEditor4(e) {
    console.log(e);
    e.preventDefault();
    nextRouter.push('/portfolio/html-editor/ckeditor4');
  }
  function handleGoToCKEditor5(e) {
    e.preventDefault();
    nextRouter.push('/portfolio/html-editor/ckeditor5');
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - HTML編輯器</title>
      </Head>
      <p>
        html編輯器最初是用ckeditor5，後來發現疑似不合公司需求，所以才會出現ckeditor4版本～
      </p>
      <div className={classes.htmlEditor}>
        <Button
          sx={styles.portfolioButton}
          variant="contained"
          onClick={handleGoToCKEditor4}
          component="a"
          href="/portfolio/html-editor/ckeditor4"
        >
          <p>CKEditor4</p>
          <Image
            src="/ckeditor/img/ckeditor-4.svg"
            alt="CKEditor4"
            width={200}
            height={50}
          />
        </Button>

        <Button
          sx={styles.portfolioButton}
          variant="contained"
          onClick={handleGoToCKEditor5}
          component="a"
          href="/portfolio/html-editor/ckeditor5"
        >
          <p>CKEditor5</p>
          <Image
            src="/ckeditor/img/ckeditor-5.svg"
            alt="CKEditor5"
            width={200}
            height={50}
          />
        </Button>
      </div>
    </div>
  );
}

export default HTMLEditor;
