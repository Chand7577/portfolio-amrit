export interface ShotConfig {
  id: number;
  title: string;
  subtitle: string;
  imageWebp: string;
  imagePng: string;
  alt: string;
  focalPoint: {
    x: string; // e.g. "50%"
    y: string; // e.g. "35%"
  };
  zoom: number; // Max zoom factor during the act (e.g. 1.25 - 1.45)
  panX: number; // Horizontal camera shift in percentage or vw
  panY: number; // Vertical camera shift in percentage or vh
  subjectSide: 'left' | 'right' | 'center';
  contentSide: 'left' | 'right';
  scrimSide: 'left' | 'right';
  scrimStrength: number; // 0.0 - 1.0
  objectPositionDesktop: string;
  objectPositionMobile: string;
}

export const CINEMATIC_SHOTS: ShotConfig[] = [
  {
    id: 1,
    title: 'THE INTRODUCTION',
    subtitle: 'One Developer. One Workspace. One Continuous Story.',
    imageWebp: '/cinematic/hero-portrait.webp',
    imagePng: '/cinematic/hero-portrait.png',
    alt: 'Amrit Chand Cinematic Hooded Portrait in Blue and Orange',
    focalPoint: { x: '50%', y: '50%' },
    zoom: 1.12,
    panX: -12, // Subject shifts smoothly to left as content flows in on right
    panY: 0,
    subjectSide: 'left',
    contentSide: 'right',
    scrimSide: 'right',
    scrimStrength: 0.85,
    objectPositionDesktop: 'center center',
    objectPositionMobile: 'center 40%',
  },
  {
    id: 2,
    title: 'THE ENVIRONMENT',
    subtitle: 'Every great idea starts somewhere.',
    imageWebp: '/cinematic/img-2.webp',
    imagePng: '/cinematic/img-2.png',
    alt: 'Amrit Chand Workspace - Camera Push-In',
    focalPoint: { x: '60%', y: '30%' },
    zoom: 1.22,
    panX: 5, // Subject on RIGHT, content on LEFT
    panY: 0,
    subjectSide: 'right',
    contentSide: 'left',
    scrimSide: 'left',
    scrimStrength: 0.95,
    objectPositionDesktop: '60% center',
    objectPositionMobile: '65% 30%',
  },
  {
    id: 3,
    title: 'THE DISCIPLINE',
    subtitle: 'Think. Design. Develop. Repeat.',
    imageWebp: '/cinematic/img-3.webp',
    imagePng: '/cinematic/img-3.png',
    alt: 'Amrit Chand - Side Angle Coding Focus',
    focalPoint: { x: '35%', y: '50%' },
    zoom: 1.25,
    panX: -5, // Laptop and hands on LEFT, content on RIGHT
    panY: 0,
    subjectSide: 'left',
    contentSide: 'right',
    scrimSide: 'right',
    scrimStrength: 0.95,
    objectPositionDesktop: '35% center',
    objectPositionMobile: '40% 35%',
  },
  {
    id: 4,
    title: 'THE ARCHITECTURE',
    subtitle: 'Turning ideas into robust, scalable systems.',
    imageWebp: '/cinematic/img-4.webp',
    imagePng: '/cinematic/img-4.png',
    alt: 'Amrit Chand - Close-Up Coding and Keyboard',
    focalPoint: { x: '70%', y: '40%' },
    zoom: 1.25,
    panX: 5, // Subject on RIGHT, tech stack on LEFT
    panY: 2, // Focused below top monitor to avoid baked-in text collisions
    subjectSide: 'right',
    contentSide: 'left',
    scrimSide: 'left',
    scrimStrength: 0.95,
    objectPositionDesktop: '65% 45%',
    objectPositionMobile: '70% 35%',
  },
  {
    id: 5,
    title: 'THE CREATIONS',
    subtitle: 'Things I have engineered and shipped.',
    imageWebp: '/cinematic/img-5.webp',
    imagePng: '/cinematic/img-5.png',
    alt: 'Amrit Chand - Projects Showcase in Workspace',
    focalPoint: { x: '30%', y: '40%' },
    zoom: 1.18,
    panX: -6, // Monitor on LEFT, project cards on RIGHT
    panY: 0,
    subjectSide: 'left',
    contentSide: 'right',
    scrimSide: 'right',
    scrimStrength: 0.95,
    objectPositionDesktop: '30% center',
    objectPositionMobile: '35% 30%',
  },
];
