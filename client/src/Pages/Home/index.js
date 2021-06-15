import React from 'react'
import CardList from 'containers/CardList';
import PageHead from 'containers/PageHead';
import Student from 'containers/Student';
import SignUp from 'Pages/SignUp';
import SignIn from 'Pages/SignIn';
import ZeroStateScreen from 'containers/ZeroStateScreen';
import Footer from 'containers/Footer';

const Home = () => {
  return (
    <>
      <PageHead />
      {/* <Student /> */}
      <ZeroStateScreen />
        {/* <SignIn /> */}
      
        {/* <CardList /> */}
      <Footer />
    </>
  )
}

export default Home
