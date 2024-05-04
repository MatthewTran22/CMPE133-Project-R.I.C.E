import React from 'react';
import '../homepage.css';
import matt from '../template/images/matt.jpg';
import daniel from '../template/images/daniel.jpg';
import martin from '../template/images/martin.jpg';
import jason from '../template/images/jason.jpg';
import { RxFontFamily } from 'react-icons/rx';

function LandscapeCard() {
  return (
    <div className="container">
      <div className="card__container">
        <article className="card__article">
          <img src={matt} alt="image" className="card__img" />
          <div className="card__data">
            <span style={{ fontFamily: 'Russo One'}} className="card__title">Matthew Tran</span>
            <h2 style={{ fontFamily: 'Gruppo', fontWeight: 'bold' }} className="card__description">Fun fact: Clear 30 plates at kbbq</h2>
          </div>
        </article>

        <article className="card__article">
          <img src={daniel} alt="image" className="card__img" />
          <div className="card__data">
            <span style={{ fontFamily: 'Russo One'}} className="card__title">Daniel Lee</span>
            <h2 style={{ fontFamily: 'Gruppo', fontWeight: 'bold'}} className="card__description">Fun fact: Bench 2 plates</h2>
          </div>
        </article>

        <article className="card__article">
          <img src={jason} alt="image" className="card__img" />
          <div className="card__data">
            <span style={{ fontFamily: 'Russo One'}} className="card__title">Jason Huynh</span>
            <h2 style={{ fontFamily: 'Gruppo', fontWeight: 'bold'}} className="card__description">Fun fact: Like to cook in free time</h2>
          </div>
        </article>

        <article className="card__article">
          <img src={martin} alt="image" className="card__img" />
          <div className="card__data">
            <span style={{ fontFamily: 'Russo One'}} className="card__title">Martin Tran</span>
            <h2 style={{ fontFamily: 'Gruppo', fontWeight: 'bold'}} className="card__description">Fun fact: Can do cartwheel</h2>
          </div>
        </article>
      </div>
    </div>
  );
}

export default LandscapeCard;
