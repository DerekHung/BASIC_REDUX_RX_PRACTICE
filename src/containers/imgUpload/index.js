import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ImgUploader from '../../components/imgUploader';
import './style.css';

class ImgUpload extends PureComponent {
    render() {
        return (
            <div className="page-container">
                <ImgUploader />
            </div>
        );
        
    }
}

export default connect()(ImgUpload);