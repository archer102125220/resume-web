import { useState, useEffect, useRef, use } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const CKEditor = dynamic(
  () => import('ckeditor4-react').then(({ CKEditor }) => CKEditor),
  { ssr: false }
);

import { buttonStyle } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';

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
  }
};

const useStyles = makeStyles(styles);

function CKEditor4View() {
  const [CKEDITOR, set_CKEDITOR] = useState(null);
  const [title, setTitle] = useState('');
  const [h1Title, setH1Title] = useState('');
  const [h2Title, setH2Title] = useState('');
  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');
  const nextRouter = useRouter();

  const CKEditorBlockRef = useRef(null);
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
    if (typeof CKEDITOR?.instances?.editor1?.setData === 'function') {
      CKEDITOR.instances.editor1.setData(context, {
        // callback(a) {
        //   console.log(a);
        // }
      });
      console.log(context);
      console.log({ CKEDITOR, context });
    }
  }, [context, CKEDITOR]);

  function handleGoBack() {
    nextRouter.back();
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
        <div ref={CKEditorBlockRef}>
          <CKEditor
            readOnly={true}
            editorUrl="https://cdn.ckeditor.com/4.21.0/full-all/ckeditor.js"
            onNamespaceLoaded={_CKEDITOR => {
              _CKEDITOR.plugins.addExternal(
                'videoembed',
                '/ckeditor/plugins/videoembed/plugin.js'
              );
              set_CKEDITOR(_CKEDITOR);
            }}
            initData={context}
            config={{
              toolbar: [],
              language: 'zh',
              filebrowserUploadUrl: '/upload-img?a',
              plugins: [
                'dialogui',
                'dialog',
                'format',
                'basicstyles',
                'button',
                'toolbar',
                'fakeobjects',
                'link',
                'popup',
                'undo',
                'contextmenu',
                'floatpanel',
                'wysiwygarea',
                'resize',
                'elementspath',
                'image',
                'xml',
                'ajax',
                'filetools',
                'filebrowser',
                'notificationaggregator',
                'notification',
                'widgetselection',
                'widget',
                'uploadwidget',
                'uploadimage',
                'htmlwriter',
                'videoembed',
                'panel',
                'menu',
                'enterkey',
                'entities',
                'floatingspace',
                'listblock',
                'richcombo',
                'pastetools',
                'pastefromgdocs',
                'pastefromlibreoffice',
                'menubutton',
                'showborders',
                'lineutils',
                'colorbutton',
                'font'
                // 'stylescombo'
              ],
              format_tags: 'p;h1;h2;h3;h4;h5;h6',
              toolbarGroups: [
                { name: 'document', groups: ['mode', 'document', 'doctools'] },
                { name: 'clipboard', groups: ['clipboard', 'undo'] },
                {
                  name: 'editing',
                  groups: ['find', 'selection', 'spellchecker']
                },
                { name: 'forms' },
                { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                {
                  name: 'paragraph',
                  groups: ['list', 'indent', 'blocks', 'align', 'bidi']
                },
                { name: 'links' },
                { name: 'insert' },
                { name: 'styles' },
                { name: 'colors' },
                { name: 'tools' },
                { name: 'others' },
                { name: 'about' }
              ],
              removeButtons: [
                'Cut',
                'Copy',
                'Paste',
                'Undo',
                'Redo',
                'Anchor',
                'Underline',
                'Strike',
                'Subscript',
                'Superscript'
              ],
              removeDialogTabs: 'image:advanced;image:Link'
            }}
          />
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

export default CKEditor4View;
