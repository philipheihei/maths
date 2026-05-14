import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const IconTarget = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 mr-2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconRefresh = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const IconBulb = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-600 cursor-pointer">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-red-500 cursor-pointer">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const TASK_GROUPS = [
  {
    groupName: '角錐 (Pyramid)',
    tasks: [
      {
        id: 'pyramid-line',
        name: '線與平面夾角 (線與面)',
        taskText: <>任務：找出 <span className="italic">VA</span> 與平面 <span className="italic">ABCD</span> 之間的夾角。</>,
        points: {
          A: { coords: [-2, -1, 2], initVisible: true },
          B: { coords: [2, -1, 2], initVisible: true },
          C: { coords: [2, -1, -2], initVisible: true },
          D: { coords: [-2, -1, -2], initVisible: true },
          V: { coords: [0, 3, 0], initVisible: true },
          O: { coords: [0, -1, 0], initVisible: true },
        },
        edges: [
          ['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'],
          ['V', 'A'], ['V', 'B'], ['V', 'C'], ['V', 'D'],
        ],
        baseVertices: ['A', 'B', 'C', 'D'],
        dashedLines: [['V', 'O']],
        targetSequence: ['V', 'A', 'O'],
        rightAngles: [['V', 'O', 'A']],
        expectedAngle: 54.7,
        solutionSteps: [
          <>1. 點擊按鈕開始解析</>,
          <>2. 找出構成角度的斜邊：<span className="italic">VA</span></>,
          <>3. 找出頂點 <span className="italic">V</span> 在平面 <span className="italic">ABCD</span> 的投影點：點 <span className="italic">O</span></>,
          <>4. 連接 <span className="italic">AO</span>，<span className="italic">AO</span> 即為 <span className="italic">VA</span> 在平面的投影</>,
          <>5. 因此，與平面的夾角為 ∠<span className="italic">VAO</span></>,
        ],
      },
      {
        id: 'pyramid-plane',
        name: '平面與平面夾角 (面與面)',
        taskText: <>任務：找出平面 <span className="italic">VBC</span> 與平面 <span className="italic">ABCD</span> 之間的夾角。</>,
        points: {
          A: { coords: [-2, -1, 2], initVisible: true },
          B: { coords: [2, -1, 2], initVisible: true },
          C: { coords: [2, -1, -2], initVisible: true },
          D: { coords: [-2, -1, -2], initVisible: true },
          V: { coords: [0, 3, 0], initVisible: true },
          O: { coords: [0, -1, 0], initVisible: true },
          M: { coords: [2, -1, 0], initVisible: false },
        },
        edges: [
          ['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'],
          ['V', 'A'], ['V', 'B'], ['V', 'C'], ['V', 'D'],
        ],
        baseVertices: ['A', 'B', 'C', 'D'],
        dashedLines: [['V', 'O']],
        extraPlanes: [{ vertices: ['V', 'B', 'C'], color: 0xfde047 }],
        targetSequence: ['V', 'M', 'O'],
        rightAngles: [['V', 'M', 'C'], ['O', 'M', 'C']],
        expectedAngle: 63.4,
        auxText: <>加入輔助點 <span className="italic">M</span> (<span className="italic">BC</span> 中點)</>,
        solutionSteps: [
          <>1. 點擊按鈕開始解析</>,
          <>2. 找出兩平面的交線：<span className="italic">BC</span></>,
          <>3. 分別在兩平面上找出垂直於交線的線：<span className="italic">VM</span> 與 <span className="italic">OM</span></>,
          <>4. 這兩條垂直線的夾角即為兩平面的夾角</>,
          <>5. 因此，夾角為 ∠<span className="italic">VMO</span></>,
        ],
      },
    ],
  },
  {
    groupName: '正方體 (Cube)',
    tasks: [
      {
        id: 'cube-line',
        name: '線與平面夾角 (線與面)',
        taskText: <>任務：找出 <span className="italic">AG</span> 與平面 <span className="italic">ABCD</span> 之間的夾角。</>,
        points: {
          A: { coords: [-1.5, -1.5, 1.5], initVisible: true },
          B: { coords: [1.5, -1.5, 1.5], initVisible: true },
          C: { coords: [1.5, -1.5, -1.5], initVisible: true },
          D: { coords: [-1.5, -1.5, -1.5], initVisible: true },
          E: { coords: [-1.5, 1.5, 1.5], initVisible: true },
          F: { coords: [1.5, 1.5, 1.5], initVisible: true },
          G: { coords: [1.5, 1.5, -1.5], initVisible: true },
          H: { coords: [-1.5, 1.5, -1.5], initVisible: true },
        },
        edges: [
          ['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'],
          ['E', 'F'], ['F', 'G'], ['G', 'H'], ['H', 'E'],
          ['A', 'E'], ['B', 'F'], ['C', 'G'], ['D', 'H'],
        ],
        baseVertices: ['A', 'B', 'C', 'D'],
        dashedLines: [['G', 'C']],
        targetSequence: ['G', 'A', 'C'],
        rightAngles: [['G', 'C', 'A']],
        expectedAngle: 35.3,
        solutionSteps: [
          <>1. 點擊按鈕開始解析</>,
          <>2. 找出構成角度的斜邊：<span className="italic">AG</span></>,
          <>3. 找出頂點 <span className="italic">G</span> 在平面的投影點：點 <span className="italic">C</span></>,
          <>4. 連接 <span className="italic">AC</span>，<span className="italic">AC</span> 即為 <span className="italic">AG</span> 在平面的投影</>,
          <>5. 因此，與平面的夾角為 ∠<span className="italic">GAC</span></>,
        ],
      },
      {
        id: 'cube-plane',
        name: '平面與平面夾角 (面與面)',
        taskText: <>任務：找出平面 <span className="italic">ABGH</span> 與平面 <span className="italic">ABCD</span> 之間的夾角。</>,
        points: {
          A: { coords: [-1.5, -1.5, 1.5], initVisible: true },
          B: { coords: [1.5, -1.5, 1.5], initVisible: true },
          C: { coords: [1.5, -1.5, -1.5], initVisible: true },
          D: { coords: [-1.5, -1.5, -1.5], initVisible: true },
          E: { coords: [-1.5, 1.5, 1.5], initVisible: true },
          F: { coords: [1.5, 1.5, 1.5], initVisible: true },
          G: { coords: [1.5, 1.5, -1.5], initVisible: true },
          H: { coords: [-1.5, 1.5, -1.5], initVisible: true },
        },
        edges: [
          ['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'],
          ['E', 'F'], ['F', 'G'], ['G', 'H'], ['H', 'E'],
          ['A', 'E'], ['B', 'F'], ['C', 'G'], ['D', 'H'],
        ],
        baseVertices: ['A', 'B', 'C', 'D'],
        dashedLines: [['G', 'C']],
        extraPlanes: [{ vertices: ['A', 'B', 'G', 'H'], color: 0xfde047 }],
        targetSequence: ['G', 'B', 'C'],
        rightAngles: [['G', 'B', 'A'], ['C', 'B', 'A']],
        validAnswers: [
          { sequence: ['G', 'B', 'C'], rightAngles: [['G', 'B', 'A'], ['C', 'B', 'A']] },
          { sequence: ['H', 'A', 'D'], rightAngles: [['H', 'A', 'B'], ['D', 'A', 'B']] },
        ],
        expectedAngle: 45.0,
        solutionSteps: [
          <>1. 點擊按鈕開始解析</>,
          <>2. 找出兩平面的交線：<span className="italic">AB</span></>,
          <>3. 分別在兩平面找出垂直於交線的線：<span className="italic">BG</span> 與 <span className="italic">BC</span></>,
          <>4. 這兩條垂直線的夾角即為兩平面的夾角</>,
          <>5. 因此，夾角為 ∠<span className="italic">GBC</span></>,
        ],
      },
    ],
  },
  {
    groupName: '正四面體 (Tetrahedron)',
    tasks: [
      {
        id: 'tetrahedron-line',
        name: '線與平面夾角 (線與面)',
        taskText: <>任務：找出 <span className="italic">AB</span> 與平面 <span className="italic">BCD</span> 之間的夾角。</>,
        points: {
          A: { coords: [0, 2, 0], initVisible: true },
          B: { coords: [-1.732, -1, -1], initVisible: true },
          C: { coords: [1.732, -1, -1], initVisible: true },
          D: { coords: [0, -1, 2], initVisible: true },
          O: { coords: [0, -1, 0], initVisible: true },
        },
        edges: [['B', 'C'], ['C', 'D'], ['D', 'B'], ['A', 'B'], ['A', 'C'], ['A', 'D']],
        baseVertices: ['B', 'C', 'D'],
        dashedLines: [['A', 'O']],
        targetSequence: ['A', 'B', 'O'],
        rightAngles: [['A', 'O', 'B']],
        expectedAngle: 70.5,
        solutionSteps: [
          <>1. 點擊按鈕開始解析</>,
          <>2. 找出構成角度的斜邊：<span className="italic">AB</span></>,
          <>3. 找出頂點 <span className="italic">A</span> 在平面 <span className="italic">BCD</span> 的投影點：點 <span className="italic">O</span></>,
          <>4. 連接 <span className="italic">BO</span>，<span className="italic">BO</span> 即為 <span className="italic">AB</span> 在平面的投影</>,
          <>5. 因此，與平面的夾角為 ∠<span className="italic">ABO</span></>,
        ],
      },
      {
        id: 'tetrahedron-plane',
        name: '平面與平面夾角 (面與面)',
        taskText: <>任務：找出平面 <span className="italic">ACD</span> 與平面 <span className="italic">BCD</span> 之間的夾角。</>,
        points: {
          A: { coords: [0, 2, 0], initVisible: true },
          B: { coords: [-1.732, -1, -1], initVisible: true },
          C: { coords: [1.732, -1, -1], initVisible: true },
          D: { coords: [0, -1, 2], initVisible: true },
          O: { coords: [0, -1, 0], initVisible: true },
          M: { coords: [0.866, -1, 0.5], initVisible: false },
        },
        edges: [['B', 'C'], ['C', 'D'], ['D', 'B'], ['A', 'B'], ['A', 'C'], ['A', 'D']],
        baseVertices: ['B', 'C', 'D'],
        dashedLines: [['A', 'O']],
        extraPlanes: [{ vertices: ['A', 'C', 'D'], color: 0xfde047 }],
        targetSequence: ['A', 'M', 'O'],
        rightAngles: [['A', 'M', 'C'], ['O', 'M', 'C']],
        expectedAngle: 71.6,
        auxText: <>加入輔助點 <span className="italic">M</span> (<span className="italic">CD</span> 中點)</>,
        solutionSteps: [
          <>1. 點擊按鈕開始解析</>,
          <>2. 找出兩平面的交線：<span className="italic">CD</span></>,
          <>3. 分別在兩平面找出垂直於交線的線：<span className="italic">AM</span> 與 <span className="italic">OM</span></>,
          <>4. 這兩條垂直線的夾角即為兩平面的夾角</>,
          <>5. 因此，夾角為 ∠<span className="italic">AMO</span></>,
        ],
      },
    ],
  },
  {
    groupName: '三角柱 (Triangular Prism)',
    tasks: [
      {
        id: 'prism-line',
        name: '線與平面夾角 (線與面)',
        taskText: <>任務：找出 <span className="italic">DC</span> 與平面 <span className="italic">ABC</span> 之間的夾角。</>,
        points: {
          A: { coords: [0, -1.5, 2], initVisible: true },
          B: { coords: [1.732, -1.5, -1], initVisible: true },
          C: { coords: [-1.732, -1.5, -1], initVisible: true },
          D: { coords: [0, 1.5, 2], initVisible: true },
          E: { coords: [1.732, 1.5, -1], initVisible: true },
          F: { coords: [-1.732, 1.5, -1], initVisible: true },
        },
        edges: [
          ['A', 'B'], ['B', 'C'], ['C', 'A'],
          ['D', 'E'], ['E', 'F'], ['F', 'D'],
          ['A', 'D'], ['B', 'E'], ['C', 'F'],
        ],
        baseVertices: ['A', 'B', 'C'],
        dashedLines: [['D', 'A']],
        targetSequence: ['D', 'C', 'A'],
        rightAngles: [['D', 'A', 'C']],
        expectedAngle: 40.9,
        solutionSteps: [
          <>1. 點擊按鈕開始解析</>,
          <>2. 找出構成角度的斜邊：<span className="italic">DC</span></>,
          <>3. 找出頂點 <span className="italic">D</span> 在平面的投影點：點 <span className="italic">A</span></>,
          <>4. 連接 <span className="italic">AC</span>，<span className="italic">AC</span> 即為 <span className="italic">DC</span> 在平面的投影</>,
          <>5. 因此，與平面的夾角為 ∠<span className="italic">DCA</span></>,
        ],
      },
      {
        id: 'prism-plane',
        name: '平面與平面夾角 (面與面)',
        taskText: <>任務：找出平面 <span className="italic">DBC</span> 與平面 <span className="italic">ABC</span> 之間的夾角。</>,
        points: {
          A: { coords: [0, -1.5, 2], initVisible: true },
          B: { coords: [1.732, -1.5, -1], initVisible: true },
          C: { coords: [-1.732, -1.5, -1], initVisible: true },
          D: { coords: [0, 1.5, 2], initVisible: true },
          E: { coords: [1.732, 1.5, -1], initVisible: true },
          F: { coords: [-1.732, 1.5, -1], initVisible: true },
          M: { coords: [0, -1.5, -1], initVisible: false },
        },
        edges: [
          ['A', 'B'], ['B', 'C'], ['C', 'A'],
          ['D', 'E'], ['E', 'F'], ['F', 'D'],
          ['A', 'D'], ['B', 'E'], ['C', 'F'], ['D', 'B'], ['D', 'C'],
        ],
        baseVertices: ['A', 'B', 'C'],
        dashedLines: [['D', 'A']],
        extraPlanes: [{ vertices: ['D', 'B', 'C'], color: 0xfde047 }],
        targetSequence: ['D', 'M', 'A'],
        rightAngles: [['D', 'M', 'C'], ['A', 'M', 'C']],
        expectedAngle: 45.0,
        auxText: <>加入輔助點 <span className="italic">M</span> (<span className="italic">BC</span> 中點)</>,
        solutionSteps: [
          <>1. 點擊按鈕開始解析</>,
          <>2. 找出兩平面的交線：<span className="italic">BC</span></>,
          <>3. 分別在兩平面找出垂直於交線的線：<span className="italic">DM</span> 與 <span className="italic">AM</span></>,
          <>4. 這兩條垂直線的夾角即為兩平面的夾角</>,
          <>5. 因此，夾角為 ∠<span className="italic">DMA</span></>,
        ],
      },
    ],
  },
];

