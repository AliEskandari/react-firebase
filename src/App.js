import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import ProtectedRoute from "./helpers/protected-route";
// Components
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ScrollToTop from "./components/scroll-to-top";
import Modal from "./components/modal";
import Alert from "./components/alert";

// Pages
import About from "./pages/about";
import Banking from "./pages/banking";
import Channel from "./pages/channel";
import Contact from "./pages/contact";
import EditVideo from "./pages/edit-video";
import Payments from "./pages/payments";
import Privacy from "./pages/privacy";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Settings from "./pages/settings";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Terms from "./pages/terms";
import Upload from "./pages/upload";
import Video from "./pages/video";

// Firebase + User
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

// Modal + Alert
import ModalContext from "./context/modal";
import AlertContext from "./context/alert";

const Home = lazy(() => import("./pages/home"));

function App() {
  const { user } = useAuthListener();

  const [show, setShow] = useState(false);
  const [text, setText] = useState(null);
  const [handleClose, setHandleClose] = useState();
  const [handleProceed, setHandleProceed] = useState();
  const showModal = ({
    text,
    handleClose = () => setShow(false),
    handleProceed = () => setShow(false),
  } = {}) => {
    setText(text);
    setShow(true);
    setHandleClose(() => handleClose);
    setHandleProceed(() => {
      const handleProceedAndHideModal = async () => {
        await handleProceed();
        setShow(false);
      };
      return handleProceedAndHideModal;
    });
  };

  const [alertShow, setAlertShow] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertDismissible, setAlertDismissible] = useState(false);
  const setAlert = ({ text = "", dismissible = false, link = "" } = {}) => {
    setAlertText(text);
    setAlertDismissible(dismissible);
    setAlertShow(true);
  };
  const closeAlert = () => {
    setAlertShow(false);
  };

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <ScrollToTop />
        <Modal
          show={show}
          handleClose={handleClose}
          handleProceed={handleProceed}
          text={text}
        />
        <Alert
          show={alertShow}
          text={alertText}
          dismissible={alertDismissible}
          onClose={closeAlert}
        />
        <ModalContext.Provider value={{ showModal }}>
          <AlertContext.Provider value={{ setAlert }}>
            <Suspense fallback={<p>Loading...</p>}>
              <Switch>
                <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
                <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                <Route path={ROUTES.HOME}>
                  <Navbar />
                  <div className="main-content">
                    <Switch>
                      <Route exact path={ROUTES.HOME} component={Home} />
                      <Route exact path={ROUTES.VIDEO} component={Video} />
                      <Route exact path={ROUTES.CHANNEL} component={Channel} />
                      <Route exact path={ROUTES.ABOUT} component={About} />
                      <Route exact path={ROUTES.TERMS} component={Terms} />
                      <Route exact path={ROUTES.CONTACT} component={Contact} />
                      <Route exact path={ROUTES.PRIVACY} component={Privacy} />
                      <Route exact path={ROUTES.SEARCH} component={Search} />
                      <ProtectedRoute user={user} exact path={ROUTES.UPLOAD}>
                        <Upload />
                      </ProtectedRoute>
                      <ProtectedRoute user={user} exact path={ROUTES.PROFILE}>
                        <Profile />
                      </ProtectedRoute>
                      <ProtectedRoute user={user} exact path={ROUTES.SETTINGS}>
                        <Settings />
                      </ProtectedRoute>
                      <ProtectedRoute user={user} exact path={ROUTES.PAYMENTS}>
                        <Payments />
                      </ProtectedRoute>
                      <ProtectedRoute user={user} exact path={ROUTES.BANKING}>
                        <Banking />
                      </ProtectedRoute>
                      <ProtectedRoute
                        user={user}
                        exact
                        path={ROUTES.EDIT_VIDEO}
                      >
                        <EditVideo />
                      </ProtectedRoute>
                    </Switch>
                  </div>
                  <Footer />
                </Route>
              </Switch>
            </Suspense>
          </AlertContext.Provider>
        </ModalContext.Provider>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
