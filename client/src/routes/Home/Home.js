import React from 'react';
import './home.css'

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
        <header className='header'>
            <div className='header__shadow'></div>
            <div className='header__text'>
              <h1 className='header__title'>Social Speed Cubing</h1>
              <a className='header__text-btn' href="#study">Poznaj nas</a>
            </div>
        </header>
        <main>
            <section id="study" className='section'>
              <h2 className='section__title'>Nauka</h2>
              <p className='section__text'>Chcesz nauczyć się układać kostkę Rubika lub inną łamigłówkę logiczną?</p>
              <p className='section__text'>W naszej aplikacji możesz w łatwy sposób nauczyć się rozwiązywać popularne łamigłówki logiczne, a jeśli jesteś abmitny/tna możesz podjąć wyzwanie i spróbować utworzyć własny poradnik!</p>
              <a className='section__link' href={user !== null ? `/profile/${user.result.username}` : "/login"}>Rozpocznij naukę</a>
            </section>
            <section id="training" className='section section-even'>
              <h2 className='section__title'>Trening</h2>
              <p className='section__text'>Nasza aplikacja posiada czasomierz, dzięki któremu osoby, które potrafią rozwiązywać łąmigłówki logiczne, będą mogły przetestować swoje umiejętności.</p>
              <p className='section__text'>Czasomierz posiada dodatkowo opcję zapisywania sesji z czasami, aby można było kontrolować swoję postępy w nauce i śledzić swoje wyniki.</p>
              <a className='section__link' href={user !== null ? "/timer" : "/login"}>Sprawdź czasomierz</a>
            </section>
            <section id="contest" className='section'>
              <h2 className='section__title'>Zawody</h2>
              <p className='section__text'>Organizujemy także zawody w układaniu łamigłówek logicznych na czas dla osób, które chcą porywalizować z innymi, a także sprawdzić swoje siły na tle innych.</p>
              <p className='section__text'>Jeśli obawiasz się że nie poradzisz sobie w zawodach lub myślisz że układasz w zbyt długim czasie, to tym bardziej zapisz się na zawody. W zawodach może wziąć udział każda osoba, która tylko potrafi rozwiązać łamigłówkę logiczną, nieważne w jakim czasie :)</p>
              <a className='section__link' href="/contests">Zapisz się na zawody</a>
            </section>
            <section id="profile" className='section section-even'>
              <h2 className='section__title'>Profil</h2>
              <p className='section__text'>W aplikacji można także dodawać swoje posty, aby pochwalić swoją wiedzą z innymi użytkownikami.</p>
              <p className='section__text'>Na profilu użytkownika można też znaleźć wszystkie dodane poradniki użytkownika, aby łatwiej znaleźć dany poradnik.</p>
              <a className='section__link' href={user !== null ? `/profile/${user.result.username}` : "/login"}>Przejdź na profil</a>
            </section>
        </main>
        <footer className='footer'>
          <p>&copy; {new Date().getFullYear()} Social Speed Cubing</p>
        </footer>
    </>
  )
}

export default Home