const TASKS = TASK_GROUPS.reduce((acc, group) => {
  group.tasks.forEach((task) => {
    acc[task.id] = task;
  });
  return acc;
}, {});

function useScripts(urls) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadScript = (url) => new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${url}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    Promise.all(urls.map(loadScript))
      .then(() => {
        if (isMounted) {
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.error('Failed to load scripts', err);
      });

    return () => {
      isMounted = false;
    };
  }, [urls]);

  return loaded;
}

export default function TrigApplicationsF4() {
  const [currentTaskId, setCurrentTaskId] = useState('pyramid-line');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [addedPoints, setAddedPoints] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSolutionMode, setShowSolutionMode] = useState(false);
  const [solutionStep, setSolutionStep] = useState(0);
  const [calculatedAngle, setCalculatedAngle] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [matchedAnswerDetails, setMatchedAnswerDetails] = useState(null);
  const [labels2D, setLabels2D] = useState({});

  const currentTask = TASKS[currentTaskId];

  const stateRef = useRef({ showSolutionMode, addedPoints, currentTaskId });
  useEffect(() => {
    stateRef.current = { showSolutionMode, addedPoints, currentTaskId };
  }, [showSolutionMode, addedPoints, currentTaskId]);

  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const objectsRef = useRef({
    points: {},
    lines: {},
    base: null,
    highlightLines: [],
    extraPlanes: [],
    animatedObjects: [],
  });

  const threeLoaded = useScripts([
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  ]);

  const calculateAngle = (p1Id, p2Id, p3Id) => {
    if (!window.THREE) {
      return null;
    }
    const p1 = new window.THREE.Vector3(...currentTask.points[p1Id].coords);
    const p2 = new window.THREE.Vector3(...currentTask.points[p2Id].coords);
    const p3 = new window.THREE.Vector3(...currentTask.points[p3Id].coords);

    const v1 = new window.THREE.Vector3().subVectors(p1, p2).normalize();
    const v2 = new window.THREE.Vector3().subVectors(p3, p2).normalize();

    const dot = v1.dot(v2);
    const angleRad = Math.acos(Math.min(Math.max(dot, -1), 1));
    const angleDeg = angleRad * (180 / Math.PI);
    return angleDeg.toFixed(1);
  };

  useEffect(() => {
    if (selectedPoints.length === 3) {
      const angle = calculateAngle(selectedPoints[0], selectedPoints[1], selectedPoints[2]);
      setCalculatedAngle(angle);
      setIsAnswerCorrect(null);
    } else {
      setCalculatedAngle(null);
    }
  }, [selectedPoints]);

  const handleCheckAnswer = () => {
    const current = selectedPoints.join('');
    const validAnswers = currentTask.validAnswers || [{ sequence: currentTask.targetSequence, rightAngles: currentTask.rightAngles }];

    let matched = null;
    for (const ans of validAnswers) {
      const target = ans.sequence.join('');
      const targetRev = [...ans.sequence].reverse().join('');
      if (current === target || current === targetRev) {
        matched = ans;
        break;
      }
    }

    if (matched) {
      setIsAnswerCorrect(true);
      setMatchedAnswerDetails(matched);
      setCompletedTasks((prev) => {
        if (!prev.includes(currentTaskId)) {
          return [...prev, currentTaskId];
        }
        return prev;
      });
    } else {
      setIsAnswerCorrect(false);
      setMatchedAnswerDetails(null);
    }
  };

  const resetTask = () => {
    setSelectedPoints([]);
    setAddedPoints([]);
    setCalculatedAngle(null);
    setIsAnswerCorrect(null);
    setMatchedAnswerDetails(null);
    setShowSolutionMode(false);
    setSolutionStep(0);
  };

  const handleTaskChange = (taskId) => {
    setCurrentTaskId(taskId);
    setIsMenuOpen(false);
    resetTask();
  };

  const handleAddAuxPoint = () => {
    const newPoints = Object.keys(currentTask.points).filter((id) => !currentTask.points[id].initVisible);
    setAddedPoints((prev) => [...new Set([...prev, ...newPoints])]);
  };

  useEffect(() => {
    if (!threeLoaded || !containerRef.current) {
      return undefined;
    }

    const THREE = window.THREE;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(6, 4, 8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event) => {
      if (stateRef.current.showSolutionMode) {
        return;
      }

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const pointMeshes = Object.values(objectsRef.current.points).filter((mesh) => mesh.visible);
      const intersects = raycaster.intersectObjects(pointMeshes);

      if (intersects.length > 0) {
        const clickedId = intersects[0].object.userData.id;
        setSelectedPoints((prev) => {
          if (prev.length > 0 && prev[prev.length - 1] === clickedId) {
            return prev;
          }
          if (prev.length >= 3) {
            return [clickedId];
          }
          return [...prev, clickedId];
        });
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    const handleResize = () => {
      if (!containerRef.current) {
        return;
      }
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [threeLoaded]);

  useEffect(() => {
    if (!threeLoaded || !sceneRef.current) {
      return;
    }

    const THREE = window.THREE;
    const scene = sceneRef.current;

    if (objectsRef.current.base) {
      scene.remove(objectsRef.current.base);
    }
    Object.values(objectsRef.current.lines).forEach((line) => scene.remove(line));
    Object.values(objectsRef.current.points).forEach((point) => scene.remove(point));
    objectsRef.current.highlightLines.forEach((line) => scene.remove(line));
    objectsRef.current.extraPlanes?.forEach((plane) => scene.remove(plane));

    objectsRef.current = { points: {}, lines: {}, base: null, highlightLines: [], extraPlanes: [], animatedObjects: [] };

    const colors = { base: 0xb5b7db, edge: 0x94a3b8, point: 0x94a3b8, dashed: 0xa1a1aa };

    const baseGeom = new THREE.BufferGeometry();
    const baseVertices = [];
    const b = currentTask.baseVertices;
    for (let i = 1; i < b.length - 1; i += 1) {
      baseVertices.push(...currentTask.points[b[0]].coords);
      baseVertices.push(...currentTask.points[b[i]].coords);
      baseVertices.push(...currentTask.points[b[i + 1]].coords);
    }
    baseGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(baseVertices), 3));
    const baseMat = new THREE.MeshBasicMaterial({ color: colors.base, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
    const baseMesh = new THREE.Mesh(baseGeom, baseMat);
    scene.add(baseMesh);
    objectsRef.current.base = baseMesh;

    currentTask.extraPlanes?.forEach((plane) => {
      const geom = new THREE.BufferGeometry();
      const verts = [];
      const pts = plane.vertices;
      for (let i = 1; i < pts.length - 1; i += 1) {
        verts.push(...currentTask.points[pts[0]].coords);
        verts.push(...currentTask.points[pts[i]].coords);
        verts.push(...currentTask.points[pts[i + 1]].coords);
      }
      geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
      const mat = new THREE.MeshBasicMaterial({ color: plane.color, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geom, mat);
      scene.add(mesh);
      objectsRef.current.extraPlanes.push(mesh);
    });

    const lineMat = new THREE.LineBasicMaterial({ color: colors.edge, linewidth: 2 });
    currentTask.edges.forEach(([p1, p2]) => {
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...currentTask.points[p1].coords),
        new THREE.Vector3(...currentTask.points[p2].coords),
      ]);
      const line = new THREE.Line(geom, lineMat);
      scene.add(line);
      objectsRef.current.lines[`${p1}-${p2}`] = line;
    });

    const dashedMat = new THREE.LineDashedMaterial({ color: colors.dashed, dashSize: 0.2, gapSize: 0.1 });
    currentTask.dashedLines?.forEach(([p1, p2]) => {
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...currentTask.points[p1].coords),
        new THREE.Vector3(...currentTask.points[p2].coords),
      ]);
      const line = new THREE.Line(geom, dashedMat);
      line.computeLineDistances();
      scene.add(line);
      objectsRef.current.lines[`dashed-${p1}-${p2}`] = line;
    });

    const pointGeom = new THREE.SphereGeometry(0.15, 16, 16);
    const pointMat = new THREE.MeshBasicMaterial({ color: colors.point });

    Object.entries(currentTask.points).forEach(([id, data]) => {
      const sphere = new THREE.Mesh(pointGeom, pointMat.clone());
      sphere.position.set(...data.coords);
      sphere.userData = { id };
      scene.add(sphere);
      objectsRef.current.points[id] = sphere;
    });
  }, [currentTask, threeLoaded]);

  useEffect(() => {
    if (!threeLoaded || !sceneRef.current || !rendererRef.current) {
      return undefined;
    }

    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const controls = controlsRef.current;
    const scene = sceneRef.current;
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();

      objectsRef.current.animatedObjects?.forEach((obj) => {
        if (obj.type === 'line') {
          obj.mesh.scale.z += (1 - obj.mesh.scale.z) * 0.15;
        } else if (obj.type === 'arc' || obj.type === 'rightAngle') {
          obj.mesh.scale.x += (1 - obj.mesh.scale.x) * 0.15;
          obj.mesh.scale.y += (1 - obj.mesh.scale.y) * 0.15;
          obj.mesh.scale.z += (1 - obj.mesh.scale.z) * 0.15;
        }
      });

      if (containerRef.current) {
        const newLabels = {};
        const canvasW = containerRef.current.clientWidth;
        const canvasH = containerRef.current.clientHeight;

        const activeTask = TASKS[stateRef.current.currentTaskId] || TASKS['pyramid-line'];

        Object.entries(activeTask.points).forEach(([id, pointData]) => {
          const isVisible = pointData.initVisible || stateRef.current.addedPoints.includes(id) || stateRef.current.showSolutionMode;
          if (!isVisible) {
            return;
          }

          const vec = new window.THREE.Vector3(...pointData.coords);
          vec.project(camera);
          newLabels[id] = {
            x: (vec.x * 0.5 + 0.5) * canvasW,
            y: (-(vec.y * 0.5) + 0.5) * canvasH,
            visible: vec.z >= -1 && vec.z <= 1,
          };
        });

        setLabels2D(newLabels);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [threeLoaded]);

  useEffect(() => {
    if (!threeLoaded || !sceneRef.current) {
      return;
    }

    const THREE = window.THREE;
    const scene = sceneRef.current;
    const { points, lines, highlightLines } = objectsRef.current;
    const colors = { normal: 0x94a3b8, selected: 0xd9b756, angle: 0x22c55e };

    highlightLines.forEach((line) => scene.remove(line));
    objectsRef.current.highlightLines = [];

    Object.entries(points).forEach(([id, mesh]) => {
      const isVisible = currentTask.points[id].initVisible || addedPoints.includes(id) || showSolutionMode;
      mesh.visible = isVisible;
      mesh.material.color.setHex(colors.normal);
    });

    currentTask.dashedLines?.forEach(([p1, p2]) => {
      const line = lines[`dashed-${p1}-${p2}`];
      if (!line) {
        return;
      }
      const p1Visible = currentTask.points[p1].initVisible || addedPoints.includes(p1) || showSolutionMode;
      const p2Visible = currentTask.points[p2].initVisible || addedPoints.includes(p2) || showSolutionMode;
      line.visible = p1Visible && p2Visible;
    });

    const drawHighlightLine = (p1Id, p2Id) => {
      const p1 = new THREE.Vector3(...currentTask.points[p1Id].coords);
      const p2 = new THREE.Vector3(...currentTask.points[p2Id].coords);
      const path = new THREE.LineCurve3(p1, p2);
      const geom = new THREE.TubeGeometry(path, 20, 0.05, 8, false);
      const mat = new THREE.MeshBasicMaterial({ color: colors.selected });
      const mesh = new THREE.Mesh(geom, mat);
      scene.add(mesh);
      objectsRef.current.highlightLines.push(mesh);
    };

    const drawAngleArc = (p1Id, vId, p2Id) => {
      const p1 = new THREE.Vector3(...currentTask.points[p1Id].coords);
      const vertex = new THREE.Vector3(...currentTask.points[vId].coords);
      const p2 = new THREE.Vector3(...currentTask.points[p2Id].coords);

      const v1 = new THREE.Vector3().subVectors(p1, vertex).normalize();
      const v2 = new THREE.Vector3().subVectors(p2, vertex).normalize();
      const angle = v1.angleTo(v2);

      const radius = 0.6;
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, angle, false, 0);
      const arcPoints = curve.getPoints(30);

      const geom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(arcPoints.map((p) => new THREE.Vector3(p.x, p.y, 0))),
        30,
        0.04,
        8,
        false,
      );
      const mat = new THREE.MeshBasicMaterial({ color: colors.angle });
      const mesh = new THREE.Mesh(geom, mat);

      const normal = new THREE.Vector3().crossVectors(v1, v2).normalize();
      if (normal.lengthSq() > 0.001) {
        const vY = new THREE.Vector3().crossVectors(normal, v1).normalize();
        const matrix = new THREE.Matrix4().makeBasis(v1, vY, normal);
        mesh.applyMatrix4(matrix);
      }
      mesh.position.copy(vertex);

      scene.add(mesh);
      objectsRef.current.highlightLines.push(mesh);
    };

    const drawRightAngle = (p1Id, pVertexId, p2Id) => {
      const p1 = new THREE.Vector3(...currentTask.points[p1Id].coords);
      const pV = new THREE.Vector3(...currentTask.points[pVertexId].coords);
      const p2 = new THREE.Vector3(...currentTask.points[p2Id].coords);

      const len1 = Math.min(0.4, p1.distanceTo(pV) * 0.3);
      const len2 = Math.min(0.4, p2.distanceTo(pV) * 0.3);
      const v1 = new THREE.Vector3().subVectors(p1, pV).normalize().multiplyScalar(len1);
      const v2 = new THREE.Vector3().subVectors(p2, pV).normalize().multiplyScalar(len2);

      const corner1 = new THREE.Vector3().addVectors(pV, v1);
      const corner2 = new THREE.Vector3().addVectors(pV, v2);
      const cornerMid = new THREE.Vector3().addVectors(corner1, v2);

      const path1 = new THREE.LineCurve3(corner1, cornerMid);
      const path2 = new THREE.LineCurve3(cornerMid, corner2);

      const mat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tube1 = new THREE.Mesh(new THREE.TubeGeometry(path1, 2, 0.03, 4, false), mat);
      const tube2 = new THREE.Mesh(new THREE.TubeGeometry(path2, 2, 0.03, 4, false), mat);
      scene.add(tube1);
      scene.add(tube2);
      objectsRef.current.highlightLines.push(tube1, tube2);
    };

    if (showSolutionMode) {
      const [p1, p2, p3] = currentTask.targetSequence;

      if (solutionStep >= 1) {
        if (points[p1]) {
          points[p1].material.color.setHex(colors.selected);
        }
        if (points[p2]) {
          points[p2].material.color.setHex(colors.selected);
        }
        drawHighlightLine(p1, p2);
      }
      if (solutionStep >= 2) {
        if (points[p3]) {
          points[p3].material.color.setHex(colors.selected);
        }
      }
      if (solutionStep >= 3) {
        drawHighlightLine(p2, p3);
        drawAngleArc(p1, p2, p3);
        if (currentTask.rightAngles) {
          currentTask.rightAngles.forEach((rightAngleDef) => drawRightAngle(...rightAngleDef));
        }
      }
    } else {
      selectedPoints.forEach((id) => {
        if (points[id]) {
          points[id].material.color.setHex(colors.selected);
        }
      });

      if (selectedPoints.length >= 2) {
        drawHighlightLine(selectedPoints[0], selectedPoints[1]);
      }
      if (selectedPoints.length === 3) {
        drawHighlightLine(selectedPoints[1], selectedPoints[2]);
        drawAngleArc(selectedPoints[0], selectedPoints[1], selectedPoints[2]);
      }

      if (isAnswerCorrect) {
        const anglesToDraw = matchedAnswerDetails?.rightAngles || currentTask.rightAngles;
        if (anglesToDraw) {
          anglesToDraw.forEach((rightAngleDef) => drawRightAngle(...rightAngleDef));
        }
      }
    }
  }, [selectedPoints, addedPoints, showSolutionMode, solutionStep, currentTask, threeLoaded, isAnswerCorrect, matchedAnswerDetails]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col items-center py-8">
      <div className="w-full max-w-6xl px-4 mb-6">
        <div className="mb-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            返回主頁
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">F4 CH10 三角學的應用</h1>
        <p className="text-slate-500">透過 3D 立體圖形互動，理解線與面、面與面的夾角概念。</p>
      </div>

      <div className="w-full max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center text-xs font-semibold text-indigo-600 tracking-wider mb-3">
              <IconTarget /> 當前任務
            </div>
            <p className="text-slate-800 font-medium leading-relaxed">{currentTask.taskText}</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-medium text-slate-700">選擇其他任務</span>
              <IconChevronDown />
            </button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-2 max-h-[60vh] overflow-y-auto">
                {TASK_GROUPS.map((group) => (
                  <div key={group.groupName} className="mb-2 last:mb-0">
                    <div className="px-4 py-1 text-xs font-bold text-slate-400 bg-slate-50 uppercase tracking-wider">{group.groupName}</div>
                    {group.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleTaskChange(task.id)}
                        className="px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 cursor-pointer flex items-center"
                      >
                        <div className="w-6 flex justify-center mr-1">
                          {currentTaskId === task.id ? (
                            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          ) : completedTasks.includes(task.id) ? (
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          ) : null}
                        </div>
                        <span className={currentTaskId === task.id ? 'font-medium text-indigo-600' : ''}>{task.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={resetTask}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <IconRefresh /> 重置
          </button>
        </div>

        <div className="lg:col-span-6 bg-white rounded-xl shadow-sm border border-slate-200 relative overflow-hidden flex flex-col h-[600px]">
          <div ref={containerRef} className="w-full flex-grow cursor-crosshair focus:outline-none" />

          {Object.entries(labels2D).map(([id, pos]) => (
            pos.visible ? (
              <div
                key={id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 font-bold text-lg pointer-events-none drop-shadow-md ${
                  selectedPoints.includes(id)
                  || (showSolutionMode && (
                    (id === currentTask.targetSequence[0] && solutionStep >= 1)
                    || (id === currentTask.targetSequence[1] && solutionStep >= 1)
                    || (id === currentTask.targetSequence[2] && solutionStep >= 2)
                  ))
                    ? 'text-amber-500 scale-125'
                    : 'text-slate-700'
                }`}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transition: 'color 0.3s, transform 0.3s',
                }}
              >
                {id}
              </div>
            ) : null
          ))}

          {!showSolutionMode && Object.values(currentTask.points).some((p) => !p.initVisible) && addedPoints.length === 0 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
              <button
                onClick={handleAddAuxPoint}
                className="bg-white hover:bg-indigo-50 border border-indigo-200 shadow-lg rounded-full px-6 py-3 flex items-center text-indigo-600 font-medium text-sm transition-all whitespace-nowrap"
              >
                <IconTarget />
                {currentTask.auxText || '加入輔助點'}
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 space-y-4">
          {!showSolutionMode && selectedPoints.length < 3 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 relative">
              <div className="flex items-center text-indigo-600 font-semibold mb-4">
                <IconBulb /> 操作說明
                <div className="ml-auto"><IconClose /></div>
              </div>
              <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-600 marker:font-semibold marker:text-slate-400">
                <li className="pl-1 leading-relaxed">透過滑鼠拖曳可以旋轉 3D 模型。</li>
                <li className="pl-1 leading-relaxed">點擊模型上的灰色節點來選取點。</li>
                <li className="pl-1 leading-relaxed">依序選取 3 個點來定義角度，第二個點是頂點。</li>
              </ol>
            </div>
          )}

          {!showSolutionMode && selectedPoints.length === 3 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 border-t-4 border-t-indigo-500 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider mb-2">
                <span>已選角度</span>
                <div onClick={() => setSelectedPoints([])}><IconTrash /></div>
              </div>

              <div className="flex items-end justify-between mb-6">
                <div className="text-3xl font-bold text-indigo-700">∠{selectedPoints.join('')}</div>
                <div className="text-2xl font-bold text-slate-700">{calculatedAngle}°</div>
              </div>

              {isAnswerCorrect === null ? (
                <button
                  onClick={handleCheckAnswer}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-3 flex items-center justify-center font-medium transition-colors"
                >
                  <IconCheck /> 檢查答案
                </button>
              ) : isAnswerCorrect ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-center font-medium flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  答案正確！
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-center font-medium flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  角度不對，請再試一次。
                </div>
              )}
            </div>
          )}

          {showSolutionMode && (
            <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-5 border-t-4 border-t-amber-400">
              <div className="flex items-center text-amber-600 font-semibold mb-4">
                <IconBulb /> 步驟解析
              </div>

              <div className="min-h-[80px] text-sm text-slate-700 font-medium mb-6 bg-amber-50 p-3 rounded-lg border border-amber-100">
                {currentTask.solutionSteps[solutionStep]}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSolutionStep(Math.max(0, solutionStep - 1))}
                  disabled={solutionStep === 0}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg py-2 text-sm font-medium disabled:opacity-50 transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={() => setSolutionStep(Math.min(currentTask.solutionSteps.length - 1, solutionStep + 1))}
                  disabled={solutionStep === currentTask.solutionSteps.length - 1}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50 transition-colors"
                >
                  下一步
                </button>
              </div>

              <button
                onClick={resetTask}
                className="w-full mt-3 text-slate-500 hover:text-slate-700 text-sm font-medium py-2"
              >
                結束解析
              </button>
            </div>
          )}

          {!showSolutionMode && (
            <button
              onClick={() => {
                setShowSolutionMode(true);
                setSolutionStep(0);
                setSelectedPoints([]);
                setIsAnswerCorrect(null);
              }}
              className="w-full bg-white border border-slate-200 shadow-sm rounded-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors mt-auto"
            >
              <IconBulb /> 顯示解答動畫
            </button>
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
          `,
        }}
      />
    </div>
  );
}
