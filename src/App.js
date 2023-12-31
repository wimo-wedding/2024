import {
  HashRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import rings from './rings.png';
import './App.css';
import guestlist from "./guestlist";
import t from "./translation.json"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/invitation/:name">
          <InvitePage />
        </Route>
        <Route path="/invitation/">
          <GuestNotFoundPage />
        </Route>
        <Route path="/">
          <InvitePage />
        </Route>
      </Switch>
    </Router>
  )
}

function GuestNotFoundPage() {
  return <div>
    <div className="background-lg-screens">
      <div className="App">
        <div class="shadow">
          <div class="intro">
            <div class="imgWrapperNotFound"></div>
            <div class="banner">
              <p class="title shadow">ooopsie...</p>
              <p class="subtitle shadow">guest not found</p>
            </div>
          </div>
          <div class="notFoundWrapper">
            <div class="notFound"></div>
          </div>
        </div>

        <div class="outro"></div>
      </div>
    </div>
  </div>
}

function InvitePage() {
  const { params } = useRouteMatch();

  let contentInvitation = null
  let locale = 'en'

  if (params.name) {
    const guest = guestlist.find(item => item.name.toLocaleLowerCase() === params.name)
    if (guest) {
      locale = guest.locale
      contentInvitation = InvitationContent(guest)
    } else {
      return <GuestNotFoundPage />
    }
  }

  return (
    <div>
      <div className="background-lg-screens">
        <div className="App">
          <div class="shadow">
            <div class="intro">
              <div class="img-wrapper"></div>
              <div class="banner">
                <p class="title shadow">{t[locale].title}</p>
                <p class="subtitle shadow">{t[locale].subtitle}</p>
              </div>
            </div>
            <div class="quote">
              <p>{t[locale].quote}</p>
              <p class="author">- {t[locale].quoteAuthor} -</p>
            </div>
          </div>
          {contentInvitation}
          <div class="outro"></div>
        </div>
      </div>
    </div>
  );
}



function InvitationContent(guest) {
  const { name, locale, gender, members } = guest
  return <>
    <div class="invitation-outer">
      <div class="invitation-inner"></div>
      <div class="invitation">
        <span>
          {t[locale].invitation}
        </span>
      </div>
    </div>
    <div class="invitation-wrapper">
      <div class="date-wrapper shadow">
        <div class="date">
          <span class="weekdate">{t[locale].weddingDay}</span>
          <span class="month">{t[locale].weddingMonth}</span>
          <span class="year">{t[locale].weddingYear}</span>
        </div>
        <div class="ring-element">
          <img src={rings} width="100px" alt="logo" />
        </div>
      </div>
      <div class="guest-name">
        {members
          ? members.map(member =>
              <Salutation name={member.name} gender={member.gender} locale={locale} />
            )
          : <Salutation name={name} gender={gender} locale={locale} />
        }
      </div>
      <div class="description">
        <p dangerouslySetInnerHTML={{ __html: pluralize(t[locale].paragraphOne, 'Dich', 'Euch', members) }} />
        <p>{pluralize(t[locale].paragraphTwo, 'Dir', 'Euch', members)}</p>

        <div class="footer-wrapper">
          <div class="footer">
            <div class="rsvp shadow"><a href={t[locale].rsvpLink}>{t[locale].rsvp}</a></div>
            <div class="from">
              {t[locale].title}
            </div>
            <div class="wimo shadow">
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

const Salutation = ({name, gender, locale}) =>
  <div className="salutation">
    <span class="greeting">
      {gender === 'female' ? t[locale].greetingFemale : t[locale].greetingMale}
    </span>
    <div class="caligraphy">{name},</div>
  </div>

const pluralize = (text, singular, plural, usePluralize) =>
  text.replace('XXX', usePluralize ? plural : singular)

export default App;
