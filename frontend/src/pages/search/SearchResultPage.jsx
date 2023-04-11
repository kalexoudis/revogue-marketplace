import SearchedItemsComponent from "../../components/search/SearchedItemsComponent";
import ActionBar from "../../components/action-bar/ActionBar";

const searchResultPage = () => {
    return (
        <>
            <ActionBar goToRecommendation={true} searchBar={true} />
            <SearchedItemsComponent />
        </>
    )
}

export default searchResultPage