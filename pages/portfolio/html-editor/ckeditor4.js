import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
// import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { CKEditor } from 'ckeditor4-react';

import useGTMTrack from '@/hooks/useGTMTrack';

function CKEditor4() {
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState('Hello from CKEditor 5!');
  // const [description, setDescription] = useState('');
  const [context, setContext] = useState('<p>Hello from CKEditor 5!</p>');
  const [contextErrorMsg, setContextErrorMsg] = useState('');
  const [hasImg, setHasImg] = useState(false);
  const [articleVisible, setArticleVisible] = useState({
    status: true,
    message: '上架'
  });
  const [keyWord, setKeyWord] = useState('');
  const [keyWordError, setKeyWordError] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [endDateError, setEndDateError] = useState(false);
  const [dateErrorMsg, setDateErrorMsg] = useState('');

  const CKEditorBlockRef = useRef < HTMLDivElement > null;

  useEffect(() => {
    handleDescriptionChange(context);
  }, []);
  useEffect(() => {
    handleDescriptionChange(context);
  }, [context]);
  useEffect(() => {
    dataTimeCheck(startDate, endDate, articleVisible.status);
  }, [articleVisible]);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/html-editor' });

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

  function handleContextChange({ editor }) {
    const data = editor.getData();
    setContext(data);
    // console.log({ event: { ...event }, editor: { ...editor } });
  }

  function handleDescriptionChange(newContext) {
    const div = document.createElement('div');
    div.innerHTML = newContext;

    if (div.querySelector('img') !== null) {
      setHasImg(true);
      setContextErrorMsg('');
      const ckeditorDom =
        CKEditorBlockRef.current.querySelector('#cke_editor1');
      if (ckeditorDom !== null) {
        ckeditorDom.style.borderColor = '';
      }
    }

    const descriptionElement = div.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6'
    );
    let _description = '';
    for (let i = 0; i < descriptionElement.length; i++) {
      const innerText = descriptionElement[i].innerText.trim();
      if (_description.length >= 75) {
        break;
      } else if (innerText !== '') {
        _description += _description.length === 0 ? innerText : ' ' + innerText;
      }
    }
    setDescription(_description.substring(0, 75));
  }

  function handleKeyWordChange(newKeyWord) {
    setKeyWord(newKeyWord);
    setKeyWordError(false);
  }

  function handleStartDateChange(newStartDate) {
    setStartDate(newStartDate);
    setStartDateError(false);
    dataTimeCheck(newStartDate, endDate, articleVisible.status);
  }

  function handleEndDateChange(newEndDate) {
    setEndDate(newEndDate);
    setEndDateError(false);
    dataTimeCheck(startDate, newEndDate, articleVisible.status);
  }

  function dataTimeCheck(_startDate, _endDate, articleVisibleStatus = true) {
    if (_startDate !== '' && _endDate !== '') {
      const startDateObj = new Date(_startDate);
      const endDateObj = new Date(_endDate);
      let _dateErrorMsg = '';
      // console.log({ startDateObj: startDateObj.getTime(), endDateObj: endDateObj.getTime() });
      if (articleVisibleStatus === true && Date.now() > endDateObj.getTime()) {
        setEndDateError(true);
        _dateErrorMsg = '請檢查上架結束時間';
        if (startDateObj.getTime() > endDateObj.getTime()) {
          _dateErrorMsg = '請檢查上架開始及結束時間';
          setStartDateError(true);
        }
        setDateErrorMsg(_dateErrorMsg);
        return false;
      }
      if (startDateObj.getTime() > endDateObj.getTime()) {
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

  async function handleSubmit() {
    const field = [category, title, context, keyWord, startDate, endDate];
    const errorFieldSetter = [
      setCategoryError,
      setTitleError,
      setKeyWordError,
      setStartDateError,
      setEndDateError
    ];

    const fail = field.filter((element, index) => {
      if (element === '') {
        errorFieldSetter[index](true);
        return true;
      }
      return false;
    });

    if (hasImg === false) {
      setContextErrorMsg('請插入圖片，以利建立文章縮圖');
      const ckeditorDom =
        CKEditorBlockRef.current.querySelector('#cke_editor1');
      if (ckeditorDom !== null) {
        ckeditorDom.style.borderColor = '#dc3545';
      }
      fail.push(true);
    }
    if (dataTimeCheck(startDate, endDate, articleVisible.status) === false) {
      fail.push(true);
    }

    if (fail.length > 0) {
      return;
    }

    console.log({
      POST_URL:'/api/add-html',
      category,
      title,
      description,
      context,
      articleVisible: articleVisible.status,
      keyWord,
      startDate,
      endDate
    });

    // try {
    //   await axios.post(
    //     POST_URL,
    //     {
    //       category,
    //       title,
    //       description,
    //       context,
    //       articleVisible: articleVisible.status,
    //       keyWord,
    //       startDate,
    //       endDate
    //     }
    //   );
    // } catch (error) {
    //   console.log('post error');
    // }
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
    setStartDate('');
    setStartDateError(false);
    setEndDate('');
    setEndDateError(false);
    setDateErrorMsg('');
    setHasImg(false);
    setContextErrorMsg('');
    const ckeditorDom = CKEditorBlockRef.current.querySelector('#cke_editor1');
    if (ckeditorDom !== null) {
      ckeditorDom.querySelector('#cke_editor1').style.borderColor = '';
    }
  }

  return (
    <div className="m-3" style={{ minWidth: 1200 }}>
      <Head>
        <title>Parker Chan 的作品集 - HTML編輯器</title>
      </Head>
      <div className="mb-3">
        <label className="form-label">文章類別</label>
        <select
          className={['form-select', categoryError ? 'is-invalid' : ''].join(
            ' '
          )}
          onChange={e => handleCategoryChange(e.target.value)}
          value={category}
        >
          <option value="">請選擇</option>
          <option value="test">測試</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">文章標題</label>
        <input
          type="text"
          className={['form-control', titleError ? 'is-invalid' : ''].join(' ')}
          onChange={e => handleTitleChange(e.target.value)}
          value={title}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">文章內文</label>
        <div ref={CKEditorBlockRef}>
          <CKEditor
            editorUrl="https://cdn.ckeditor.com/4.21.0/full-all/ckeditor.js"
            onNamespaceLoaded={CKEDITOR => {
              CKEDITOR.plugins.addExternal(
                'videoembed',
                '/ckeditor/plugins/videoembed/plugin.js'
              );
            }}
            initData={context}
            onChange={handleContextChange}
            config={{
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
                'lineutils'
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
              ]
            }}
          />
        </div>
        <div
          className="invalid-feedback"
          style={{ display: contextErrorMsg !== '' ? 'block' : '' }}
        >
          {contextErrorMsg}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          文章描述(自動節錄文章內文內容，最多75字)
        </label>
        {/* <dd className="col-sm-9">{description}</dd> */}
        <input
          type="text"
          // readOnly={true}
          value={description}
          onChange={e => setDescription(`${e.target.value}`.substring(0, 75))}
          className={['form-control', keyWordError ? 'is-invalid' : ''].join(
            ' '
          )}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">文章關鍵字</label>
        <input
          type="text"
          value={keyWord}
          onChange={e => handleKeyWordChange(e.target.value)}
          className={['form-control', keyWordError ? 'is-invalid' : ''].join(
            ' '
          )}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">文章狀態</label>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            onChange={handleArticleVisibleChange}
            checked={articleVisible?.status}
          />
          <label className="form-check-label">{articleVisible?.message}</label>
        </div>
      </div>
      <div className="mb-3" style={{ minHeight: '6.25em' }}>
        <label className="form-label">上架時間</label>
        <div className="row g-3">
          <div className="col-auto" style={{ width: '10.625em' }}>
            <input
              type="date"
              className={[
                'form-control',
                startDateError ? 'is-invalid' : ''
              ].join(' ')}
              value={startDate}
              onChange={e => handleStartDateChange(e.target.value)}
            />
          </div>
          <div
            className="col-auto"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            ~
          </div>
          <div className="col-auto" style={{ width: '10.625em' }}>
            <input
              type="date"
              className={[
                'form-control',
                endDateError ? 'is-invalid' : ''
              ].join(' ')}
              value={endDate}
              onChange={e => handleEndDateChange(e.target.value)}
            />
          </div>
        </div>
        <div
          className="invalid-feedback"
          style={{ display: endDateError || startDateError ? 'block' : '' }}
        >
          {dateErrorMsg}
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <button className="btn btn-primary" onClick={handleSubmit}>
          發布文章
        </button>
        <button className="btn btn-danger" onClick={handleReset}>
          重新填寫
        </button>
      </div>
    </div>
  );
}

export default CKEditor4;
