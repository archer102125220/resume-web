import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';

const CKEditor = dynamic(
  async () => {
    const { CKEditor: _CKEditor } = await import('@ckeditor/ckeditor5-react');
    return _CKEditor;
  },
  { ssr: false }
);

import { buttonStyle, buttonLayout } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import { UploadAdapter, removeCKEditor5 } from '@/utils/CKEditor5';

const mb3 = {
  marginBottom: '16px'
};
const colAuto = {
  flex: '0 0 auto',
  width: 'auto'
};

const styles = {
  m3: {
    margin: '16px'
  },
  mb3,
  formLabel: {
    display: 'inline-block',
    marginBottom: '8px'
  },
  formSelect: {
    width: '100%'
  },
  invalidFeedback: {
    display: 'none',
    width: '100%',
    marginTop: '4px',
    fontSize: '.875em',
    color: '#dc3545'
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 'calc(-1 * 16px)',
    marginRight: 'calc(-.5 * 16px)',
    marginLeft: 'calc(-.5 * 16px)',
    '& > *': {
      flexShrink: '0',
      width: '100%',
      maxWidth: '100%',
      paddingRight: 'calc(16px * .5)',
      paddingLeft: 'calc(16px * .5)',
      marginTop: '16px'
    }
  },
  colAuto,
  ckeditorTitlLogo: {
    width: '100px'
  },
  ckeditorTitlText: {
    fontSize: '24px'
  },
  dataTime: {
    ...mb3,
    minHeight: '6.25em'
  },
  dataTimeInput: {
    ...colAuto,
    // width: '10.625em',
    padding: '0',
    backgroundColor: '#fff',
    borderRadius: '4px'
  },
  dataTimeBetween: {
    ...colAuto,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'space-around'
  }
};

const useStyles = makeStyles(styles);

