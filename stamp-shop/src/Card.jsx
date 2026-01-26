import { Link } from 'react-router-dom';

function Card({ img, name }) {
  return (
    <div className="flex flex-col items-center p-3 border border-slate-200 rounded bg-white shadow-sm transition-colors hover:border-blue-300">
      <div className="h-28 flex items-center justify-center mb-3">
        <img src={img} alt={name} className="max-h-full object-contain" />
      </div>
      <h5 className="text-slate-700 font-semibold text-sm text-center leading-tight">
        <Link 
          to={`/category/${name.toLowerCase().replace(/\s/g, '-')}`} 
          className="no-underline text-inherit hover:text-blue-600 transition-colors"
        >
          {name}
        </Link>
      </h5>
    </div>
  );
}

export default Card;