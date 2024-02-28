import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.scss";
import axios from "axios";
import { categoryAction } from "../store/slices/jobs.slice";

const Home = () => {
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);
  const [newJob, setNewJob] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const categoryStore = useSelector((store) => store.categoryStore);
  const [selectedJobId, setSelectedJobId] = useState(null);
  console.log(categoryStore);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newJob.trim()) {
      
      setWarning(true);
      return; 
    }
    try {
      const response = await axios.post("http://localhost:3000/jobs", {
        name: newJob,
      });
      console.log("Thêm công việc thành công:", response.data);
      e.target.reset();
      setNewJob("");
      dispatch(categoryAction.jobAll());
    } catch (error) {
      console.error("Lỗi khi thêm công việc:", error);
      setWarning(true);
    }
  };
  const handleEditIconClick = (id) => {
    dispatch(categoryAction.editjob({id:id,name:"edited"}))
    
  }
  

  const handleChange = (e) => {
    setNewJob(e.target.value);
  };
  const confirmDelete = async (id) => {
    console.log("Deleting job with ID:", id);
    const jobId = id;
    await axios
      .delete(`http://localhost:3000/jobs/${jobId}`)
      .then((res) => {
        console.log("Xóa công việc thành công: ", res);
        dispatch(categoryAction.jobAll());
        setIsVisible(false); 
      })
      .catch((error) => {
        console.error("Lỗi khi xóa công việc:", error);
      });
  };

  const cancelDelete = () => {
    setIsVisible(false); 
  };
  const handleTrashIconClick = (jobId) => {
    setSelectedJobId(jobId); 
    setIsVisible(true); 
  };

  return (
    <>
      <div className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form
                    className="d-flex justify-content-center align-items-center mb-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-outline flex-fill">
                      <input
                        type="text"
                        id="form2"
                        className="form-control"
                        value={newJob}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="form2">
                        Nhập tên công việc
                      </label>
                    </div>
                    <button type="submit" className="btn btn-info ms-2">
                      Thêm
                    </button>
                  </form>

                  {/* Tabs navs */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a className="nav-link active">Tất cả</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Đã hoàn thành</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Chưa hoàn thành</a>
                    </li>
                  </ul>
                  {/* Tabs navs */}

                  {/* Tabs content */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {categoryStore.data &&
                          categoryStore.data.map((item, index) => (
                            <li
                              key={index}
                              className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                              style={{ backgroundColor: "#f4f6f7" }}
                            >
                              <div>
                                <input
                                  className="form-check-input me-2"
                                  type="checkbox"
                                  id={`checkbox-${index}`}
                                />
                                <label htmlFor={`checkbox-${index}`}>
                                  {item.name}
                                </label>
                              </div>
                              <div className="d-flex gap-3">
                                <i className="fas fa-pen-to-square text-warning" onClick={()=>{
                                  handleEditIconClick(item.id)
                                }}></i>
                                <i
                                  className="far fa-trash-can text-danger"
                                  onClick={() => handleTrashIconClick(item.id)}
                                ></i>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Xác nhận */}
      <div className="overlay" hidden={!isVisible}>
        <div className="modal-custom">
          <div className="modal-header-custom">
            <h5>Xác nhận</h5>
            <i className="fas fa-xmark" onClick={cancelDelete}></i>
          </div>
          <div className="modal-body-custom">
            <p>Bạn chắc chắn muốn xóa công việc {}</p>
          </div>
          <div className="modal-footer-footer">
            <button className="btn btn-light" onClick={cancelDelete}>
              Hủy
            </button>
            <button
              className="btn btn-danger"
              onClick={() => confirmDelete(selectedJobId)}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>

      {/* Modal Cảnh báo */}
      <div className="overlay" hidden={!warning}>
        <div className="modal-custom">
          <div className="modal-header-custom">
            <h5>Cảnh báo</h5>
            <i
              className="fas fa-xmark"
              onClick={() => {
                setWarning(false);
              }}
            ></i>
          </div>
          <div className="modal-body-custom">
            <p>Tên công việc không được phép để trống.</p>
          </div>
          <div className="modal-footer-footer">
            <button
              className="btn btn-light"
              onClick={() => {
                setWarning(false);
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
