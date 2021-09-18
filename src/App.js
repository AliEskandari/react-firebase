import { lazy, Suspense } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar";
import Video from "./pages/video";
import Channel from "./pages/channel";

const Home = lazy(() => import("./pages/home"));

function App() {
  return (
    <Container className="App">
      <Router>
        <Navbar />
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/watch/:id" component={Video} />
            <Route exact path="/channel/:id" component={Channel} />
          </Switch>
        </Suspense>
      </Router>
    </Container>
  );
}

export default App;
