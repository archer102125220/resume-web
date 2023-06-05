import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { buttonStyle } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import { importCKEditor5, removeCKEditor5 } from '@/utils/CKEditor5';

const styles = {
  root: {
    margin: 'auto',
    marginTop: '10px'
  },
  mb3: {
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
  },
  htmlView: {
    width: '100%'
  }
};

const useStyles = makeStyles(styles);

function CKEditor5View() {
  const [CKEditor, setCKEditor] = useState(null);
  const [title, setTitle] = useState('');
  const [h1Title, setH1Title] = useState('');
  const [h2Title, setH2Title] = useState('');
  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');
  const nextRouter = useRouter();

  const classes = useStyles();

  const CKEditorRef = useRef(null);

  useGTMTrack({
    event: 'scnOpen',
    url: '/portfolio/html-editor/ckeditor5v2-view'
  });
  useEffect(() => {
    createdCKEditor();
    return () => setTimeout(removeCKEditor5, 100);
  }, []);

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

  useEffect(() => {
    console.log({ CKEditor });
    if (CKEditor !== null) {
      CKEditor.setData(context);
      CKEditor.enableReadOnlyMode(CKEditor.id);
    }
  }, [CKEditor, context]);

  async function createdCKEditor() {
    try {
      if (document.querySelector('#ckEditor-script')) return;
      const _CKEditor = await importCKEditor5(CKEditorRef.current, {
        initialData: context,
        language: 'zh',
        toolbar: [],
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3'
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4'
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5'
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6'
            }
          ]
        }
      });
      console.log(_CKEditor);
      setCKEditor(_CKEditor);
    } catch (error) {
      console.log(error);
    }
  }

  function handleGoBack() {
    // nextRouter.back();
    nextRouter.push('/portfolio/html-editor/ckeditor5v2');
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>Parker Chan 的作品集 - HTML編輯器-預覽</title>
      </Head>
      <div className={[classes.md3, classes.row].join(' ')}>
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
        <div className={classes.htmlView}>
          <div ref={CKEditorRef} />
        </div>
      </div>

      <div className={classes.buttonBlock}>
        <Button sx={buttonStyle} variant="contained" onClick={handleGoBack}>
          返回編輯
        </Button>
      </div>
    </div>
  );
}

export default CKEditor5View;
