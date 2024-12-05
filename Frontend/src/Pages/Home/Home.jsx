
import Categories from '../../Components/Categories/Categories'
import Data from '../../Components/Jobs/Data'; 
import Jobs from '../../Components/Jobs/Jobs'

function Home() {
  console.log(Data);
  return (
    <>
      <Categories/>
      <Jobs jobs={Data}/>
    </>
  );
}

export default Home
