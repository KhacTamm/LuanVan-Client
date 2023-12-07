import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getproductById, removeProductById, saveProduct } from '../../../../../redux/actions/ProductAction'
import { getAllTypeProduct, removeSearchType, searchType } from '../../../../../redux/actions/ListTypeProductAction'
import { getAllBrandProduct } from '../../../../../redux/actions/ListPublisherAction'
import { getAllAuthor, removeSearchAuthor, searchAuthor } from '../../../../../redux/actions/AuthorAction'

import { handleDataAuthor, handleDataBrand, handleDataType } from '../../../../../untils'

import { Editor } from '@tinymce/tinymce-react'

import InputCustomer from '../../FromComponents/InputCustomer/InputCustomer'
import HeaderText from '../../TextAdmin/HeaderText/HeaderText'
import ButtonCustomer from '../../FromComponents/ButtonCustomer/ButtonCustomer'
import ImageCreate from '../../ImageCreate/ImageCreate'
import SearchEmpty from '../../SearchEmpty/SearchEmpty'

import { GiReturnArrow } from 'react-icons/gi'
import { SearchOutlined } from '@ant-design/icons'
import './AdminCreate.css'
import { Checkbox } from 'antd'
import { success } from '../../../../Message/Message'
import { message } from 'antd'

function AdminCreate() {
    const { register, handleSubmit } = useForm({ defaultValues: {} })
    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams()

    const detailProduct = useSelector((state) => state.getProductById.product)

    const { ListBrannd } = useSelector((state) => state.allBrandProduct)
    const { typeProduct } = useSelector((state) => state.allTypeProduct)
    const { authorList } = useSelector((state) => state.allAuthor)
    const editorRef = useRef(null)

    const [image, setImage] = useState('')
    const [activeTypeProduct, setActiveTypeproduct] = useState('')
    const [activeBrandProduct, setActiveBrandProduct] = useState('')
    const [activeAuthor, setActiveAuthor] = useState('')
    const [stateFile, setStateFile] = useState(id && detailProduct ? detailProduct.image : '')
    const [visible, setVisible] = useState(id && detailProduct ? detailProduct.visible : '')

    useEffect(() => {
        if (id) {
            dispatch(getproductById(id))
        }

        return () => {
            dispatch(removeProductById())
        }
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getAllTypeProduct())
        dispatch(getAllBrandProduct())
        dispatch(removeSearchAuthor())
        dispatch(removeSearchType())
        dispatch(getAllAuthor())
    }, [dispatch])

    // search author
    const [searchAuth, setSearchAuth] = useState('')
    const SearAuthor = useSelector((state) => state.searchAuthor)
    const { SearchAuthorResult } = SearAuthor

    const SearchAuthor = async (e) => {
        e.preventDefault()
        if (searchAuth.replaceAll(' ', '') && searchAuth !== '') {
            dispatch(searchAuthor(searchAuth.trim()))
        }
    }

    const GoBackAuthor = async () => {
        dispatch(removeSearchAuthor())
    }
    //search type
    const [searchDM, setSearchDM] = useState('')
    const searchtype = useSelector((state) => state.searchType)
    const { searchTypeResult } = searchtype

    const SearchType = async (e) => {
        e.preventDefault()
        if (searchDM.replaceAll(' ', '') && searchDM !== '') {
            dispatch(searchType(searchDM.trim()))
        }
    }

    const GoBackType = async () => {
        dispatch(removeSearchType())
    }

    const handleFileImageChange = (e) => {
        const file = e.target.files[0]
        const newFile = file ? URL.createObjectURL(file) : ''

        if (file) {
            setImage(file)
        }
        setStateFile(newFile)
    }

    console.log(detailProduct)

    const MenuFirmProduct = (item, index) => (
        <div
            key={index}
            className={
                activeTypeProduct
                    ? activeTypeProduct === item.name
                        ? `filter-menu-firm-item-type active`
                        : 'filter-menu-firm-item-type'
                    : id && detailProduct && detailProduct.type === item.name
                    ? `filter-menu-firm-item-type active`
                    : 'filter-menu-firm-item-type'
            }
            onClick={() => HandleFilterProductByType(item.name)}
        >
            <p className="radio"></p>
            <div>{item.name}</div>
        </div>
    )

    const MenuFirmProductBrand = (item, index) => (
        <div
            key={index}
            className={
                activeBrandProduct
                    ? activeBrandProduct === item.name
                        ? `filter-menu-firm-item-brand active`
                        : 'filter-menu-firm-item-brand'
                    : id && detailProduct && detailProduct.publisher === item.name
                    ? `filter-menu-firm-item-brand active`
                    : 'filter-menu-firm-item-brand'
            }
            onClick={() => HandleFilterProductByBrand(item.name)}
        >
            <img alt="img" className="img_brand" src={item.img}></img>
        </div>
    )

    const MenuFirmAuthor = (item, index) => (
        <div
            key={index}
            className={
                activeAuthor
                    ? activeAuthor === item.name
                        ? `filter-menu-firm-item-type active`
                        : 'filter-menu-firm-item-type'
                    : id && detailProduct && detailProduct.author === item.name
                    ? `filter-menu-firm-item-type active`
                    : `filter-menu-firm-item-type`
            }
            onClick={() => HandleFilterProductByAuthor(item.name)}
        >
            <p className="radio"></p>
            <div>{item.name}</div>
        </div>
    )

    const HandleFilterProductByType = (name) => {
        setActiveTypeproduct(name)
    }

    const HandleFilterProductByBrand = (name) => {
        setActiveBrandProduct(name)
    }

    const HandleFilterProductByAuthor = (name) => {
        setActiveAuthor(name)
    }

    const SetVisible = () => {
        setVisible(!visible)
        if (detailProduct) {
            detailProduct.visible = !visible
        }
    }

    const error = () => {
        message.error({
            content: 'Vui lòng nhập đây đủ thông tin',
            duration: 1,
            className: 'custom-class-create',
            style: {
                position: 'absolute',
                left: '50%',
                top: '20px',
                zIndex: '999',
            },
        })
    }

    const onSubmit = async (data) => {
        let formData = new FormData()
        const blogContent = String(editorRef.current ? editorRef.current.getContent() : '')

        const type = activeTypeProduct ? activeTypeProduct : detailProduct ? detailProduct.type : ''
        const publisher = activeBrandProduct ? activeBrandProduct : detailProduct ? detailProduct.publisher : ''
        const author = activeAuthor ? activeAuthor : detailProduct ? detailProduct.author : ''

        if (id) {
            formData.append('_id', id)
        }
        formData.append('name', data.name ? data.name : detailProduct ? detailProduct.name : '')
        formData.append('price', data.price ? data.price : detailProduct ? detailProduct.price : '')
        formData.append('salePrice', data.salePrice ? data.salePrice : detailProduct ? detailProduct.salePrice : '')
        formData.append('amount', data.amount ? data.amount : detailProduct ? detailProduct.amount : '')
        formData.append('image', image ? image : detailProduct ? detailProduct.image : '')
        formData.append(
            'datePublisher',
            data.datePublisher ? data.datePublisher : detailProduct ? detailProduct.datePublisher : '',
        )
        formData.append('size', data.size ? data.size : detailProduct ? detailProduct.size : data.size)
        formData.append('page', data.page ? data.page : detailProduct ? detailProduct.page : data.page)
        formData.append(
            'coverType',
            data.coverType ? data.coverType : detailProduct ? detailProduct.coverType : data.coverType,
        )
        formData.append(
            'translator',
            data.translator ? data.translator : detailProduct ? detailProduct.translator : data.translator,
        )
        formData.append('detail', blogContent ? blogContent : detailProduct ? detailProduct.blogContent : blogContent)
        formData.append('visible', detailProduct ? detailProduct.visible : visible)
        formData.append('type', type)
        formData.append('publisher', publisher)
        formData.append('author', author)

        if (publisher && author) {
            await dispatch(saveProduct(formData))
            detailProduct ? success('Cập nhật sản phẩm thành công') : success('Thêm sản phẩm thành công')
            history('/admin/product')
        } else {
            error()
        }
    }

    const goBack = () => {
        window.history.back() // Sử dụng window.history.back() để trở lại trang trước
    }

    const type = handleDataType(typeProduct)
    const brand = handleDataBrand(ListBrannd)
    const author = handleDataAuthor(authorList)

    return (
        <div className="admin-create">
            <HeaderText lable={id && detailProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}>
                <Link onClick={goBack}>
                    <GiReturnArrow />
                </Link>
            </HeaderText>
            <form className="admin-create-product" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <InputCustomer lable="Tên sản phẩm">
                    <input
                        required
                        {...register('name')}
                        placeholder="Nhập tên sản phẩm"
                        autoComplete="off"
                        defaultValue={id && detailProduct ? detailProduct.name : ''}
                    ></input>
                </InputCustomer>
                <div className="item-input">
                    <label>Nhà xuất bản</label>
                    <div className="filter-menu-firm-brand">
                        {brand ? brand.map((item, index) => MenuFirmProductBrand(item, index)) : ''}
                    </div>
                </div>
                <div className="item-input">
                    <label>Tác giả</label>
                    <div className="filter-menu-firm">
                        <div className="search-admin">
                            <input
                                value={searchAuth}
                                type="text"
                                name="search"
                                spellCheck={false}
                                autoComplete="off"
                                onChange={(e) => setSearchAuth(e.target.value)}
                                onKeyUp={(e) => SearchAuthor(e)}
                                placeholder="Nhập tên tác giả..."
                            />
                            <SearchOutlined onClick={(e) => SearchAuthor(e)} />
                        </div>
                        <div className="search-admin_create_list">
                            {SearchAuthorResult ? (
                                Array.isArray(SearchAuthorResult) && SearchAuthorResult.length && searchAuth !== '' ? (
                                    SearchAuthorResult.map((item, index) => MenuFirmAuthor(item, index))
                                ) : (
                                    <SearchEmpty create keySearch={searchAuth} GoBack={GoBackAuthor} />
                                )
                            ) : authorList ? (
                                author.map((item, index) => MenuFirmAuthor(item, index))
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
                <div className="item-input">
                    <label>Danh mục sách</label>
                    <div className="filter-menu-firm">
                        <div className="search-admin">
                            <input
                                value={searchDM}
                                type="text"
                                name="search"
                                spellCheck={false}
                                autoComplete="off"
                                onChange={(e) => setSearchDM(e.target.value)}
                                onKeyUp={(e) => SearchType(e)}
                                placeholder="Nhập tên danh mục sách..."
                            />
                            <SearchOutlined onClick={(e) => SearchType(e)} />
                        </div>
                        <div className="search-admin_create_list">
                            {searchTypeResult ? (
                                Array.isArray(searchTypeResult) && searchTypeResult.length && searchDM !== '' ? (
                                    searchTypeResult.map((item, index) => MenuFirmProduct(item, index))
                                ) : (
                                    <SearchEmpty create keySearch={searchDM} GoBack={GoBackType} />
                                )
                            ) : type ? (
                                type.map((item, index) => MenuFirmProduct(item, index))
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
                <InputCustomer lable="Hình ảnh">
                    {id && detailProduct ? (
                        <input
                            type="file"
                            {...register('image')}
                            onChange={handleFileImageChange}
                            accept="image/*"
                            defaultValue={detailProduct.image}
                        ></input>
                    ) : (
                        <input
                            type="file"
                            {...register('image')}
                            onChange={handleFileImageChange}
                            accept="image/*"
                        ></input>
                    )}
                </InputCustomer>
                {stateFile ? (
                    <ImageCreate src={stateFile} />
                ) : detailProduct ? (
                    <ImageCreate src={detailProduct.image} />
                ) : (
                    ''
                )}
                <div className="second-input">
                    <InputCustomer lable="Giá sản phẩm">
                        <input
                            {...register('price')}
                            placeholder="Giá gốc"
                            type="number"
                            autoComplete="off"
                            defaultValue={id && detailProduct ? detailProduct.price : ''}
                        ></input>
                    </InputCustomer>
                    <InputCustomer>
                        <input
                            required
                            {...register('salePrice')}
                            placeholder="Giá bán"
                            type="number"
                            autoComplete="off"
                            defaultValue={id && detailProduct ? detailProduct.salePrice : ''}
                        ></input>
                    </InputCustomer>
                </div>
                <div className="second-input">
                    <InputCustomer lable="Số lượng">
                        <input
                            required
                            {...register('amount')}
                            placeholder="Số lượng"
                            type="number"
                            autoComplete="off"
                            defaultValue={id && detailProduct ? detailProduct.amount : ''}
                        ></input>
                    </InputCustomer>
                    <InputCustomer lable="Năm xuất bản">
                        <input
                            {...register('datePublisher')}
                            placeholder="Năm sản xuất"
                            autoComplete="off"
                            defaultValue={id && detailProduct ? detailProduct.datePublisher : ''}
                        ></input>
                    </InputCustomer>
                </div>
                <div className="second-input">
                    <InputCustomer lable="Loại bìa">
                        <input
                            {...register('coverType')}
                            placeholder="Loại bìa"
                            autoComplete="off"
                            defaultValue={id && detailProduct ? detailProduct.coverType : ''}
                        ></input>
                    </InputCustomer>
                    <InputCustomer lable="Số trang">
                        <input
                            {...register('page')}
                            placeholder="Số trang sách"
                            type="number"
                            autoComplete="off"
                            defaultValue={id && detailProduct ? detailProduct.page : ''}
                        ></input>
                    </InputCustomer>
                </div>
                <div className="second-input">
                    <InputCustomer lable="Kích thước">
                        <input
                            {...register('size')}
                            placeholder="Kích thước sách"
                            autoComplete="off"
                            defaultValue={id && detailProduct ? detailProduct.size : ''}
                        ></input>
                    </InputCustomer>
                    <InputCustomer lable="Dịch giả">
                        <input
                            {...register('translator')}
                            placeholder="Dịch giả"
                            autoComplete="off"
                            defaultValue={id && detailProduct ? detailProduct.translator : ''}
                        ></input>
                    </InputCustomer>
                </div>
                <div className="item-input">
                    <label>Mô tả sách</label>
                    <Editor
                        apiKey="cmlltcvw2ydrtenwdgwdwqqrvsje6foe8t5xtyaq6lo2ufki"
                        language="vi"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={id && detailProduct ? detailProduct.detail : <div></div>}
                        init={{
                            height: 320,
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
                        checked={(id && detailProduct && detailProduct.visible) || visible}
                        size="large"
                        style={{
                            lineHeight: '40px',
                            paddingRight: '6px',
                        }}
                    />
                    <div style={{ fontSize: '1.6rem', fontWeight: '600', userSelect: 'none', cursor: 'pointer' }}>
                        Hiển thị sản phẩm
                    </div>
                </div>
                <ButtonCustomer type="submit">
                    {id && detailProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                </ButtonCustomer>
            </form>
        </div>
    )
}

export default AdminCreate
