import { useEffect, useRef, useState } from 'react';
import { tryGuess } from './shared/api/lib/user';

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

class Drawer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  coord: {
    x: number;
    y: number;
  };
  constructor() {
    this.coord = {
      x: 0,
      y: 0,
    };
  }

  init = (canvasElement: HTMLCanvasElement) => {
    this.canvas = canvasElement;

    this.ctx = canvasElement.getContext('2d');

    document.addEventListener('mousedown', this.start);
    document.addEventListener('mouseup', this.stop);

    this.refresh();
  };

  refresh = () => {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  start = (event) => {
    document.addEventListener('mousemove', this.draw);
    this.reposition(event);
  };

  reposition = (event) => {
    this.coord.x = event.clientX - this.canvas.offsetLeft;
    this.coord.y = event.clientY - this.canvas.offsetTop;
  };

  stop = () => {
    document.removeEventListener('mousemove', this.draw);
  };

  draw = (event) => {
    const ctx = this.ctx;
    const coord = this.coord;

    ctx.beginPath();
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    ctx.moveTo(coord.x, coord.y);
    this.reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
  };
}

export function CanvasDrawer() {
  const ref = useRef(null);
  const drawer = useRef(new Drawer());
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!ref.current) {
      return null;
    }

    drawer.current.init(ref.current);
  }, []);

  return (
    <div>
      <h1>Нарисуй цифру</h1>
      <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={ref}></canvas>
      <div>
        <button onClick={handleClick}>Попробовать угадать</button>
        <button onClick={refresh}>Обновить</button>
      </div>
      {result && (
        <div>
          <h3>Похоже что это: {result[0]}</h3>
          <div>
            Вероятности:
            {result[1].map((item, key) => (
              <div>
                {key}: {Math.round(item * 100)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  function refresh() {
    setResult(null);
    drawer.current.refresh();
  }

  function handleClick() {
    drawer.current.canvas.toBlob(async (blob) => {
      const result = await tryGuess(blob);
      setResult(result.data);
    });
  }
}
