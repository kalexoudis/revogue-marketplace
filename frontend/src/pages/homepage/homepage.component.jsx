import Home from "../../components/home/home.component";
import ActionBar from "../../components/action-bar/ActionBar";

const Homepage = () => {
    return (
        <div>
            {localStorage.getItem("name") ?
                ( <ActionBar searchBar={true} goToRecommendation={true} />)
                : (<ActionBar searchBar={true} goToRecommendation={false} />)}
            <Home/>
        </div>
    )
}


export default Homepage;
