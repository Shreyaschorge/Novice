import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CardList from 'containers/CardList';
import PageHead from 'containers/PageHead';
import ZeroStateScreen from 'containers/ZeroStateScreen';
import ZeroStateSearchResult from 'containers/ZeroStateScreen/showStudentZeroState';
import StudentSearchResult from 'containers/StudentSearchResult';
import AddStudentModal from 'containers/AddStudentModal';

import { getStudents } from 'actions/student';
import Loading from 'containers/Loading';


const Home = () => {

  const { students, searchResult } = useSelector(state => state.students);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
  },[dispatch])

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const loadStudents = () => {
    if(searchResult){
      if(searchResult.length === 0){
        return <ZeroStateSearchResult />
      } else {
        return <StudentSearchResult students={searchResult}/>
      }
    }
    else if(!students){
      return <Loading />
    }else if(students){
      if(students.length === 0) {
        return <ZeroStateScreen showModal={showModal}/>
      } else { return <CardList students={students} />
    } }
  }
  return (
    <>
      <PageHead showModal={showModal}/>
      {loadStudents()}
      <AddStudentModal
        destroyOnClose={true}
        title="Add Student"
        visible={visible}
        onCancel={handleCancel}
        setVisible={setVisible}
        footer={null}
      />
      
    </>
  )
}

export default Home
