import { useState } from 'react'
import { image } from '../../assets/images'
import { FallbackImg } from '../../components/ui/FallbackImg'
import { useContent } from '../../i18n/useLanguage'

const PANEL_IDS = ['panel-direction', 'panel-experts']

export function Equipe() {
  const { team } = useContent().home
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="section section--flush-top" id="equipe" aria-labelledby="team-label">
      <div className="container">
        <h2 className="section-label" id="team-label">
          {team.title}
        </h2>
        <div className="team">
          <div className="team__intro">
            <h3>{team.introTitle}</h3>
            <p>{team.introText}</p>
          </div>

          {team.tabs.map((tab, i) => (
            <div key={tab.label} className="team-panel" id={PANEL_IDS[i]} role="tabpanel" hidden={i !== activeTab}>
              {tab.members.map((member) => (
                <article key={member.photo} className="member" tabIndex={0}>
                  <div className="member__photo">
                    <FallbackImg src={image(member.photo)} alt={member.alt} loading="lazy" />
                    <div className="member__expertise">
                      <h4>{team.expertiseLabel}</h4>
                      <ul>
                        {member.expertise.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <h4 className="member__name">{member.name}</h4>
                  <p className="member__role">{member.role}</p>
                </article>
              ))}
            </div>
          ))}

          <div className="team-tabs" role="tablist" aria-label="Équipe">
            {team.tabs.map((tab, i) => (
              <button
                key={tab.label}
                className="team-tab"
                role="tab"
                aria-selected={i === activeTab}
                aria-controls={PANEL_IDS[i]}
                onClick={() => setActiveTab(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="presence">
          <div className="presence__map">
            <img src={image(team.presence.map)} alt={team.presence.mapAlt} width={378} height={421} loading="lazy" />
          </div>
          <div>
            <h3>{team.presence.title}</h3>
            <p>{team.presence.text}</p>
            <p className="presence__places">
              {team.presence.places.map((place, i) => (
                <span key={place}>
                  {i > 0 && <br />}
                  {place}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