function CKEditor5() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState('Hello from CKEditor 5!');
  const [context, setContext] = useState('<p>Hello from CKEditor 5!</p>');
  const [contextErrorMsg, setContextErrorMsg] = useState('');
  const [articleVisible, setArticleVisible] = useState({
    status: true,
    message: '上架'
  });
  const [keyWord, setKeyWord] = useState('');
  const [keyWordError, setKeyWordError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startDateError, setStartDateError] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [endDateError, setEndDateError] = useState(false);
  const [dateErrorMsg, setDateErrorMsg] = useState('');
  const CKEditorBlockRef = useRef(null);
  const nextRouter = useRouter();

  const editorRef = useRef();
  const { ClassicEditor = null } = editorRef.current || {};

  const classes = useStyles();

  useEffect(() => {
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
    handleDescriptionChange(context);
    return removeCKEditor5;
  }, []);
  useEffect(() => {
    handleDescriptionChange(context);
  }, [context]);
  useEffect(() => {
    dataTimeCheck(startDate, endDate);
  }, [articleVisible]);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/html-editor/ckeditor5' });

  function handleArticleVisibleChange(e) {
    if (e.target.checked) {
      setArticleVisible({ status: true, message: '上架' });
    } else {
      setArticleVisible({ status: false, message: '下架' });
    }
  }

  function handleCategoryChange(newCategory) {
    setCategory(newCategory);
    setCategoryError(false);
  }

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
    setTitleError(false);
  }

  function handleContextChange(event, editor) {
    const data = editor.getData();
    setContext(data);
    // console.log({ event: { ...event }, editor: { ...editor } });
  }

  function handleDescriptionChange(newContext) {
    const div = document.createElement('div');
    div.innerHTML = newContext;

    if (div.querySelector('img') !== null) {
      setContextErrorMsg('');
      if (CKEditorBlockRef.current) {
        CKEditorBlockRef.current.style.borderColor = '';
        CKEditorBlockRef.current.style.borderWidth = '';
        CKEditorBlockRef.current.style.borderStyle = '';
      }
    }

    const descriptionElement = div.querySelector('p');
    if (descriptionElement !== null) {
      setDescription(descriptionElement.innerText.trim().substring(0, 75));
    }
  }

  function handleKeyWordChange(newKeyWord) {
    setKeyWord(newKeyWord);
    setKeyWordError(false);
  }

  function handleStartDateChange(newStartDate) {
    setStartDate(newStartDate);
    setStartDateError(false);
    dataTimeCheck(newStartDate, endDate);
  }

  function handleEndDateChange(newEndDate) {
    setEndDate(newEndDate);
    setEndDateError(false);
    dataTimeCheck(startDate, newEndDate);
  }

  function dataTimeCheck(_startDate, _endDate) {
    if (_startDate !== null && _endDate !== null) {
      let _dateErrorMsg = '';
      if (_startDate.valueOf() > _endDate.valueOf()) {
        setStartDateError(true);
        setEndDateError(true);

        _dateErrorMsg = '請檢查上架開始及結束時間';
        setDateErrorMsg(_dateErrorMsg);
        return false;
      }

      if (startDateError === true) {
        setStartDateError(false);
      }
      if (endDateError === true) {
        setEndDateError(false);
      }
      if (dateErrorMsg !== '') {
        setDateErrorMsg('');
      }
    }
    return true;
  }

  function handleSubmit() {
    const field = [category, title, keyWord, startDate, endDate];
    const errorFieldSetter = [
      setCategoryError,
      setTitleError,
      setKeyWordError,
      setStartDateError,
      setEndDateError
    ];

    const fail = field.filter((element, index) => {
      if (element === '' || element === null) {
        errorFieldSetter[index](true);
        return true;
      }
      return false;
    });

    let _contextErrorMsg = '';
    if (description === '') {
      _contextErrorMsg += '請輸入文字';
      fail.push(true);
    }

    const div = document.createElement('div');
    div.innerHTML = context;

    const img = div.querySelector('img');
    let firstImage = '';
    if (img === null) {
      _contextErrorMsg +=
        (_contextErrorMsg !== '' ? '；' : '') + '請插入圖片，以利建立文章縮圖';
      fail.push(true);
    } else {
      firstImage = img.src;
    }
    if (dataTimeCheck(startDate, endDate) === false) {
      fail.push(true);
    }

    if (_contextErrorMsg !== '') {
      setContextErrorMsg(_contextErrorMsg);
      if (CKEditorBlockRef.current) {
        CKEditorBlockRef.current.style.borderColor = '#dc3545';
        CKEditorBlockRef.current.style.borderWidth = '1px';
        CKEditorBlockRef.current.style.borderStyle = 'solid';
      }
    }
    if (fail.length > 0) {
      return;
    }

    console.log({
      POST_URL: '/api/add-html',
      category,
      title,
      description,
      context,
      visible: articleVisible.status,
      keyWord,
      firstImage,
      startDate: startDate.valueOf(),
      endDate: endDate.valueOf()
    });

    nextRouter.push({
      pathname: '/portfolio/html-editor/ckeditor5-view',
      query: {
        category,
        title,
        description,
        context,
        articleVisible: articleVisible.status,
        keyWord,
        startDate: startDate.valueOf(),
        endDate: endDate.valueOf()
      }
    });
  }

  function handleReset() {
    setCategory('');
    setCategoryError(false);
    setTitle('');
    setTitleError(false);
    setDescription('');
    setContext('');
    setArticleVisible({ status: true, message: '上架' });
    setKeyWord('');
    setKeyWordError(false);
    setStartDate(null);
    setStartDateError(false);
    setEndDate(null);
    setEndDateError(false);
    setDateErrorMsg('');
    setContextErrorMsg('');
    if (CKEditorBlockRef.current) {
      CKEditorBlockRef.current.style.borderColor = '';
      CKEditorBlockRef.current.style.borderWidth = '';
      CKEditorBlockRef.current.style.borderStyle = '';
    }
  }

  return (
    <div className={classes.m3}>
      <Head>
        <title>Parker Chan 的作品集 - HTML編輯器</title>
      </Head>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Image
          className={classes.ckeditorTitlLogo}
          src="/img/ckeditor/ckeditor-5.svg"
          alt="tappay"
          width={100}
          height={100}
        />
        <p className={classes.ckeditorTitlText}>CKEditor5</p>
      </Stack>
      <div className={classes.md3}>
        <label className={classes.formLabel}>文章類別</label>
        <FormControl className={classes.formSelect} error={categoryError}>
          <InputLabel>文章類別</InputLabel>
          <Select
            label="文章類別"
            value={category}
            onChange={e => handleCategoryChange(e.target.value)}
          >
            <MenuItem value="">請選擇</MenuItem>
            <MenuItem value="test">測試</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.md3}>
        <label className={classes.formLabel}>文章標題</label>
        <TextField
          label="文章標題"
          value={title}
          error={titleError}
          onChange={e => handleTitleChange(e.target.value)}
        />
      </div>

      <div className={classes.md3}>
        <label className={classes.formLabel}>文章內文</label>
        <div ref={CKEditorBlockRef}>
          {editorLoaded !== false ? (
            <CKEditor
              editor={ClassicEditor}
              data={context}
              onReady={editor => {
                editor.plugins.get('FileRepository').createUploadAdapter =
                  loader => new UploadAdapter(loader, '/upload-img');
              }}
              onChange={handleContextChange}
              config={{
                language: 'zh',
                toolbar: [
                  'heading',
                  '|',
                  'bold',
                  'link',
                  'imageUpload',
                  'ckfinder',
                  'mediaEmbed'

                  // 'heading',
                  // '|',
                  // 'bold',
                  // 'italic',
                  // 'link',
                  // 'imageUpload',
                  // 'mediaEmbed',
                  // 'fontSize',
                  // 'fontBackgroundColor',
                  // 'fontColor',
                  // 'fontFamily'
                ],
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
        <div
          className={classes.invalidFeedback}
          style={contextErrorMsg !== '' ? { display: 'block' } : {}}
        >
          {contextErrorMsg}
        </div>
      </div>

      <div className={classes.md3}>
        <label className={classes.formLabel}>
          文章描述(自動節錄文章內文內容，最多75字)
        </label>
        {/* <dd className="col-sm-9">{description}</dd> */}
        <TextField
          label="文章描述"
          value={description}
          error={description === ''}
          // readOnly={true}
          onChange={e => setDescription(`${e.target.value}`.substring(0, 75))}
        />
      </div>

      <div className={classes.md3}>
        <label className={classes.formLabel}>文章關鍵字</label>
        <TextField
          label="文章關鍵字"
          value={keyWord}
          error={keyWordError}
          onChange={e => handleKeyWordChange(e.target.value)}
        />
      </div>
      <div className={classes.md3}>
        {/* <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            onChange={handleArticleVisibleChange}
            checked={articleVisible?.status}
          />
          <label className="form-check-label">{articleVisible?.message}</label>
        </div> */}
        <div>
          <FormControlLabel
            control={
              <Switch
                color="warning"
                checked={articleVisible?.status}
                onChange={handleArticleVisibleChange}
              />
            }
            label={articleVisible?.message}
          />
        </div>
      </div>
      <div className={classes.dataTime}>
        <label className={classes.formLabel}>上架時間</label>
        <div className={classes.row}>
          <div className={classes.dataTimeInput}>
            <DatePicker
              value={startDate}
              minDate={dayjs()}
              maxDate={endDate ? endDate : ''}
              onChange={handleStartDateChange}
              slotProps={{
                field: {
                  error: endDateError
                }
              }}
            />
          </div>
          <div className={classes.dataTimeBetween}>~</div>
          <div className={classes.dataTimeInput}>
            <DatePicker
              value={endDate}
              minDate={dayjs()}
              onChange={handleEndDateChange}
              slotProps={{
                field: {
                  error: endDateError
                }
              }}
            />
          </div>
        </div>
        <div
          className={classes.invalidFeedback}
          style={endDateError || startDateError ? { display: 'block' } : {}}
        >
          {dateErrorMsg}
        </div>
      </div>
      <div className={classes.buttonBlock}>
        <Button sx={buttonStyle} variant="contained" onClick={handleSubmit}>
          預覽文章
        </Button>
        <Button
          sx={buttonLayout}
          variant="contained"
          color="error"
          onClick={handleReset}
        >
          重新填寫
        </Button>
      </div>
    </div>
  );
}

export default CKEditor5;
