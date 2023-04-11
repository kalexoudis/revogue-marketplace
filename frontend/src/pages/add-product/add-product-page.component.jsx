import AddClothingForm from "../../components/add-clothing-form/add-clothing-form.component";


const AddProductPage = ({type_of_clothes}) => {
    return (
        <div>
            <AddClothingForm type_of_clothes={type_of_clothes}/>
        </div>
    );
}

export default AddProductPage;
