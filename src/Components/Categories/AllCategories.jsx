import React, { useState, useEffect } from 'react'
import colorScheme from '../sourceFiles/Styles'
import AddUser from '../Users/AddUser'
import { toast } from 'react-toastify';
import EditCategory from './EditCategory';
import AddCategory from './AddCategory';

const AllCategories = () => {


  const [category, setCategory] = useState([]);
  const [totalCategory, setTotalCategory] = useState("")
  const [userId, setUserId] = useState('')
  // filters
  const [categoryId, setCategoryId] = useState('')
  const [categoryDate, setCategoryDate] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');

  const [loader, setLoader] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)
  const [editModal, setEditModal] = useState(false)

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    setLoader(true)
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_BASE_URL}fetch_all_categorys`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setLoader(false)
        if (result.status === "200") {

          setCategory(result.Categorys)
          setTotalCategory(result.total_categorys)
        }
        else {
          console.log("error in fetch_all_users")
        }
      })
      .catch(error => console.log('error', error));
  }

  const loadingSection = () => {
    if (category.length < 1) {
      return <h2 className='text-center text-white'>No Data Available</h2>
    }
    else {
      return <DataRender />
    }
  }


  const DataRender = () => {
    return (
      <>
        {
          filteredData.map((items, index) => {
            return (
              <Content items={items} index={index} />
            )
          }
          )}
      </>
    )
  }

  const filteredData = categoryId && !categoryTitle && !categoryDate ?
    category.filter((objects) => objects.id === (categoryId)) :
    categoryTitle && !categoryId && !categoryDate ?
      category.filter((objects) => objects.title === categoryTitle) :
      categoryDate && !categoryId && !categoryTitle ?
        category.filter((objects) => objects.Idate === categoryDate) :
        categoryId && categoryTitle && !categoryDate ?
          category.filter((objects) => objects.id === (categoryId) && objects.title == categoryTitle) :
          categoryTitle && categoryDate && !categoryId ?
            category.filter((objects) => objects.title === categoryTitle && objects.Idate == categoryDate) :
            categoryId && categoryTitle && categoryDate ?
              category.filter((objects) => objects.id === (categoryId) && objects.title === categoryTitle && objects.Idate === categoryDate) :
              category



  function Content({ items, index }) {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{items.id}</td>
        <td>{items.title}</td>
        <td>{items.types}</td>
        <td>{items.description}</td>
        <td>{items.Idate}</td>
        <td><button className='btn btn-outline-danger' onClick={() => openEditModal(items.id)}><i className='fa-solid fa-pen' /></button></td>

      </tr>
    )
  }

  function oncloseModal() {
    setShouldShow((prev) => !prev)
  }

  function openEditModal(id) {
    setUserId(id)
    setEditModal((prev) => !prev)
  }

  return (
    <div>

      <div>
        <div className="scroll-view-two scrollbar-secondary-two">
          <div className="content-wrapper p-3">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>
                      Category Sheet
                    </h1>
                  </div>
                </div>
              </div>
            </section>
            <section className="content">
              <div className="">
                <div className="row">
                  <div className="col-12">

                    <div className="card" style={{ color: colorScheme.card_txt_color, boxShadow: colorScheme.box_shadow_one, }}>
                      <div className="card-header">
                        <h5>Total Categories {totalCategory}</h5>
                        <button className="btn btn-outline-info btn-sm" onClick={() => { window.location.reload() }}>Reset Filters</button>
                        <button className="btn btn-outline-info btn-sm float-end" onClick={oncloseModal}>Add Category &nbsp;<i className='fa-solid fa-plus' /></button>
                        <div className="row p-2">

                          <div className="col-sm-3 col-lg-4">
                            <label htmlFor="" className="form-label "> Search with Category ID:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search with User ID..."
                                style={{
                                  borderRadius: '10px',
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                                onChange={(e) => setCategoryId(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-sm-3 col-lg-4">
                            <label htmlFor="" className="form-label "> Search with Title:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search by Username..."
                                style={{
                                  borderRadius: '10px',
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                                onChange={(e) => setCategoryTitle(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-sm-3 col-lg-4">
                            <label htmlFor="" className="form-label "> Search with Date:</label>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Search by Phone..."
                                style={{
                                  borderRadius: '10px',
                                  background: colorScheme.card_bg_color,
                                  color: colorScheme.card_txt_color,
                                }}
                                onChange={(e) => setCategoryDate(e.target.value)}
                              />
                            </div>
                          </div>


                        </div>
                      </div>
                      <div className="card-body table-responsive p-2">
                        <table className="table  text-nowrap">

                          {
                            loader === true ?
                              <>
                                <div className=''>
                                  <div className="loader">
                                    <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="categoryId">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                  </div>
                                </div>
                              </>
                              :
                              <>
                                <thead className="text-center">
                                  <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Types</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Action</th>

                                  </tr>
                                </thead>
                                <tbody className='text-center'>
                                  {
                                    loadingSection()
                                  }
                                </tbody>
                              </>
                          }

                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {
            category ?
              < AddCategory
                closeModal={oncloseModal}
                shouldShow={shouldShow}
              /> : null
          }

          {
            category ?
              < EditCategory
                category={category}
                openEditModal={openEditModal}
                editModal={editModal}
                userId={userId}
              /> : null
          }

        </div>
      </div>
    </div>
  )
}

export default AllCategories