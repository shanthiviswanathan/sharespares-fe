import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ImageUpload from './ImageUpload'
import { useParams } from "react-router-dom";
import UserContext from '../../UserContext';
import Popup from './Popup';
import AvailabilityModal from './AvailabilityModal'

const Form = () => {
    const history = useHistory();
    const { type, groupId, itemId } = useParams();
    const { user } = useContext(UserContext);
    const { pathname } = useLocation();

    const [notification, setNotification] = useState({}),
        [defaultCategories, setDefaultCategories] = useState([]),
        [title, setTitle] = useState(''),
        [subtitle, setSubTitle] = useState(''),
        [description, setDescription] = useState(''),
        [location, setLocation] = useState(''),
        [address1, setAddress1] = useState(''),
        [address2, setAddress2] = useState(''),
        [city, setCity] = useState(''),
        [state, setState] = useState(''),
        [zipcode, setZipcode] = useState(''),
        [featured_desc1, setFeaturedDesc1] = useState(''),
        [featured_desc2, setFeaturedDes2] = useState(''),
        [featured_desc3, setFeaturedDes3] = useState(''),
        [price, setPrice] = useState(''),
        [rental_cost, setRentalCost] = useState(''),
        [highlights, setHighlights] = useState(''),
        [status, setStatus] = useState('ACTIVE'),
        [visibility, setVisibility] = useState('PRIVATE'),
        [category, setCategory] = useState(''),
        [imgFile, setImage] = useState(''),
        [thumbnail_image, setThumbnail_image] = useState('');
    const [editItem, setEditItem] = useState({});
    const [isEdit] = useState(pathname.includes('edit'));
    const [isClone] = useState(pathname.includes('clone'));

    const setFormState = (data) => {
        Inputfields.forEach(field => {
            field.state(!!data ?(data[field.name] ===null?'': data[field.name] ): '')
        })
        setStatus(!!data ? data.status : '')
        setVisibility(!!data ? data.visibility : '')
        setCategory(!!data ? data.category : '')
        setThumbnail_image(!!data ? data.thumbnail_image : '')

    }

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios.get('/categories');
            if (!!data.length) {
                setDefaultCategories(data)
            }
        }
        if (pathname.includes('edit') || pathname.includes('clone')) {
            const getItem = async (itemId) => {
                const { data } = await axios.get(`/items/${Number(itemId)}`);
                setEditItem({ ...data });
                if (Object.keys(data).length) {
                    setFormState(data)
                }
            }
            getItem(itemId);

        }
        getCategories();

    }, [])

    const Inputfields = [
        {
            name: 'title',
            label: 'Title',
            class: 'col-lg-6',
            state: setTitle,
            value: title,
            required: true,
            invalidFeedback: "This field can't be empty"
        },
        {
            name: 'subtitle',
            label: 'Sub Title',
            class: 'col-lg-6',
            state: setSubTitle,
            value: subtitle,
            required: true,
            invalidFeedback: "This field can't be empty"
        },
        {
            name: 'description',
            label: 'Description',
            class: 'col-lg-6',
            state: setDescription,
            value: description,
            required: true,
            invalidFeedback: "This field can't be empty"
        },
        {
            name: 'highlights',
            label: 'Highlights',
            class: 'col-lg-6',
            state: setHighlights,
            value: highlights
        },
        {
            name: 'location',
            label: 'Location',
            class: 'col-lg-6',
            state: setLocation,
            value: location,
            required: true,
            invalidFeedback: "This field can't be empty"
        },
        {
            name: 'address1',
            label: 'Address1',
            class: 'col-lg-6',
            state: setAddress1,
            value: address1
        },
        {
            name: 'address2',
            label: 'Address2',
            class: 'col-lg-6',
            state: setAddress2,
            value: address2
        },
        {
            name: 'city',
            label: 'City',
            class: 'col-lg-6',
            state: setCity,
            value: city
        },
        {
            name: 'state',
            label: 'State',
            class: 'col-lg-6',
            state: setState,
            value: state
        },
        {
            name: 'zipcode',
            label: 'Zipcode',
            class: 'col-lg-6',
            state: setZipcode,
            value: zipcode
        },
        {
            name: 'featured_desc1',
            label: 'Featured desc1',
            class: 'col-lg-6',
            state: setFeaturedDesc1,
            value: featured_desc1
        },
        {
            name: 'featured_desc2',
            label: 'Featured desc2',
            class: 'col-lg-6',
            state: setFeaturedDes2,
            value: featured_desc2
        },
        {
            name: 'featured_desc3',
            label: 'Featured desc3',
            class: 'col-lg-6',
            state: setFeaturedDes3,
            value: featured_desc3
        },
        {
            name: 'price',
            label: 'Price',
            class: 'col-lg-6',
            state: setPrice,
            value: price,
            type: 'number'
        },
        {
            name: 'rental_cost',
            label: 'Rental Cost',
            class: 'col-lg-6',
            state: setRentalCost,
            value: rental_cost,
            type: 'number'
        },



    ]

    const dropdownFields = [{
        label: 'Status',
        class: 'col-lg-6',
        state: setStatus,
        value: status,
        options: [{ id: 'ACTIVE', name: 'ACTIVE' }, { id: 'AVAILABLE', name: 'AVAILABLE' }]
    }, {
        label: 'Visibility',
        class: 'col-lg-6',
        state: setVisibility,
        value: visibility,
        options: [{ id: 'PUBLIC', name: 'PUBLIC' }, { id: 'PRIVATE', name: 'PRIVATE' }]
    }, {
        label: 'Category',
        class: 'col-lg-6',
        state: setCategory,
        value: category,
        options: defaultCategories,
        required: true,
        invalidFeedback: "This field can't be empty"
    }]


    const uploadFile = async () => {
        const formData = new FormData()
        formData.append('file', imgFile)
        const { data } = await axios.post("/upload", formData)
        return data;
    }

    const createItem = async (formData) => {
        if (!!imgFile) {
            const imagePath = await uploadFile()
            formData.thumbnail_image = `/images/${imagePath}`;
        }
        if ((isClone || isEdit) && !!!imgFile) {
            formData.thumbnail_image = editItem.thumbnail_image;
        }
        try {
            formData.created_by = user.member_id
            await axios.post('/items', formData);

            setNotification({
                status: true,
                class: 'alert-primary',
                message: 'Item has been created successfully'
            })
        } catch (e) {
            console.error('errrooorooror', e.message);
            setNotification({
                status: true,
                class: 'alert-danger',
                message: 'Something went wrong'
            })
        }
    }
    const updateItem = async (formData) => {

        if (!!imgFile) {
            const imagePath = await uploadFile()
            formData.thumbnail_image = `/images/${imagePath}`;
        }
        const updatedFields = Object.keys(formData).reduce((diff, key) => {

            if (editItem[key] == formData[key]) return diff
            return {
                ...diff,
                [key]: formData[key]===''?null:formData[key]
            }
        }, {})

        try {
            updatedFields.modified_by = user.member_id
            const { data } = await axios.put(`/items/${editItem.item_id}`, updatedFields);
            setEditItem(data);
            setNotification({
                status: true,
                class: 'alert-primary',
                message: 'Item has been updated successfully'
            })
        } catch (e) {
            setNotification({
                status: true,
                class: 'alert-danger',
                message: 'Something went wrong'
            })
        }

    }

    const handleSubmit = (event) => {
        const form = event.target;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        if (form.checkValidity() === true) {
            const formData = new FormData(event.target);
            event.preventDefault();
            let data = {}
            for (let [key, value] of formData.entries()) {
                data = { ...data, [key]: value }
            }
            // const selectedCategory = defaultCategories.filter(cat => cat.name === data.category)
            // data.category = !!selectedCategory.length ? selectedCategory[0].category_id : ''
            
            data.owner_id = !isEdit ? (type === 'item' ? user.member_id : groupId) : editItem.owner_id
            data.owner_type = !isEdit ? (type === 'item' ? 'USER' : 'GROUP') : editItem.owner_type
            data.status = status;
            data.visibility = visibility;
            if (!isEdit) {
                data.thumbnail_image = ''
                createItem(data)
            } else {
                updateItem(data)
            }

        }
    }
    const handleReset = (event) => {
        event.preventDefault();
      
        // setFormState(!!editItem?editItem:null)
          setFormState(editItem)
    }

    return (<div className="container primary-container">
        <h3>{(!isEdit || isClone) ? 'Create' : isEdit ? 'Edit' : 'Clone'} Item </h3>
        <hr />
        {!!user && editItem.item_id && isEdit ?
            <>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Edit Availability
         </button>

                <AvailabilityModal member_id={user.member_id} item_id={editItem.item_id} />
            </>
            : ''}

        <form className="mb-5 needs-validation" onSubmit={(e) => handleSubmit(e)} noValidate>
            <div className="row">
                {Inputfields.map((field, i) => (<div className={`${field.class} mt-5`} key={i}>
                    <label  >{field.label}{!!field.required ? '*' : ''}</label>
                    <input
                        type={field.type || "text"}
                        className="form-control"
                        placeholder={field.label}
                        value={field.value}
                        name={field.name}
                        onChange={(e) => field.state(e.currentTarget.value)}
                        required={!!field.required}
                    />
                    {!!field.invalidFeedback &&
                        <div className="invalid-feedback">
                            {field.invalidFeedback}
                        </div>
                    }
                </div>
                )
                )}
                {dropdownFields.map((field,index) => (
                    <div className={`${field.class} mt-5 form-group`} key={field.label}>
                        <label htmlFor={`exampleFormControlSelect${index}`}>{field.label}{!!field.required ? '*' : ''}</label>
                        <select className="form-control" id={`exampleFormControlSelect${index}`}
                            value={editItem[field.label] || field.value}
                            onChange={(e) => field.state(e.currentTarget.value)}
                            name={field.label.toLowerCase()}
                            required={!!field.required}
                        >
                            <option value="" disabled hidden>Select</option>
                            {!!field.options.length && field.options.map((option, i) => <option key={i} value={option.id} >{option.name}</option>)}
                        </select>
                        {!!field.invalidFeedback &&
                            <div className="invalid-feedback">
                                {field.invalidFeedback}
                            </div>
                        }
                    </div>)

                )}


            </div>
            <ImageUpload setImage={(e) => setImage(e)} img={thumbnail_image} />
            <div className="row mt-5 justify-content-around border-top pt-5 pb-5">
                <Link className={`btn btn-secondary btn-lg ${isEdit ? 'col-lg-3' : 'col-lg-5'}`} to="/">Cancel</Link>
                {isEdit && <button className={'btn btn-warning btn-lg col-lg-3'}
                    onClick={(event) => handleReset(event)} >Reset</button>}
                <button className={`btn btn-home btn-lg ${isEdit ? 'col-lg-3' : 'col-lg-5'}`}
                    type="submit" >{isEdit ? 'Update' : 'Create'}</button>
            </div>
        </form>

        {!!Object.keys(notification).length && <Popup
            handleCancel={() => notification.class === 'alert-primary' ? history.push("/") : setNotification({})}
            message={notification.message}
            alertClass={notification.class}

        />}
    </div>

    );
}

export default Form;