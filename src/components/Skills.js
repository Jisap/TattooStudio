import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';          // Detecta cuando un elemento está siendo visto o no en el viewport
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const Skills = () => {

  const { ref, inView } = useInView({ // ref: referencia a un elemento del dom, inview: valor booleano que indica si esta o no en el viewport
    threshold: 0.2,                   //  porcentaje de la intersección entre el viewport y el elemento que se considera "dentro" del viewport.
  });

  const [fullBody, setFullBody] = useState(0); // Representa el % de llenado del circular-progress-bar
  const [piercing, setPiercing] = useState(0);
  const [fullColor, setFullColor] = useState(0);
  const [temporary, setTemporary] = useState(0);

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        if (fullBody < 90) {            // State se actualiza a medida que el componente Skills está en el viewport hasta llegar al valor que se define máximo para fullbody
          setFullBody(fullBody + 1);
        }
        if (piercing < 80) {
          setPiercing(piercing + 1);
        }
        if (fullColor < 75) {
          setFullColor(fullColor + 1);
        }
        if (temporary < 95) {
          setTemporary(temporary + 1);
        }
      }, 50);
    } else {
      setFullBody(0);
      setPiercing(0);
      setFullColor(0);
      setTemporary(0);
    }
  }, [inView, fullBody, piercing, fullBody, temporary]);

  const styles = { // Estilos de Circular Progress Bar
    path: {
      stroke: '#111111',
    },
    trail: {
      stroke: '#EEEEEE',
    },
    text: {
      fill: '#111111',
      fontSize: '24px',
    },
  };

  return (
    <motion.section
      variants={fadeIn('up')}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.1 }}
      ref={ ref }
      className="section font-primary"
    >
      <div className="container mx-auto">
        <div className='flex flex-col xl:flex-row justify-between items-center gap-y-12'>
          {/* circular item */}
          <div className='w-[150px] lg:w-[275px] flex flex-col justify-center items-center gap-y-6'>
            <CircularProgressbar 
              strokeWidth={1}
              styles={styles}
              value={fullBody}
              text={`${fullBody}%`}
            />
            {/* text */}
            <div className='uppercase font-light tracking-[1.2px] text-center'>
              Full Body Tattoo
            </div>
          </div>
          <div className='w-[150px] lg:w-[275px] flex flex-col justify-center items-center gap-y-6'>
              <CircularProgressbar
                styles={styles}
                strokeWidth={1}
                value={piercing}
                text={`${piercing}%`}
              />
              <div className='uppercase font-light tracking-[1.2px] text-center'>
                Safely Piercing
              </div>
          </div>
          <div className='w-[150px] lg:w-[275px] flex flex-col justify-center items-center gap-y-6'>
            <CircularProgressbar
              styles={styles}
              strokeWidth={1}
              value={fullColor}
              text={`${fullColor}%`}
            />
            <div className='uppercase font-light tracking-[1.2px] text-center'>
              Full Colour Tatoo
            </div>
          </div>
          <div className='w-[150px] lg:w-[275px] flex flex-col justify-center items-center gap-y-6'>
            <CircularProgressbar
              styles={styles}
              strokeWidth={1}
              value={temporary}
              text={`${temporary}%`}
            />
            <div className='uppercase font-light tracking-[1.2px] text-center'>
              Temporary Tatoo
            </div>
          </div>
        </div>
      </div>
    </motion.section>)
}


export default Skills;
