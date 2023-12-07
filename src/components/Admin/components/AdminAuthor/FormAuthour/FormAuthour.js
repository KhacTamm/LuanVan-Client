import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getAuthorById, removeAuthorById, saveAuthor } from '../../../../../redux/actions/AuthorAction'

import config from '../../../../../config'

import { useForm } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

import HeaderText from '../../TextAdmin/HeaderText/HeaderText'
import InputCustomer from '../../FromComponents/InputCustomer/InputCustomer'
import ButtonCustomer from '../../FromComponents/ButtonCustomer/ButtonCustomer'
import ImageCreate from '../../ImageCreate/ImageCreate'

import { GiReturnArrow } from 'react-icons/gi'
import { Checkbox } from 'antd'
import { success } from '../../../../Message/Message'

function FromAuthour() {
    const { register, handleSubmit } = useForm({ defaultValues: {} })
    const { id } = useParams()
    const history = useNavigate()
    const dispatch = useDispatch()
    const detailAuthor = useSelector((state) => state.getAuthorById.author)

    const [stateFile, setStateFile] = useState(detailAuthor ? detailAuthor.image : '')
    const [visible, setVisible] = useState(detailAuthor ? detailAuthor.visible : '')
    const [image, setImage] = useState('')

    const editorRef = useRef(null)

    useEffect(() => {
        if (id) {
            dispatch(getAuthorById(id))
        }

        return () => {
            dispatch(removeAuthorById())
        }
    }, [dispatch, id])

    const handleFileImageChange = (e) => {
        const file = e.target.files[0]
        const newFile = file ? URL.createObjectURL(file) : ''

        if (file) {
            setImage(file)
        }
        setStateFile(newFile)
    }

    const SetVisible = () => {
        setVisible(!visible)
        if (detailAuthor) {
            detailAuthor.visible = !visible
        }
    }

    const onSubmit = async (data) => {
        let formData = new FormData()
        const blogContent = String(editorRef.current.getContent())
        if (id) {
            formData.append('_id', id)
        }
        formData.append('name', data.name ? data.name : detailAuthor ? detailAuthor.name : '')
        formData.append('image', image ? image : detailAuthor ? detailAuthor.img : '')
        formData.append('detail', blogContent ? blogContent : detailAuthor ? detailAuthor.biography : blogContent)
        formData.append('visible', detailAuthor ? detailAuthor.visible : visible)

        await dispatch(saveAuthor(formData))
        detailAuthor ? success('Cập nhật tác giả thành công') : success('Thêm tác giả thành công')
        history(config.routes.author)
    }

    return (
        <div className="admin-create">
            <HeaderText lable={detailAuthor ? 'Cập nhật thông tin tác giả' : 'Thêm tác giả'}>
                <Link to={config.routes.author}>
                    <GiReturnArrow />
                </Link>
            </HeaderText>
            <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <InputCustomer lable="Tên tác giả">
                    <input
                        required
                        {...register('name')}
                        placeholder="Nhập tác giả"
                        autoComplete="off"
                        defaultValue={detailAuthor ? detailAuthor.name : ''}
                    ></input>
                </InputCustomer>
                <InputCustomer lable="Hình ảnh">
                    {detailAuthor ? (
                        <input
                            type="file"
                            {...register('image')}
                            onChange={handleFileImageChange}
                            defaultValue={detailAuthor ? detailAuthor.image : ''}
                        ></input>
                    ) : (
                        <input type="file" {...register('image')} onChange={handleFileImageChange}></input>
                    )}
                </InputCustomer>

                {stateFile ? (
                    <ImageCreate src={stateFile} />
                ) : detailAuthor ? (
                    <ImageCreate src={detailAuthor.image} />
                ) : (
                    ''
                )}
                <div className="item-input">
                    <label>Tiêu sử tác giả</label>
                    <Editor
                        apiKey="cmlltcvw2ydrtenwdgwdwqqrvsje6foe8t5xtyaq6lo2ufki"
                        language="vi"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={detailAuthor ? detailAuthor.biography : <div></div>}
                        init={{
                            height: 300,
                            menubar: 'file edit view insert format tools table tc help',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                    />
                </div>
                <div onClick={() => SetVisible()} className="d-flex py-4 align-items-center">
                    <Checkbox
                        checked={(detailAuthor && detailAuthor.visible) || visible}
                        size="large"
                        style={{
                            lineHeight: '40px',
                            paddingRight: '6px',
                        }}
                    />
                    <div style={{ fontSize: '1.6rem', fontWeight: '600', userSelect: 'none', cursor: 'pointer' }}>
                        Hiển thị tác giả
                    </div>
                </div>
                <ButtonCustomer type="submit">{detailAuthor ? 'Cập nhật tác giả' : 'Thêm tác giả'}</ButtonCustomer>
            </form>
        </div>
    )
}

export default FromAuthour
