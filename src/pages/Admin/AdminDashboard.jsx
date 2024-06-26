import React, { useContext, useEffect, useState } from 'react'
import GlobalContext, { Context } from '../../context/GlobalContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppLoader } from '../../components/LoaderSpinner'
import useIsAdminAuth from '../../hooks/useIsAdminAuth'
import { httpRequest } from '../../utils/httpsRequest'
import AlertModal from '../../components/AlertModal'
import { PrimaryButton } from '../../components/buttons'
import { toast } from 'sonner'

const AdminDashboard = () => {
  const {admin, isAdminAuth, adminLoading, actions} = useContext(Context)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [openAlertModal, setOpenAlertModal] = useState(false)
  const [alertLoading, setAlertLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    httpRequest
    .get("/admin/all-users")
    .then(({data}) => {
      console.log("res: ", data);
      setUsers(data)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [])

  const handleDeleteUser = () => {
    if(userId)
    {
      setAlertLoading(true);
      httpRequest
        .delete(`/admin/delete-user/${userId}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== userId));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setAlertLoading(false);
          setOpenAlertModal(false)
          setUserId(null)
        });
    }
  };

  const handleLogout = () => {
    httpRequest
      .post("/admin/logout")
      .then((data) => {
        toast.success("Logged out successfully");
        actions({ type: "SET_IS_ADMIN_AUTH", payload: false });
        actions({ type: "SET_ADMIN", payload: {} });
        navigate("/admin/login");
        console.log(data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log("err: ", err);
      })
      .finally(() => {});
  };
  
  if(adminLoading){
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <AppLoader />
      </div>
    );
  }
  
  if(!isAdminAuth){
    return <Navigate to={'/admin/login'}/>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md h-screen">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
          <PrimaryButton className='h-[20px]' onClick={handleLogout}>Logout</PrimaryButton>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <AppLoader />
          </div>
        ) : (
          <div className="border border-gray-400 rounded-lg mt-5" >
            <div className={`grid grid-cols-7 p-3 rounded-t-lg bg-gray-100`}>
                <span>ID</span>
                <span>Name</span>
                <span>Email</span>
                <span>Account Created Date</span>
                <span>Cafe Name</span>
                <span>Cafe Created Date</span>
                <span>Actions</span>
              </div>
            <div>
              {users?.length > 0 && users.map((user) => (
                <div className={`grid grid-cols-7 p-3 `} key={user._id}>
                  <span className="py-2 px-4">{user._id}</span>
                  <span className="py-2 px-4">{user.name}</span>
                  <span className="py-2 px-4">{user.email}</span>
                  <span className="py-2 px-4">{user?.createdAt?.substring(0, 10)}</span>
                  <span className="py-2 px-4">{user?.cafeId?.name}</span>
                  <span className="py-2 px-4">{user?.cafeId?.createdAt?.substring(0, 10)}</span>
                  <span className="py-2 px-4">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                      onClick={() => {setOpenAlertModal(true); setUserId(user._id)}}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <AlertModal openModal={openAlertModal} setopenModal={setOpenAlertModal} onConfirm={handleDeleteUser} loading={alertLoading}>
        <div className='flex flex-col'>
          <p className=" font-bold text-lg">Are you sure you want to delete this user?</p>
          <p className='text-gray-500 text-md'>Once deleted, this user will no longer be available.</p>
        </div>
        <div className=""></div>
      </AlertModal>
    </div>
  )
}

export default AdminDashboard

