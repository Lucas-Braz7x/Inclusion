import React, { useEffect, useState } from 'react';
import { TeamCard } from '../../Components/TeamCard';
import './styles.scss';
import img1 from '../../assets/team/team-2.jpg';
import img2 from '../../assets/team/team-1.jpg';
import img3 from '../../assets/team/team-3.jpg';
import img4 from '../../assets/team/team-4.jpg';


export const Time = () => {

  const [teamInformation, setTeamInformation] = useState([]);
  const images = [img1, img2, img3, img4];

  useEffect(() => {
    fetch('./team.json', {
      headers: {
        Accept: "application/json"
      }
    }).then(response => response.json())
      .then(response => setTeamInformation(response));
  }, []);




  return (
    <main>
      <div className="container">
        <div className="section-title">
          <h2>Time INCLUSION</h2>
          <p>Conheça a nossa Equipe</p>
        </div>


        <div className="row">
          {teamInformation.map((collaborator, index) => (
            <TeamCard key={index} collaborator={collaborator} image={images[index]} />
          ))}
        </div>
      </div>
    </main>
  )
}
