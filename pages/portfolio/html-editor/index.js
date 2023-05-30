import Head from 'next/head';
import Image from 'next/image';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { buttonStyle } from '@/styles/buttonStyle';
import { linkStyle } from '@/styles/linkStyle';
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
  htmlEditorButton: buttonStyle,
  htmlEditorLink: linkStyle,
  htmlEditorSecondParagraph: {
    display: 'inline'
  },
  htmlEditorImg: {
    width: '100%',
    height: 'auto'
  }
};

const useStyles = makeStyles(styles);

function HTMLEditor() {
  const nextRouter = useRouter();

  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/html-editor' });

  function handleGoToCKEditor4(e) {
    console.log(e);
    e.preventDefault();
    nextRouter.push('/portfolio/html-editor/ckeditor4');
  }
  function handleGoToCKEditor5(e) {
    e.preventDefault();
    nextRouter.push('/portfolio/html-editor/ckeditor5');
  }
  function handleGoToCKEditor5v2(e) {
    e.preventDefault();
    nextRouter.push('/portfolio/html-editor/ckeditor5v2');
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - HTML編輯器</title>
      </Head>
      <p>
        html編輯器最初是用ckeditor5，後來發現ckeditor5的ckfinder疑似需要付費，所以才會出現ckeditor4版本
      </p>
      <Image
        src="/img/a-few-moment-later.jpg"
        alt="a-few-moment-later"
        className={classes.htmlEditorImg}
        width={300}
        height={200}
      />
      <div>
        <p className={classes.htmlEditorSecondParagraph}>
          然後後來又說其實ckeditor5就算沒有ckfinder也沒關係，最後才又出現了使用透過
        </p>
        <a
          target="_blank"
          className={[
            classes.htmlEditorSecondParagraph,
            classes.htmlEditorLink
          ].join(' ')}
          href="https://ckeditor.com/ckeditor-5/online-builder/"
        >
          ckeditor5線上打包器
        </a>
        <p className={classes.htmlEditorSecondParagraph}>
          打包好的js再使用的版本（ckeditor5v2），不過原本有配合後端做圖檔上傳功能，為了節省伺服器維運成本，目前作品集版的上傳功能雖然可以選擇圖片，但無法正常上傳
        </p>
        <del className={classes.htmlEditorSecondParagraph}>
          （之後又說要改用wordpress，所以全都沒有上線，呵呵真開心）
        </del>
      </div>
      <div className={classes.htmlEditor}>
        <Button
          sx={styles.htmlEditorButton}
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
            height={200}
          />
        </Button>

        <Button
          sx={styles.htmlEditorButton}
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
            height={200}
          />
        </Button>

        <Button
          sx={styles.htmlEditorButton}
          variant="contained"
          onClick={handleGoToCKEditor5v2}
          component="a"
          href="/portfolio/html-editor/ckeditor5v2"
        >
          <p>CKEditor5v2</p>
          <Image
            src="/ckeditor/img/ckeditor-5.svg"
            alt="CKEditor5"
            width={200}
            height={200}
          />
        </Button>
      </div>
    </div>
  );
}

export default HTMLEditor;
