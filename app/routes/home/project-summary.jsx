import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { deviceModels } from '~/components/model/device-models';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useTheme } from '~/components/theme-provider';
import { Transition } from '~/components/transition';
import { Loader } from '~/components/loader';
import { useWindowSize } from '~/hooks';
import { Suspense, lazy, useState } from 'react';
import { cssProps, media } from '~/utils/style';
import { useHydrated } from '~/hooks/useHydrated';
import { DecoderText } from '~/components/decoder-text';
// import katakana from './katakana.svg';
import styles from './project-summary.module.css';

const Model = lazy(() =>
  import('~/components/model').then(module => ({ default: module.Model }))
);

/**
 * Renders the project summary component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier for the project summary.
 * @param {boolean} props.visible - Indicates whether the section is visible.
 * @param {React.Ref} props.sectionRef - The reference to the section element.
 * @param {number} props.index - The index of the project summary.
 * @param {string} props.title - The title of the project.
 * @param {string} props.description - The description of the project.
 * @param {Object} props.model - The model object containing information about the device model.
 * @param {string} props.buttonText - The text for the button.
 * @param {string} props.buttonLink - The link for the button.
 * @param {boolean} props.alternate - Indicates whether the project summary is in alternate mode.
 * @param {Object} props.rest - Additional props to be spread on the component.
 * @returns {JSX.Element} The rendered project summary component.
 */
export function ProjectSummary({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  alternate,
  roles,
  stack,
  ...rest
}) {
  // State variables
  const [focused, setFocused] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Custom hooks
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const isHydrated = useHydrated();

  // Constants
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;

  /**
   * Handles the model load event.
   */
  function handleModelLoad() {
    setModelLoaded(true);
  }

  /**
   * Renders the details section of the project summary.
   *
   * @param {boolean} visible - Indicates whether the section is visible.
   * @returns {JSX.Element} The rendered details section.
   */
  /**
   * Renders the details section of the project summary.
   *
   * @param {boolean} visible - Indicates whether the section is visible.
   * @returns {JSX.Element} The rendered details section.
   */
  function renderDetails(visible) {
    return (
      <div className={styles.details}>
        {/* Index */}
        <div aria-hidden className={styles.index}>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
          <span className={styles.indexNumber} data-visible={visible}>
            {indexText}
          </span>
        </div>
        {/* Title */}
        <Heading
          level={3}
          as="h2"
          className={styles.title}
          data-visible={visible}
          id={titleId}
        >
          {title}
        </Heading>
        {/* Description */}
        <Text className={styles.description} data-visible={visible} as="p">
          {description}
        </Text>

        {/* Roles */}
        <Text >
          {/* {"Roles: Technical Co-Founder, Full Stack Developer"} */}
          <p className={styles.jobRole} data-visible={visible}>
            Roles: {roles}
            </p>
        </Text>

        {/* Tools used */}
        <Text >
          {/* {"Roles: Technical Co-Founder, Full Stack Developer"} */}
          <p className={styles.jobRole} data-visible={visible}>
            Stack : {stack}
            </p>
        </Text>



        {/* Button */}
        <div className={styles.button} data-visible={visible}>
          <Button iconHoverShift href={buttonLink} iconEnd="arrow-right">
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  /**
   * Renders the preview section of the project summary.
   *
   * @param {boolean} visible - Indicates whether the section is visible.
   * @returns {JSX.Element} The rendered preview section.
   */
  function renderPreview(visible) {
    return (
      <div className={styles.preview}>
        {model.type === 'laptop' && (
          <>
            <div className={styles.model} data-device="laptop">
              {!modelLoaded && (
                <Loader center className={styles.loader} data-visible={visible} />
              )}
              {isHydrated && visible && (
                <Suspense>
                  <Model
                    alt={model.alt}
                    cameraPosition={{ x: 0, y: 0, z: 8 }}
                    showDelay={700}
                    onLoad={handleModelLoad}
                    show={visible}
                    models={[
                      {
                        ...deviceModels.laptop,
                        texture: {
                          ...model.textures[0],
                          sizes: laptopSizes,
                        },
                      },
                    ]}
                  />
                </Suspense>
              )}
            </div>
          </>
        )}
        {model.type === 'phone' && (
          <>
            <div className={styles.model} data-device="phone">
              {!modelLoaded && (
                <Loader center className={styles.loader} data-visible={visible} />
              )}
              {isHydrated && visible && (
                <Suspense>
                  <Model
                    alt={model.alt}
                    cameraPosition={{ x: 0, y: 0, z: 11.5 }}
                    showDelay={300}
                    onLoad={handleModelLoad}
                    show={visible}
                    models={[
                      {
                        ...deviceModels.phone,
                        position: { x: -0.6, y: 1.1, z: 0 },
                        texture: {
                          ...model.textures[0],
                          sizes: phoneSizes,
                        },
                      },
                      {
                        ...deviceModels.phone,
                        position: { x: 0.6, y: -0.5, z: 0.3 },
                        texture: {
                          ...model.textures[1],
                          sizes: phoneSizes,
                        },
                      },
                    ]}
                  />
                </Suspense>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {({ visible }) => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
