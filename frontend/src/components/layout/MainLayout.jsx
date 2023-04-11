import styled from "styled-components"
import Header from "../header/header.component";
import Footer from "../footer/footer.component";

const MainLayout = ({children}) => {
    return (
        <LayoutWrapper>
            <Header />
            <main className="main">
                {children}
            </main>
            <Footer />
        </LayoutWrapper>
    )
}

export default MainLayout

const LayoutWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  
  .main{
    flex-grow: 1;
  }
  
  .primary-btn{
    color: white;
    background-color: black;
  }
  
  .primary-btn-small{
    color: white;
    background-color: black;
     max-height: 22px;
     max-width: 130px;
  }
`