import React from 'react';
import { Link } from 'react-router-dom';


function Catalogue() {
  const [form, setForm] = React.useState({
    search: ''
  });
  const onSearch = () => {
    e.preventDefault();
    alert(`Searching for ${form.search}`);
  }
  const images = import.meta.glob('./images/catalog/*.{jpg,png,gif}', { eager: true });
  const catimgs = Object.values(images).map(img => img.default);
  console.log(catimgs);
  const names = ['Maximum card', 'Annual collection', 'Thematic collections', 'New issues', 'Philatic pack', 'Postage stamps']
  return (
    <div className='container mt-5 row'>
      <div className='col-md-9'>
        <h2 className='text-center'>Products catalogue</h2>
        <p className='text-center'>All current stamp issues and philatelic products are shown here by category.</p>
        <hr />
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {catimgs.map((img, index) => (
            <div className='text-center' key={img} style={{ width: '30%' }}>
              <img src={img} alt="" height={120} />
              <h5>{names.sort()[index]}</h5>
            </div>
          ))}
        </div>
      </div>
      <div className='col-md-3'>
        <div className='container'>
          <article className='d-flex'>
            <form onSubmit={onSearch}>
              <input type="text" className="form-control" value={form.search} onChange={(e) => setForm({ ...form, search: e.target.value })} placeholder='Search...' />
              <i className="bi bi-search" style={{ position: 'relative', left: '-23px' }}></i>
              <button className="btn btn-dark mt-2">Search</button>
            </form>
          </article>
          <hr />
          <article>
            <h5><Link to="/subscribe">Subscribe</Link></h5>
            <p>Receive your selected products automatically at the schedule you choose.</p>
          </article>
          <hr />
          <article>
            <h5>News</h5>
            <b><Link to="">Annual collection 2024</Link></b>
            <p>Discover the new annual collection for 2024, featuring exquisite stamps that celebrate our heritage and culture. Available now in our catalogue!</p>
          </article>
        </div>
      </div>
    </div>
  )
}

export default Catalogue