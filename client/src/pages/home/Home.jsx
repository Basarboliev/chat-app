import Cover from "../../components/Cover/Cover";
import LoginSection from "../../components/LoginSection/LoginSection";
import Statistics from "../../components/Statistics/Statistics";
import Footer from "../../components/Footer/Footer";
import ContactParallax from "../../components/ContactParallax/ContactParallax";
import Contact from "../../components/ContactSection/Contact";

const Home = ({socket}) => {

    return (
        <>
            <Cover />
            <LoginSection socket={socket}/>
            <Statistics />
            <ContactParallax label='CONTACT US'/>
            <Contact />
            <Footer/>
        </>      
    );
}

export default Home;