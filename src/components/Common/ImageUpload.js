import React, { useState } from 'react';
import '../../assets/imageUpload.scss';
const ImageUpload = ({ img,setImage }) => {
    const  [imagePath, setImagePath] = useState('');

    const handleChange = (e) => {
        const input = e.currentTarget;
        // const label = e.currentTarget.value.replace(/\\/g, '/').replace(/.*\//, '');
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setImagePath(e.target.result)
                setImage(input.files[0])
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    return (<div className="container">
        <div className="row">

            {/* <label>Upload Image</label>
            <div className="input-group">
                <span className="input-group-btn">
                    <span className="btn btn-default btn-file" >
                        Browse… <input type="file" id="imgInp" onChange={(e)=>handleChange(e)}/>
                    </span>
                </span>
                <input type="text" className="form-control" readonly/>
            </div> */}

            <div className="form-group files color col-lg-6">
                <label>Upload Your Image </label>
                <input type="file" className="form-control"
                    multiple=""
                    onChange={(e) => handleChange(e)}
                    accept="image/*"
                     />
            </div>

            <img className="col-lg-6 img-preview"  src={imagePath||img||''} alt="" />
        </div>


    </div>);
}

export default ImageUpload;