import urbanFloraHome from "~/assets/urbanflora_home_page.jpg"
import urbanFloraScan from "~/assets/urbanflora_scanning_page.jpg"
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import nferenceLaptop from '~/assets/nference_laptop.webp';
import digitalPathology from '~/assets/digital_pathology.jpg';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Technologist',
    description: `Portfolio of ${config.name} — a technologist working on web & mobile apps`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      <ProjectSummary
        id="project-1"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={1}
        title="Urban Flora : Garden Companion App"
        description="Garden management app for plant lovers to suggest plants and track their growth"
        buttonText="View Website"
        buttonLink="https://www.urbanflora.co.in"
        roles= "Technical Co-Founder and Full Stack Engineer"
        stack= "Flutter and Supabase"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${urbanFloraScan} 375w, ${urbanFloraScan} 750w`,
              placeholder: urbanFloraScan,
            },
            {
              srcSet: `${urbanFloraHome} 375w, ${urbanFloraHome} 750w`,
              placeholder: urbanFloraHome,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={2}
        title="nSights by nference"
        description="Integrating Human and AI Intelligence for Scalable Breakthroughs in Drugs and Diagnostics
"
        buttonText="View Website"
        buttonLink="https://nference.com/"
        roles= "Software Engineer and Product Manager"
        stack= "Python, Golang, React ,MongoDB, ElasticSearch, Docker, Kubernetes, RabbitMq and many more..... "
        model={{
          type: 'laptop',
          alt: 'Smart Sparrow lesson builder',
          textures: [
            {
              srcSet: `${nferenceLaptop} 1280w, ${nferenceLaptop} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Pramana : Digital Pathology Platform"
        description="Pramana is transforming pathology at medical centers and pathology labs."
        buttonText="View website"
        buttonLink="https://pramana.ai/"
        roles= "Application Engineer, Buisness and Marketting"
        stack= "Python and C++"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: `${digitalPathology} 800w, ${digitalPathology} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
