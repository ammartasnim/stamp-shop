import React from "react";
import slide1 from "./images/slide1.png";

function Home() {
  return (
    <main>
      
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      
      {/* Indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
      </div>

      {/* Carousel Items */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={slide1} className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src={slide1} className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={slide1} className="d-block w-100" alt="Slide 3" />
        </div>
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>

    </div>

    <div className="container my-5">
  <div className="row text-center g-4">
    
    <div className="col-md-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">To Manufacture Your Stamps</h5>
          <p className="card-text">Learn how to produce your own stamps efficiently and with quality assurance.</p>
        </div>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">The New Issue</h5>
          <p className="card-text">Stay updated on the latest stamp issues and get all the details on new releases.</p>
        </div>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Annual Collection 2024</h5>
          <p className="card-text">Discover the official 2024 stamp program and plan your collection accordingly.</p>
        </div>
      </div>
    </div>

  </div>
</div>


    </main>
  );
}

export default Home;
