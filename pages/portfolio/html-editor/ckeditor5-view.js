import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const CKEditor = dynamic(
  async () => {
    const { CKEditor: _CKEditor } = await import('@ckeditor/ckeditor5-react');
    return _CKEditor;
  },
  { ssr: false }
);

import { buttonStyle } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import { removeCKEditor5 } from '@/utils/CKEditor5';

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

function CKEditor5View() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [h1Title, setH1Title] = useState('');
  const [h2Title, setH2Title] = useState('');
  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');
  const nextRouter = useRouter();

  const editorRef = useRef();
  const { ClassicEditor = null } = editorRef.current || {};

  const classes = useStyles();

  const dispatch = useDispatch();
  const SAVE_loading = useCallback(
    loading => dispatch({ type: 'system/SAVE_loading', payload: loading }),
    [dispatch]
  );

  useGTMTrack({
    event: 'scnOpen',
    url: '/portfolio/html-editor/ckeditor5-view'
  });
  useEffect(() => {
    SAVE_loading(true);
    (async () => {
      const { default: ClassicEditor } = await import(
        '@ckeditor/ckeditor5-build-classic'
      );
      await import('@ckeditor/ckeditor5-build-classic/build/translations/zh');
      if (document.querySelector('#ckfinder-script') === null) {
        const script = document.createElement('script');
        script.id = 'ckfinder-script';
        script.src = 'https://ckeditor.com/apps/ckfinder/3.5.0/ckfinder.js';
        document.head.append(script);
      }
      editorRef.current = {
        ClassicEditor
      };
      setEditorLoaded(true);
    })();
    return removeCKEditor5;
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

  function handleGoBack() {
    // nextRouter.back();
    nextRouter.push('/portfolio/html-editor/ckeditor5');
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
        <div>
          {editorLoaded !== false ? (
            <CKEditor
              editor={ClassicEditor}
              onReady={editor => {
                editor.enableReadOnlyMode(editor.id);
                SAVE_loading(false);
              }}
              data={context}
              config={{
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
                },
                ckfinder: {
                  options: {
                    language: 'zh-tw'
                  }
                }
              }}
            />
          ) : (
            <></>
          )}
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
