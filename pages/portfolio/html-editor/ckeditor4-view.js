import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { buttonStyle } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';

const styles = {
  root: {
    margin: 'auto',
    marginTop: '10px'
  },
  inputBlock: {
    marginBottom: '16px'
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '20px'
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'space-around'
  }
};

const useStyles = makeStyles(styles);

function CKEditor4View() {
  const [title, setTitle] = useState('');
  const [h1Title, setH1Title] = useState('');
  const [h2Title, setH2Title] = useState('');
  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');
  const nextRouter = useRouter();

  const classes = useStyles();

  useGTMTrack({
    event: 'scnOpen',
    url: '/portfolio/html-editor/ckeditor4-view'
  });

  useEffect(() => {
    const {
      title: queryTitle = '',
      context: queryContext = '',
      description: queryDescription = ''
    } = nextRouter.query;

    setContext(queryContext);
    setTitle(queryTitle);
    setDescription(queryDescription);
  }, [nextRouter.query]);

  useEffect(() => {
    const div = document.createElement('div');
    div.innerHTML = context;
    if (div.querySelector('p') !== null) {
      setDescription(div.querySelector('p').innerText);
    }
    if (div.querySelector('h1') !== null) {
      setH1Title(div.querySelector('h1').innerText);
    }
    if (div.querySelector('h2') !== null) {
      setH2Title(div.querySelector('h2').innerText);
    }
  }, [context]);

  function handleGoBack() {
    // nextRouter.back();
    nextRouter.push('/portfolio/html-editor/ckeditor4');
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>Parker Chan 的作品集 - HTML編輯器-預覽</title>
      </Head>
      <div className={[classes.inputBlock, classes.row].join(' ')}>
        {/* <label>文章標題： </label> */}
        <p>{title}</p>
      </div>
      <div className={classes.row}>
        <h1>H1 標題：</h1>
        <h1>{h1Title}</h1>
      </div>
      <div className={classes.row}>
        <h2>H2 標題：</h2>
        <h2>{h2Title}</h2>
      </div>
      <div className={classes.row}>
        <label>Meta Description： </label>
        <p>{description}</p>
      </div>
      <div className={classes.row}>
        <label>文章內文： </label>
        <div dangerouslySetInnerHTML={{ __html: context }} />
      </div>

      <div className={classes.buttonBlock}>
        <Button sx={buttonStyle} variant="contained" onClick={handleGoBack}>
          返回編輯
        </Button>
      </div>
    </div>
  );
}

export default CKEditor4View;
