import Categories from '../../Components/Categories/Categories'
import Jobs from '../../Components/Jobs/Jobs'
import Data from '../../Components/Jobs/Data'; 

export default function index() {
  return (
    <div>
        <h1>Freelancer</h1>
        <Categories/>
        <Jobs jobs={Data}/>
    </div>
  )
}
