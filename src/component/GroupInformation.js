import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PlusIcon, TrashIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/solid';

const GroupInformation = () => {
  const [ListGroup, setListGroup] = useState([]);
  const [ListMember, setListMember] = useState([]);
  const [showModal, setShowModal] = useState(false); // Quản lý việc hiển thị modal
  const [showModalDetail, setShowModalDetail] = useState(false); // Quản lý việc hiển thị modal chi tiết nhóm
  const [selectMember, setSelectMember] = useState([]); // Danh sách thành viên được chọn
  const [groupName, setGroupName] = useState(''); // Tên nhóm
  const [error, setError] = useState(''); // Lưu thông báo lỗi
  const [selectGroup, setSelectGroup] = useState(null); // Lưu thông tin nhóm được chọn
  const [showModalMember, setShowModalMember] = useState(false); // Quản lý việc hiển thị modal thành viên nhóm
  const [addMemberModal, setAddMemberModal] = useState(false); // Quản lý việc hiển thị modal thêm thành viên
  const [removeMemberModal, setRemoveMemberModal] = useState(false); // Quản lý việc hiển thị modal xóa thành viên
  // Lấy thông tin nhóm từ API
  const fetchGroup = async () => {
    try {
      const token = Cookies.get('token'); // Lấy token từ cookies
      const res = await axios.get('http://localhost:3008/api/v1/groups', {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      console.log('Danh sách nhóm:', res.data.data.items);
      setListGroup(res.data.data.items);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhóm:', error);
    }
  };

  // Lấy danh sách thành viên từ API
  const fetchMember = async () => {
    try {
      const token = Cookies.get('token'); // Lấy token từ cookies
      const res = await axios.get('http://localhost:3008/api/v1/users', {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
        params: {
          'query[page]': 1,
          'query[size]': 10,
          'query[sortDirection]': 'descs',
          'query[sortBy]': 'registerDate',
        },
      });
      console.log('Danh sách người dùng:', res.data.data.items);
      setListMember(res.data.data.items);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
  };

  // Hiển thị modal và lấy danh sách thành viên
  const openModal = () => {
    fetchMember(); // Lấy danh sách thành viên
    setShowModal(true); // Hiển thị modal
  };
  // Chọn thành viên
    const handleSelectMember = (userId) => {
        const index = selectMember.indexOf(userId);
        if (index === -1) {
            setSelectMember([...selectMember, userId]);
        } else {
            setSelectMember(selectMember.filter((id) => id !== userId));
        }
        // console.log('Danh sách thành viên được chọn:', selectMember);
    }
// Tạo nhóm
    const createGroup = async () => {
        try {
            const token = Cookies.get('token'); // Lấy token từ cookies
            if (selectMember.length < 3) {
                setError('Nhóm cần ít nhất 3 thành viên');
                return;
            }
            if (!groupName) {
                setError('Vui lòng nhập tên nhóm');
                return;
            }
            setError('');
            const res = await axios.post('http://localhost:3008/api/v1/groups', {
                groupName: groupName,
                // leader là thành viên đầu tiên được chọn
                leaderId: selectMember[0],
              // member là danh sách các thành viên được chọn, bỏ qua thành viên đầu tiên
                memberIds: selectMember.slice(1),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Gửi token trong header
                },
            });
            console.log('Tạo nhóm thành công:', res.data.data);
            fetchGroup(); // Gọi lại API để cập nhật danh sách nhóm
            setShowModal(false); // Đóng modal
        } catch (error) {   
            console.error('Lỗi khi tạo nhóm:', error);
        }
    };
    // Hiển thị modal khi nhấn vào "Xem chi tiết" của một nhóm
  const handleShowDetail = (group) => {
    setSelectGroup(group) // Lưu nhóm được chọn
    setShowModalDetail(true); // Hiển thị modal
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModalDetail(false); // Đóng modal
    setSelectGroup(null); // Xóa nhóm được chọn khi đóng modal
  };
  // hiển thị modal thành viên nhóm
  const handleViewMembers = (groupId) => {
    setShowModalMember(true); // Hiển thị modal
  };
  // đóng modal thành viên nhóm
  const handleCloseModalMember = () => {
    setShowModalMember(false); // Đóng modal
  };
  // Thêm thành viên vào nhóm
  const handleAddMember = (groupId) => {
    setAddMemberModal(true); // Hiển thị modal
  };
  // Xóa thành viên khỏi nhóm
  const handleRemoveMember = (groupId) => {
    setRemoveMemberModal(true); // Hiển thị modal
  };
  // đóng modal thêm thành viên
  const handleCloseAddMember = () => {
    setAddMemberModal(false); // Đóng modal
  };
  // đóng modal xóa thành viên
  const handleCloseRemoveMember = () => {
    setRemoveMemberModal(false); // Đóng modal
  };
  
    

  // Gọi API ngay khi component được render
  useEffect(() => {
    fetchGroup();
  }, []);

  // Xóa nhóm
  const deleteGroup = async (groupId) => {
    try {
      const token = Cookies.get('token'); // Lấy token từ cookies
      const res = await axios.delete(`http://localhost:3008/api/v1/groups/disperse/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      console.log('Xóa nhóm thành công:', res.data.data);
      fetchGroup(); // Gọi lại API để cập nhật danh sách nhóm
    } catch (error) {
      console.error('Lỗi khi xóa nhóm:', error);
    }
  };
 


  return (
    <div className="min-w-full items-center">
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={openModal}>
          Tạo nhóm mới
        </button>
      </div>
      <h1 className="font-bold text-2xl text-center mb-2">Danh sách các nhóm</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full h-16 text-sm leading-none text-gray-800 border">
            <th className="pl-4 border text-center">STT</th>
            <th className="pl-4 border text-center">Tên nhóm</th>
            <th className="pl-4 border text-center">Mô tả</th>
            <th className="pl-4 border text-center">Trưởng nhóm</th>
            <th className="pl-4 border text-center">Số lượng thành viên</th>
            <th className="pl-4 border text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {ListGroup.map((group, index) => (
            <tr key={index} className="w-full h-16 text-sm leading-none text-gray-800 border">
              <td className="pl-4 border text-center text-black">{index + 1}</td>
              <td className="pl-4 border text-center text-black">{group.groupName}</td>
              <td className="pl-4 border text-center text-black">{group.description}</td>
              <td className="pl-4 border text-center text-black">{group.leaderName}</td>
              <td className="pl-4 border text-center text-black">{group.memberNum}</td>
              <td className="pl-2 border text-center text-black">
                <button
                  className="rounded-lg bg-orange-300 mr-2 hover:bg-red-900 hover:text-white p-4"
                  onClick={() => deleteGroup(group.groupId)}
                >
                  Xóa nhóm
                </button>
                <button className="rounded-lg bg-blue-300 hover:bg-red-900 hover:text-white p-4"   onClick={() => handleShowDetail(group)}>Xem chi tiết</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-xl mb-4 text-center"> Tạo nhóm cần ít nhất 3 thành viên, người được chọn đầu tiên sẽ là trưởng nhóm
            </h2>
           {/* nhập tên nhóm */}
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupName">
                Tên nhóm
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="groupName"
                type="text"
                required
                placeholder="Nhập tên nhóm"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-center">STT</th>
                    <th className="border px-4 py-2 text-center">Họ</th>
                    <th className="border px-4 py-2 text-center">Tên</th>
                  <th className="border px-4 py-2 text-center">MSSV</th>
                    <th className="border px-4 py-2 text-center">Chọn</th>
                </tr>
              </thead>
              <tbody>
                {ListMember.map((member, index) => (
                  <tr className='hover:bg-orange-300' key={index}>
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">{member.firstName}</td>
                    <td className="border px-4 py-2 text-center">{member.lastName}</td>
                    <td className="border px-4 py-2 text-center">{member.userId}</td>
                    <td className="border px-4 py-2 text-center">
                      <input type="checkbox" onChange={() => handleSelectMember(member.userId)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={()=>createGroup()}>Tạo nhóm</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowModal(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
        
        {/* Modal chi tiết nhóm */}
           {/* Modal */}
           {showModalDetail && selectGroup && (
   <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/2">
        {/* <h1 className="text-xl mb-4 text-center">Chi tiết nhóm</h1> */}
        <h1 className='text-center'><strong>Tên nhóm:</strong> {selectGroup.groupName}</h1>
        <p className='text-center'><strong>Mô tả:</strong> {selectGroup.description}</p>
        
         {/* Đường phân cách */}
         <hr className="my-4 border-t-2 border-gray-200" />

        {/* Các nút hành động */}
        <div className="flex justify-around mt-4">
          <button 
            className="bg-green-500 text-white p-4 rounded-full hover:bg-green-700 flex items-center"
            onClick={() => handleAddMember(selectGroup.groupId)}
          >
            <PlusIcon className="h-5 w-5 " />
            {/* Thêm thành viên */}
          </button>

          <button 
            className="bg-red-500 text-white p-4 rounded-full hover:bg-red-700 flex items-center"
            onClick={() => handleRemoveMember(selectGroup.groupId)}
          >
            <TrashIcon className="h-5 w-5 " />
            {/* Xóa thành viên */}
          </button>

          <button 
            className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-700 flex flex-col items-center"
            onClick={() => handleViewMembers(selectGroup.groupId)}
          >
            <EyeIcon className="h-5 w-5 " />
            {/* Xem thành viên */}
          
          </button>
         
        </div>
   
        <div className="flex justify-around mt-4">
            <p>Thêm thành viên</p>
            <p>Xóa thành viên</p>
            <p>Xem thành viên</p>

        </div>
              {/* Đường phân cách */}
              <hr className="my-4 border-t-2 border-gray-200" />


        <div> 
        <p className='items-start mb-2'><strong>Trưởng nhóm:</strong> {selectGroup.leaderName}</p>
        <p className="items-start"><strong>Số lượng thành viên:</strong> {selectGroup.memberNum}</p>
        </div>
           {/* Đường phân cách */}
           <hr className="my-4 border-t-2 border-gray-200" />



        <div className="mt-4 flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center" onClick={handleCloseModal}>
            <XMarkIcon className="h-5 w-5 mr-2" />
            Đóng
          </button>
        </div>
      </div>
    </div>
)}
{/* Modal thành viên nhóm */}
        {showModalMember && (
          <div className="  fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center">STT</th>
                <th className="border px-4 py-2 text-center">Họ</th>
                <th className="border px-4 py-2 text-center">Tên</th>
                <th className="border px-4 py-2 text-center">MSSV</th>
              </tr>
            </thead>
          </table>
          <div className="mt-4 flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center" onClick={handleCloseModalMember}>
            <XMarkIcon className="h-5 w-5 mr-2" />
            Đóng
          </button>
        </div>
            
          </div>
          </div>
        )}
        {/* Modal thêm thành viên nhóm */}
        {addMemberModal && (
          <div className="  fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center">STT</th>
                <th className="border px-4 py-2 text-center">Họ</th>
                <th className="border px-4 py-2 text-center">Tên</th>
                <th className="border px-4 py-2 text-center">MSSV</th>
                <th className="border px-4 py-2 text-center">Chọn để thêm</th>
              </tr>
            </thead>
          </table>
          <div className="mt-4 flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center" onClick={handleCloseAddMember}>
            <XMarkIcon className="h-5 w-5 mr-2" />
            Đóng
          </button>
        </div>
            
          </div>
          </div>
        )}
        {/* Modal xóa thành viên nhóm */}
        {removeMemberModal && (
          <div className="  fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-center">STT</th>
                <th className="border px-4 py-2 text-center">Họ</th>
                <th className="border px-4 py-2 text-center">Tên</th>
                <th className="border px-4 py-2 text-center">MSSV</th>
                <th className="border px-4 py-2 text-center">Chọn để xóa</th>
              </tr>
            </thead>
          </table>
          <div className="mt-4 flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center" onClick={handleCloseRemoveMember}>
            <XMarkIcon className="h-5 w-5 mr-2" />
            Đóng
          </button>
        </div>
            
          </div>
          </div>
        )}
          {/* ----------------------------------------------------- */}
    </div>
  );
};

export default GroupInformation;
