import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

export default function Dropdown() {
  return (
    <Fragment>
      <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{color: "#ffffff"}} className='cursor-pointer me-1 text-[42px] z-50' />
      <div>
      <details className="mb-32 flex justify-end">
        <summary className="m-1"><FontAwesomeIcon icon={faCircleUser} size="2xl" style={{color: "#ffffff"}} className='cursor-pointer me-1 text-[42px] z-50' /></summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </details>
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">Click</label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
    </Fragment>
  );
}
