import React, { Component } from "react";
import Header from "./header";
import Footer from "./footerTemp";
import Galleryimg from "./popularVehc";
import Testimoni from "./testimoni";
import Jumbotron from "./jumbotron";

export default class home extends Component {
  render() {
    return (
      <main>
        <Header />
        <Jumbotron />
        <Galleryimg />
        <Testimoni />
        <Footer />
      </main>
    );
  }
}
