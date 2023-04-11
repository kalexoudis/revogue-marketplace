import WishlistComponent from "../../components/wishlist/wishlistComponent";
import ActionBar from "../../components/action-bar/ActionBar";

const WishlistPage = () => {
    return (
        <>
            <ActionBar searchBar={false} goToRecommendation={true} />
            <WishlistComponent />
        </>
    )
}

export default WishlistPage