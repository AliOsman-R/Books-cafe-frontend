import React, { useContext, useEffect, useState } from 'react';
import { AppLoader } from '../../../../components/LoaderSpinner';
import { httpRequest } from '../../../../utils/httpsRequest';
import { Context } from '../../../../context/GlobalContext';
import Search from '../../../../components/Search';
import Pagination from '../../../../components/Pagination';
import { setPagination } from '../../../../utils/AppUtils';
import { toast } from 'sonner';
import ItemCard from '../../../../components/cards/ItemCard';
import Sorting from '../../../../components/Sorting';

const GenericList = ({ type, initialState, sortFunction, AddComponent, EditComponent, requiredFieldsMissing, FormComponent, extraImagesKey, isItemDataChanged}) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const [openModal, setOpenModal] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({loading:false , id:null});
  const [itemData, setItemData] = useState(initialState);
  const [originalItemData, setOriginalItemData] = useState(initialState);
  const [filteredItems, setFilteredItems] = useState([]);
  const { user } = useContext(Context);
  console.log(filteredItems)

  useEffect(() => {
    setPageLoading(true);
    httpRequest.get(`${type}/user-${type}/${user._id}`)
      .then(({ data }) => {
        console.log(data)
        const sortedItems = sortFunction? sortFunction(data[type]) : data[type];
        setItems(sortedItems);
        setFilteredItems(sortedItems);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleSearch = (e, setSearchQuery) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredData = items.filter(item =>
      Object.values(item).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredItems(filteredData);
  };

  const handleDelete = (item) => {
    setDeleteLoading({loading:true, id:item._id});
    httpRequest.delete(`${type}/${item._id}`)
      .then(({ data }) => {
        toast.success(data.message);
        setItems(prev => prev.filter(i => i._id !== item._id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDeleteLoading({loading:false , id:null});
      });
  };

  if (pageLoading) {
    return <div className="flex justify-center items-center h-[50vh]"><AppLoader/></div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <Search handleSearch={handleSearch} />
        <AddComponent 
          setItems={setItems} 
          requiredFieldsMissing={requiredFieldsMissing} 
          FormComponent={FormComponent} 
          initialState={initialState}
          type={type}
          extraImagesKey={extraImagesKey}
          />
      </div>
      {type !== 'events' && 
        <div className='w-[25%]'>
            <Sorting context={type} items={items} setData={setFilteredItems} />
        </div>
      }
      <div className="flex flex-wrap justify-center mt-10 min-h-[1114px]">
        {filteredItems.length === 0 && (
          <div className="flex justify-center items-center h-[50vh] text-gray-400 text-xl">
            {`No ${type} available please add ${type}`}
          </div>
        )}
        {setPagination(recordsPerPage, currentPage, filteredItems)?.map(item => (
        <div key={item._id}>
          <ItemCard
              item={item}
              isManage={true}
              setOpenModal={setOpenModal}
              handleDelete={handleDelete}
              setItemData={setItemData}
              setOriginalItemData={setOriginalItemData}
              deleteLoading={deleteLoading}
              type={type === 'events'? 'event' : type}
          />
        </div>
        ))}
      </div>
      <EditComponent
        setItems={setItems}
        openModal={openModal}
        setOpenModal={setOpenModal}
        itemData={itemData}
        setItemData={setItemData}
        type={type}
        originalItemData={originalItemData}
        isItemDataChanged={isItemDataChanged}
        FormComponent={FormComponent}
        requiredFieldsMissing={requiredFieldsMissing} 
        extraImagesKey={extraImagesKey}
      />
      <div className="flex justify-center items-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
          data={filteredItems}
        />
      </div>
    </div>
  );
}

export default GenericList;
