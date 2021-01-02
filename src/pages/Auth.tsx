import React from 'react'
import SignInForm from '../components/SignInForm'
import Particles from "react-tsparticles";
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../store/ducks/user/selectors';

import { useHistory } from 'react-router-dom';


export const Auth = () => {
    const history = useHistory();
    const isAuth = useSelector(selectIsAuth);
   React.useEffect( () => {
      if (isAuth) {
        history.push('/home/users');
      }
      else {
        history.push('/');
      }
   }, [isAuth])

    return (
        <>
        <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#1C1C24",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 800,
                duration: 1,
                opacity: 0.8,
                size: 10,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#3f51b5",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 3,
            },
          },
          detectRetina: true,
        }}
      />
    
       <SignInForm  />

       </>
    )
}
