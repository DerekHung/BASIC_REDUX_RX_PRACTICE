import React, { PureComponent } from 'react';
import 'rxjs';
import Rx from 'rx-dom';
import getCorrectWindow from './getCorrectWindow';
import './style.css';


class ImgUploader extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            paintSrc: null
        };
        this.uploadImage = (e) => this._uploadImage(e);
        this.handleUrlInput = (e) => this._handleUrlInput(e);
        this.handleCropClick = (e) => this._handleCropClick(e);
        
    }

    _uploadImage(e) {
        this.temImage = new Image();
        return  Rx.Observable
                .of(e)
                .mergeMap( e => Rx.Observable.from(e.target.files))
                .filter( file => file.type.match('image'))
                .mergeMap( file => Rx.DOM.fromReader(file).asDataURL())
                .mergeMap( url => {
                    this.setState({paintSrc: url});
                    this.temImage.src = url;
                    return Rx.DOM.load(this.temImage, (e) => e.path[0])
                })
                .map( e => ({ width: e.width, height: e.height }))
                .subscribe( res => {
                    this.setState({
                        cropResult: null,
                        cropWindowStyle: {
                            url: this._createCanvas(this.temImage, res),
                            top: 0,
                            left: 0,
                            ...res
                        }
                    })
                })
    }

    _handleUrlInput(e) {
        if( e.keyCode === 13) this._urlUpload(e.target.value);
    }

    _handleCropClick(e) {

        const mouseMove = Rx.Observable.fromEvent(document.body, 'mousemove');
        const mouseUp = Rx.Observable.fromEvent(document.body, 'mouseup');
        const orginalPos = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        }

        return  Rx.Observable
                .of(e)
                .mergeMap( e => mouseMove.takeUntil(mouseUp))
                .map( e =>  getCorrectWindow( this.temImage, orginalPos.x, orginalPos.y, e.offsetX , e.offsetY ))
                .subscribe( res => {
                    this.setState({
                        cropWindowStyle: {
                            url: this._createCanvas(this.temImage, res),
                            ...res
                        }
                    })
                })

    }

    _urlUpload(url) {
        this.temImage = new Image();
        this.temImage.crossOrigin="Anonymous"

        const ajaxSetting = {
            url: 'http://localhost:3008/api/transformImage',
            method: 'POST',
            body: JSON.stringify({url}),
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        }

        return  Rx.DOM
                .ajax(ajaxSetting)
                .mergeMap( res => {
                    this.setState({paintSrc: url});
                    this.temImage.src = JSON.parse(res.response).result;
                    return Rx.DOM.load(this.temImage, (e) => e.path[0])
                })
                .map( e => ({ width: e.width, height: e.height }))
                .subscribe( res => {
                    const url = this._createCanvas(this.temImage, res);
                    this.setState({
                        cropResult: null,
                        paintSrc: url,
                        cropWindowStyle: {
                            url,
                            top: 0,
                            left: 0,
                            ...res
                        }
                    })
                })
    }

    _createCanvas(image, { top=0, left=0, width, height}) {
        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        
        canvas.width = width;
        canvas.height = height;
        canvasContext.drawImage(    image,
                                    left, top, width, height,
                                    0, 0,
                                    width, height);

        return canvas.toDataURL('image/jpeg');
    }

    render() {

        return (
            <div className="uploader-container">          
                { this._renderUploader(this.state.paintSrc, this.state.cropResult, this.state.resultString) }
                { this._renderCropWindow(this.state.paintSrc, this.state.cropWindowStyle) }
                { this._renderCropResult(this.state.cropResult) }
                { this._renderResultString(this.state.resultString) }
            </div>
        );
        
    }

    _renderUploader(imgSrc, cropRes, endResult) {
        if( imgSrc || cropRes || endResult) return null;
        return (
            <div className="uploader-container">
                <input
                    id="uploader"
                    ref={ _ref => this.fileinput = _ref }
                    type="file"
                    onChange={this.uploadImage}
                    accept="image/*"
                />
                <label htmlFor="uploader"><i className="icono-upArrow"/>從電腦選擇</label>
                <div> O R </div>
                <input
                    id="urlUploader"
                    placeholder="請輸入url..."
                    ref={ _ref => this.urlinput = _ref }
                    type="text"
                    onKeyDown={this.handleUrlInput}
                />
            </div>
        );
    }

    _renderCropWindow(imgSrc, style) {
        if( !imgSrc || !style ) return null;

        const _confirmAction = (e) => {
            this.setState({
                paintSrc: null,
                cropResult: style.url,
                cropWindowStyle: {}
            })
        }

        const _resetCropAction = (e) => {
            this.setState({
                cropWindowStyle: {
                    top: 0,
                    left: 0,
                    height: this.temImage.height,
                    width: this.temImage.width,
                    url: imgSrc
                }
            })
        }

        style.background = `url(${style.url}) no-repeat`;
        // delete style.url;

        return (
            <div className="crop-wrapper">
                <div 
                    className="crop-container" 
                    onMouseDown={this.handleCropClick}
                    >
                    <img src={imgSrc} alt="paint"/>
                    <div className="mask" />
                    <div className="crop-window" style={style}/>
                </div>
                <div className="functional-button">
                    <button onClick={_confirmAction}>確認</button>
                    <button onClick={_resetCropAction}>重設範圍</button>
                </div>
            </div>
        );
    }
    _renderCropResult(cropRes) {
        if( !cropRes ) return null;

        const _confirmAction = (e) => {
            const ajaxSetting = {
                url: 'http://localhost:3008/api/uploadImage',
                method: 'POST',
                body: JSON.stringify({cropRes}),
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                }
            }

            return Rx.DOM
                    .ajax(ajaxSetting)
                    .map( res => JSON.parse(res.response))
                    .subscribe(res => this.setState({
                        paintSrc: null,
                        cropResult: null,
                        cropWindowStyle: {},
                        resultString: res.url
                    }))
        }

        const _resetAction = (e) => {
            this.setState({
                paintSrc: null,
                cropResult: null,
                cropWindowStyle: {}
            })
        }

        return (
            <div className="result-container">
                <img src={cropRes} alt="your_result"/>
                <div className="functional-button">
                    <button onClick={_confirmAction}>上傳圖片</button>
                    <button onClick={_resetAction}>重新選擇圖片</button>
                </div>
            </div>
        );
    }

    _renderResultString(result) {

        if(!result) return null;

        const _returnAction = (e) => {
            this.setState({ resultString: ''});
        }

        return (
            <div className="result-container">
                <div>上傳圖片結果：</div>
                <a href={result} target="_blank" referer="noreferer" opener="noopener" >{result}</a>
                <div className="functional-button">
                    <button onClick={_returnAction}>上傳別張圖片</button>
                </div>
            </div>
        );
    }
}

export default ImgUploader;